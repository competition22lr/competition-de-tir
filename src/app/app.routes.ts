import { Routes } from '@angular/router';
import { ReglementsComponent } from './components/reglements/reglements.component';
import { ClassementMensuelComponent } from './components/classement-mensuel/classement-mensuel.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { MentionsLegalesComponent } from './components/mentions-legales/mentions-legales.component';
import { ImpressionClassementComponent } from './components/impression-classement/impression-classement.component';
import { TirageGagnantsComponent } from './components/tirage-gagnants/tirage-gagnants.component';
import { ImpressionReglementsComponent } from './components/impression-reglements/impression-reglements.component';

export const routes: Routes = [
    { path: '', component: AccueilComponent },
    { path: 'accueil', component: AccueilComponent },
    { path: 'classement/:competition/:mois', component: ClassementMensuelComponent },
    { path: 'reglements', component: ReglementsComponent },
    { path: 'mentions-legales', component: MentionsLegalesComponent },
    { path: 'impression/:competition/:mois/:langue', component: ImpressionClassementComponent },
    { path: 'gagnants-tirage/:competition', component: TirageGagnantsComponent },
    { path: 'impression-reglements', component: ImpressionReglementsComponent },

];
