import { Resultat } from './resultat.model';
import { ResultatCible } from './resultat-cible.model';

export interface ResultatComplet {
    resultat: Resultat;
    cibles: ResultatCible[];
}