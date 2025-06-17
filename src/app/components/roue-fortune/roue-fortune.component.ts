// Importations Angular et services locaux
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResultatsService } from '../../services/resultats.service';
import { Participant } from '../../models/participant.model';
import { Utilistaire } from '../../services/utilitaire';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

// Interface représentant un nom affiché dans la roue
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
export class RoueFortuneComponent implements OnInit {

  private rounds: number = 3; // Nombre de tours virtuels (pour effet de vitesse/longueur)
  itemHeight = 68; // 60px slot + 8px margin (4px haut/bas)
  middleIndexOffset = 4; // pour la 5e case (0-based index)

  names: Participation[] = []; // Liste complète des participations (avec duplications selon le rang)
  displayedNames: Participation[] = []; // Non utilisé dans ce code (peut servir à des filtres/affichages alternatifs)
  displayedIndexes: number[] = []; // Index utilisés pour simuler les tours

  isSpinning = false; // Empêche de lancer plusieurs spins
  winner: Participation | null = null; // Résultat du tirage

  @ViewChild('carousel', { static: true }) carousel!: ElementRef; // Référence au conteneur scrollable

  private colorMap = new Map<string, string>(); // Pour colorer chaque nom différemment
  indexCompetitionSelectionne!: number;

  constructor(
    public resultatsService: ResultatsService,
    @Inject(MAT_DIALOG_DATA) public data: { mois: string, competition: number }
  ) { }

  ngOnInit() {
    const mois = this.data.mois;
    const competition = this.data.competition;

    console.log('Mois:', mois);
    console.log('Compétition:', competition);

    // Récupération des participants pour le mois/compétition
    this.resultatsService.getParticipantsPourMois(competition, mois).subscribe((participants: Participant[]) => {
      let indx = 0;

      // On ajoute plusieurs entrées selon le classement du participant
      participants.forEach((element) => {
        const nbParticipation = getNbParticipation(element);
        for (let i = 0; i < nbParticipation; i++) {
          this.names.push({
            id: ++indx,
            numMembre: element.numero,
            name: element.nom
          });
        }
      });

      Utilistaire.Log("this.names >", this.names);
      this.shuffleNames(); // Mélanger les noms pour un tirage plus équitable

      // Remplissage de la séquence d'index simulant plusieurs tours
      this.genererDisplayedIndexes();
    });
  }

  // Mélange le tableau de noms de manière aléatoire
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

    const visibleSlots = 9;
    const middleSlotOffset = Math.floor(visibleSlots / 2); // 4
    const totalItems = this.names.length;

    // 🔁 Générer les index visibles pour les rounds
    this.genererDisplayedIndexes();

    // 🎯 Choisir un gagnant aléatoire dans la dernière boucle
    const winnerTrueIndex = Math.floor(Math.random() * totalItems);
    // const winnerTrueIndex = this.names.findIndex(p => p.id == 21);

    // 📍 Position finale dans la displayedIndexes (le vrai gagnant)
    const winnerIndexInDisplayed = winnerTrueIndex + totalItems * (this.rounds - 1);

    // 🧮 Le scrollTop pour que le gagnant arrive à la 5ᵉ case (index 4)
    const scrollTop = (winnerIndexInDisplayed - middleSlotOffset) * this.itemHeight;

    this.animateVerticalScroll(this.carousel.nativeElement, scrollTop, 10000).then(() => {
      // ✅ Correction d’alignement exact
      this.carousel.nativeElement.scrollTop = scrollTop;

      const trueIndex = this.displayedIndexes[winnerIndexInDisplayed];
      this.winner = this.names[trueIndex];

      console.log("targetIndex:", winnerIndexInDisplayed);
      console.log("trueIndex:", trueIndex);
      console.log("Gagnant:", this.winner);

      this.isSpinning = false;
    });
  }



  // Fonction d’animation de scroll vertical
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

  // Fonction d’adoucissement du scroll
  easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  // Génère une couleur unique pour chaque nom
  getColor(name: string): string {
    if (!this.colorMap.has(name)) {
      const hue = Math.floor(Math.random() * 360);
      this.colorMap.set(name, `hsl(${hue}, 70%, 50%)`);
    }
    return this.colorMap.get(name)!;
  }

  // Calcule une couleur de texte lisible selon la couleur de fond
  getContrastColor(bgColor: string): string {
    const rgb = bgColor.match(/\d+/g)?.map(Number);
    if (!rgb || rgb.length < 3) return 'black';
    const [r, g, b] = rgb;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? 'black' : 'white';
  }

  genererDisplayedIndexes() {
    if (this.displayedIndexes.length == 0) {
      this.displayedIndexes = [];
      for (let i = 0; i < this.rounds; i++) {
        for (let j = 0; j < this.names.length; j++) {
          this.displayedIndexes.push(j);
        }
      }
    }
  }
}

// Fonction qui détermine le nombre de participations d’un participant selon son classement
function getNbParticipation(_Participant: Participant): number {
  let nbParticipation = 1;

  if (_Participant.aClassement()) {
    switch (_Participant.classement.toLowerCase()) {
      case "platine":
        nbParticipation = 15;
        break;
      case "or":
        nbParticipation = 10;
        break;
      case "argent":
        nbParticipation = 5;
        break;
      case "bronze":
        nbParticipation = 3;
        break;
    }
  }

  return nbParticipation;
}