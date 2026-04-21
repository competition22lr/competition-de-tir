export interface Membre {
    id_membre: number;
    id_club: number;

    num_membre: string;
    prenom: string;
    nom: string;

    courriel?: string;
    telephone?: string;

    actif: boolean;
    date_inscription?: string;
}