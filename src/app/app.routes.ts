import { Routes } from '@angular/router';
import { ReglementsComponent } from './components/reglements/reglements.component';
import { ClassementMensuelComponent } from './components/classement-mensuel/classement-mensuel.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { MentionsLegalesComponent } from './components/mentions-legales/mentions-legales.component';
import { ImpressionClassementComponent } from './components/impression-classement/impression-classement.component';
import { TirageGagnantsComponent } from './components/tirage-gagnants/tirage-gagnants.component';
import { ImpressionReglementsComponent } from './components/impression-reglements/impression-reglements.component';
import { ClassementAnnuelComponent } from './components/classement-annuel/classement-annuel.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { LongGongReglementsComponent } from './long-gong/components/long-gong-reglements/long-gong-reglements.component';

export const routes: Routes = [
    { path: '', component: AccueilComponent },
    { path: 'accueil', component: AccueilComponent },
    { path: 'classement/:competition/:mois', component: ClassementMensuelComponent },
    { path: 'reglements', component: ReglementsComponent },
    { path: 'mentions-legales', component: MentionsLegalesComponent },
    { path: 'impression/:competition/:mois/:langue', component: ImpressionClassementComponent },
    { path: 'gagnants-tirage/:competition', component: TirageGagnantsComponent },
    { path: 'gagnants-tirage/:competition/:spin', component: TirageGagnantsComponent },
    { path: 'impression-reglements/:langue', component: ImpressionReglementsComponent },
    { path: 'classement-annuel/:competition', component: ClassementAnnuelComponent },
    { path: 'contact', component: ContactFormComponent },
    // 🔹 Sous-routes Long Gong
    {
        path: 'long-gong',
        children: [
            { path: 'reglements', component: LongGongReglementsComponent },
            { path: '', redirectTo: 'reglements', pathMatch: 'full' }
        ]
    }
];
