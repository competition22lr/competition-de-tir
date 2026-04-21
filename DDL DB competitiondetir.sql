-- =========================================
-- DROP (ordre inverse des dépendances)
-- =========================================

DROP VIEW IF EXISTS v_classement_session;

DROP TABLE IF EXISTS resultat_cibles CASCADE;
DROP TABLE IF EXISTS resultats CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS membres CASCADE;
DROP TABLE IF EXISTS competitions CASCADE;
DROP TABLE IF EXISTS types_competition CASCADE;
DROP TABLE IF EXISTS horaires_club CASCADE;
DROP TABLE IF EXISTS clubs CASCADE;

-- =========================================
-- TABLE : clubs
-- =========================================

CREATE TABLE clubs (
    id_club SERIAL PRIMARY KEY,
    nom_club TEXT NOT NULL,
    description TEXT,

    adresse_ligne1 TEXT,
    ville TEXT,
    province TEXT,
    code_postal TEXT,
    pays TEXT DEFAULT 'Canada',

    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6),

    telephone TEXT,
    email TEXT,
    site_web TEXT,
    google_maps_url TEXT,

    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actif BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_clubs_actif ON clubs(actif);

-- =========================================
-- TABLE : horaires_club
-- =========================================

CREATE TABLE horaires_club (
    id_horaire SERIAL PRIMARY KEY,
    id_club INT NOT NULL REFERENCES clubs(id_club) ON DELETE CASCADE,

    jour_semaine INT NOT NULL CHECK (jour_semaine BETWEEN 1 AND 7),
    heure_ouverture TIME NOT NULL,
    heure_fermeture TIME NOT NULL,

    type_activite TEXT DEFAULT 'tir',
    note TEXT,

    CHECK (heure_fermeture > heure_ouverture)
);

CREATE INDEX idx_horaires_club_id ON horaires_club(id_club);

-- =========================================
-- TABLE : types_competition
-- =========================================

CREATE TABLE types_competition (
    id_type SERIAL PRIMARY KEY,
    code TEXT UNIQUE,
    description TEXT NOT NULL UNIQUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TABLE : competitions
-- =========================================

CREATE TABLE competitions (
    id_competition SERIAL PRIMARY KEY,
    id_club INT NOT NULL REFERENCES clubs(id_club) ON DELETE CASCADE,
    id_type INT NOT NULL REFERENCES types_competition(id_type),

    nom TEXT NOT NULL,
    description TEXT,

    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,

    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (date_fin >= date_debut)
);

CREATE INDEX idx_competitions_club ON competitions(id_club);
CREATE INDEX idx_competitions_type ON competitions(id_type);

-- =========================================
-- TABLE : membres
-- =========================================

CREATE TABLE membres (
    id_membre SERIAL PRIMARY KEY,
    id_club INT NOT NULL REFERENCES clubs(id_club) ON DELETE CASCADE,

    num_membre TEXT NOT NULL,
    prenom TEXT NOT NULL,
    nom TEXT NOT NULL,

    courriel TEXT,
    telephone TEXT, 

    actif BOOLEAN DEFAULT TRUE,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(id_club, num_membre)
);

CREATE INDEX idx_membres_club ON membres(id_club);
CREATE INDEX idx_membres_telephone ON membres(telephone);

-- =========================================
-- TABLE : sessions
-- =========================================

CREATE TABLE sessions (
    id_session SERIAL PRIMARY KEY,
    id_competition INT NOT NULL REFERENCES competitions(id_competition) ON DELETE CASCADE,

    annee INT NOT NULL,
    mois INT CHECK (mois BETWEEN 1 AND 12),

    date_debut DATE,
    date_fin DATE,

    verrouille BOOLEAN DEFAULT FALSE,

    UNIQUE(id_competition, annee, mois)
);

CREATE INDEX idx_sessions_competition ON sessions(id_competition);

-- =========================================
-- TABLE : resultats (feuille de tir)
-- =========================================

CREATE TABLE resultats (
    id_resultat SERIAL PRIMARY KEY,

    id_membre INT NOT NULL REFERENCES membres(id_membre) ON DELETE CASCADE,
    id_session INT NOT NULL REFERENCES sessions(id_session) ON DELETE CASCADE,

    date_tir DATE NOT NULL,
    numero_feuille INT NOT NULL,

    calibre TEXT,
    position_tir TEXT,

    base_total INT DEFAULT 0,
    bonus_total INT DEFAULT 0,

    note TEXT,

    UNIQUE(id_membre, id_session, date_tir, numero_feuille)
);

CREATE INDEX idx_resultats_session ON resultats(id_session);
CREATE INDEX idx_resultats_membre ON resultats(id_membre);
CREATE INDEX idx_resultats_date ON resultats(date_tir);

-- =========================================
-- TABLE : resultat_cibles (20 cibles)
-- =========================================

CREATE TABLE resultat_cibles (
    id_cible SERIAL PRIMARY KEY,

    id_resultat INT NOT NULL REFERENCES resultats(id_resultat) ON DELETE CASCADE,

    numero_cible INT NOT NULL CHECK (numero_cible BETWEEN 1 AND 20),

    score INT NOT NULL CHECK (score >= 0),
    bonus INT DEFAULT 0 CHECK (bonus >= 0),

    UNIQUE(id_resultat, numero_cible)
);

CREATE INDEX idx_cibles_resultat ON resultat_cibles(id_resultat);

-- =========================================
-- TRIGGER : recalcul du total
-- =========================================

CREATE OR REPLACE FUNCTION update_resultat_totaux()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE resultats r
  SET 
    base_total = (
      SELECT COALESCE(SUM(score), 0)
      FROM resultat_cibles
      WHERE id_resultat = NEW.id_resultat
    ),
    bonus_total = (
      SELECT COALESCE(SUM(bonus), 0)
      FROM resultat_cibles
      WHERE id_resultat = NEW.id_resultat
    )
  WHERE r.id_resultat = NEW.id_resultat;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================================
-- VIEW : classement officiel
-- =========================================
CREATE OR REPLACE VIEW v_classement_session AS
WITH resultats_calcules AS (
    SELECT
        r.id_resultat,
        r.id_session,
        r.id_membre,
        c.id_club,
        r.date_tir,

        COALESCE(SUM(rc.score), 0) AS score_normal,
        COALESCE(SUM(rc.bonus), 0) AS score_bonus,
        COALESCE(SUM(rc.score + rc.bonus), 0) AS total

    FROM resultats r
    JOIN sessions s ON s.id_session = r.id_session
    JOIN competitions c ON c.id_competition = s.id_competition
    LEFT JOIN resultat_cibles rc ON rc.id_resultat = r.id_resultat

    GROUP BY 
        r.id_resultat,
        r.id_session,
        r.id_membre,
        c.id_club,
        r.date_tir
),

classement AS (
    SELECT *
    FROM resultats_calcules
    ORDER BY score_normal DESC, score_bonus DESC
),

platine AS (
    SELECT *
    FROM classement
    WHERE score_normal >= 200
    ORDER BY score_normal DESC, score_bonus DESC
    LIMIT 1
),

reste_apres_platine AS (
    SELECT *
    FROM classement
    WHERE id_membre NOT IN (SELECT id_membre FROM platine)
),

or_candidat AS (
    SELECT *
    FROM reste_apres_platine
    ORDER BY score_normal DESC, score_bonus DESC
    LIMIT 1
),

reste_apres_or AS (
    SELECT *
    FROM reste_apres_platine
    WHERE id_membre NOT IN (SELECT id_membre FROM or_candidat)
),

argent_candidat AS (
    SELECT *
    FROM reste_apres_or
    ORDER BY score_normal DESC, score_bonus DESC
    LIMIT 1
),

reste_apres_argent AS (
    SELECT *
    FROM reste_apres_or
    WHERE id_membre NOT IN (SELECT id_membre FROM argent_candidat)
),

bronze_candidat AS (
    SELECT *
    FROM reste_apres_argent
    ORDER BY score_normal DESC, score_bonus DESC
    LIMIT 1
)

SELECT id_club, id_session, id_membre, score_normal, score_bonus, total, 'Platine' AS categorie FROM platine
UNION ALL
SELECT id_club, id_session, id_membre, score_normal, score_bonus, total, 'Or' FROM or_candidat
UNION ALL
SELECT id_club, id_session, id_membre, score_normal, score_bonus, total, 'Argent' FROM argent_candidat
UNION ALL
SELECT id_club, id_session, id_membre, score_normal, score_bonus, total, 'Bronze' FROM bronze_candidat;