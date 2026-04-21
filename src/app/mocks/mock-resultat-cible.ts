export const MOCK_RESULTAT_CIBLES = [

    // =========================
    // RESULTAT 1
    // =========================
    ...Array.from({ length: 20 }, (_, i) => ({
        id_cible: i + 1,
        id_resultat: 1,
        numero_cible: i + 1,
        score: Math.floor(Math.random() * 10) + 5, // 5 à 14
        bonus: Math.random() > 0.8 ? 1 : 0
    })),

    // =========================
    // RESULTAT 2
    // =========================
    ...Array.from({ length: 20 }, (_, i) => ({
        id_cible: i + 21,
        id_resultat: 2,
        numero_cible: i + 1,
        score: Math.floor(Math.random() * 10) + 6,
        bonus: Math.random() > 0.85 ? 1 : 0
    })),

    // =========================
    // RESULTAT 3
    // =========================
    ...Array.from({ length: 20 }, (_, i) => ({
        id_cible: i + 41,
        id_resultat: 3,
        numero_cible: i + 1,
        score: Math.floor(Math.random() * 10) + 7,
        bonus: Math.random() > 0.7 ? 1 : 0
    }))
];