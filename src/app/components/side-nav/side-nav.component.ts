
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultatsService } from '../../services/resultats.service';
import { MoisResultats } from '../../models/mois-resultats.model';
import { filter } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollToTopComponent } from "../scroll-to-top/scroll-to-top.component";


import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule,     RouterModule, TranslateModule, ScrollToTopComponent,
   MatSidenav, MatToolbarModule, MatIconModule,MatFormFieldModule,MatListModule,
   MatSelectModule,MatSidenavModule
  ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['../../../styles-print.css', './side-nav.component.css']

})
export class SideNavComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  competitionsDispo: string[] = [];
  moisDispo: MoisResultats[] = [];
  showClassement = true;
  moisSelectionne!: MoisResultats;
  isMobile = false;
  showTirage = true;
  indexCompetitionSelectionne: number = 0;
  currentLang = 'fr';

  constructor(private resultatsService: ResultatsService,
    private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router,
     private translate: TranslateService) {

    this.currentLang = translate.currentLang;

    // Écoute les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showClassement = !event.url.includes('/reglements');
    });
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

    // Récupère les paramètres de l'URL
    this.route.paramMap.subscribe(params => {
      const competitionParam = params.get('competition');
      this.indexCompetitionSelectionne = competitionParam ? +competitionParam : 0;

      this.resultatsService.getResultats().subscribe(data => {
        this.competitionsDispo = data.getCompetitionsDisponibles();

        // Actualise les mois pour la compétition actuelle
        this.moisDispo = data.getMoisDisponibles(this.indexCompetitionSelectionne);

        if (this.moisDispo.length > 0) {
          this.moisSelectionne = this.moisDispo[0];
        }
      });
    });
  }

  switchLanguage() {
    this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
    this.translate.use(this.currentLang);
  }

  onCompetitionChange(index: number) {
    this.indexCompetitionSelectionne = index;

    this.resultatsService.getMoisResultats(index).subscribe((_moisResultats: MoisResultats[]) => {
      this.moisDispo = _moisResultats;

      if (this.moisDispo.length > 0) {
        this.moisSelectionne = this.moisDispo[0];

        // 🔁 Redirige avec mois encodé (remplace les points par underscore)
        const moisEncoded = this.moisSelectionne.name.toLowerCase().replace(/\./g, '_');
        this.router.navigate(['/classement', index, moisEncoded]);
      }
    });
  }

  encodeMois(mois: string): string {
    return mois.toLowerCase().replace(/\./g, '_');
  }

  onMoisChange(moisSelectionne: MoisResultats): void {
    this.moisSelectionne = moisSelectionne;

    // Fermer le sidenav si on est en mode mobile
    if (this.isMobile && this.drawer) {
      this.drawer.close();
    }
  }

  getMoisAfficahge(mois: MoisResultats): string {
   return this.translate.instant(mois.getMoisCleText()) + " " + mois.getAnnee();
  }
}
