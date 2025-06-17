import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResultatsService } from '../../services/resultats.service';
import { Participant } from '../../models/participant.model';
import { Utilistaire } from '../../services/utilitaire';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

interface Participation {
  id: number;
  numMembre: string;
  name: string;
}

@Component({
  selector: 'app-roue-fortune',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roue-fortune.component.html',
  styleUrls: ['./roue-fortune.component.css']
})
export class RoueFortuneComponent implements AfterViewInit, OnInit {

  names: Participation[] = [];

  displayedNames: Participation[] = [];
  isSpinning = false;
  winner: Participation | null = null;
  itemHeight = 0;

  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  private colorMap = new Map<string, string>();
  indexCompetitionSelectionne!: number;

  constructor(public resultatsService: ResultatsService,
    @Inject(MAT_DIALOG_DATA) public data: { mois: string, competition: number }

  ) { }

  ngOnInit() {

    const mois = this.data.mois;
    const competition = this.data.competition;

    console.log('Mois:', mois);
    console.log('Compétition:', competition);


    //On récupère les participants
    this.resultatsService
      .getParticipantsPourMois(competition, mois)
      .subscribe((participants: Participant[]) => {
        let indx = 0;

        participants.forEach((element, i) => {
          let nbParticipation = getNbParticipation(element);
          for (let index = 0; index < nbParticipation; index++) {
            this.names.push({
              id: ++indx,
              numMembre: element.numero,
              name: element.nom
            });
          }
        });

        this.shuffleNames();
        this.displayedNames = [...this.names];

      });
  }

  ngAfterViewInit() {
    const itemEl = this.carousel.nativeElement.querySelector('.slot') as HTMLElement;
    if (itemEl) {
      this.itemHeight = itemEl.offsetHeight;
    }
  }

  shuffleNames() {
    for (let i = this.names.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.names[i], this.names[j]] = [this.names[j], this.names[i]];
    }
  }

  spin() {
    if (this.isSpinning) return;
    this.isSpinning = true;
    this.winner = null;

    const carouselEl = this.carousel.nativeElement;

    const visibleSlots = 9;
    const middleSlotOffset = Math.floor(visibleSlots / 2); // index 4 (5e case visible)
    const totalItems = this.names.length;
    const rounds = 3;

    // ✅ Réinitialise et génère une nouvelle séquence à chaque spin
    this.displayedNames = [];

    for (let i = 0; i < rounds; i++) {
      // Tu peux aussi reshuffler à chaque round si tu veux plus d'aléatoire
      const shuffled = [...this.names];
      for (let j = shuffled.length - 1; j > 0; j--) {
        const r = Math.floor(Math.random() * (j + 1));
        [shuffled[j], shuffled[r]] = [shuffled[r], shuffled[j]];
      }
      this.displayedNames.push(...shuffled);
    }

    Utilistaire.Log("RoueFortuneComponent.spin.displayedNames =>", this.displayedNames);

    // ✅ Calcule la position cible pour centrer un gagnant
    const extendedTotal = this.displayedNames.length;
    const targetIndex = Math.floor(Math.random() * totalItems) + totalItems * (rounds - 1);
    const centerOffset = this.itemHeight * middleSlotOffset;
    const targetPosition = this.itemHeight * targetIndex;
    const finalScroll = targetPosition - centerOffset;

    // ✅ Lancement du scroll fluide
    this.animateVerticalScroll(carouselEl, finalScroll, 10000).then(() => {
      const centeredY = carouselEl.scrollTop + centerOffset;
      const actualIndex = Math.round(centeredY / this.itemHeight);
      const exactScroll = this.itemHeight * actualIndex - centerOffset;
      carouselEl.scrollTop = exactScroll;

      // ✅ Corrige pour retrouver l'ID réel du gagnant
      const trueIndex = actualIndex % totalItems;
      this.winner = this.names[trueIndex];

      console.log("actualIndex:", actualIndex);
      console.log("trueIndex:", trueIndex);
      console.log("Gagnant:", this.winner);

      this.isSpinning = false;
    });
  }

  animateVerticalScroll(element: HTMLElement, to: number, duration: number): Promise<void> {
    const start = element.scrollTop;
    const change = to - start;
    const startTime = performance.now();

    return new Promise(resolve => {
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.scrollTop = start + change * this.easeOutCubic(progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(animate);
    });
  }

  easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  getColor(name: string): string {
    if (!this.colorMap.has(name)) {
      const hue = Math.floor(Math.random() * 360);
      this.colorMap.set(name, `hsl(${hue}, 70%, 50%)`);
    }
    return this.colorMap.get(name)!;
  }

  getContrastColor(bgColor: string): string {
    const rgb = bgColor.match(/\d+/g)?.map(Number);
    if (!rgb || rgb.length < 3) return 'black';
    const [r, g, b] = rgb;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? 'black' : 'white';
  }
}

function getNbParticipation(_Participant: Participant): number {
  let nbParticipation = 1;

  if (_Participant.aClassement()) {
    switch (_Participant.classement.toLowerCase()) {
      case "platine":
        nbParticipation = + 15
        break;
      case "or":
        nbParticipation = + 10
        break;
      case "argent":
        nbParticipation = + 5
        break;
      case "bronze":
        nbParticipation = + 3
        break;
    }

  }

  return nbParticipation;
}
