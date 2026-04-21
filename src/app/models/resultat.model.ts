export interface Resultat {
    id_resultat?: number;

    id_membre: number;
    id_session: number;

    date_tir: string; // ISO date (yyyy-mm-dd)
    numero_feuille: number;

    calibre?: string;
    position_tir?: string;

    total?: number;

    note?: string;
}