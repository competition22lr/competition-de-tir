import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ResultatsService } from '../../services/resultats.service';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {
  @Input() showLogo = true;
  @Input() logoUrl?: string;
  @Input() position = { bottom: 24, right: 24 };

  showButton = false;

  constructor(public resultatsService: ResultatsService) {}

  ngOnInit(): void {
    // Logo par défaut
    if (this.showLogo && !this.logoUrl) {
      this.logoUrl = this.resultatsService.imageLocationUrl + 'LogoClubDeTir.png';
    }

    // Appliquer la position initiale
    this.updatePosition(window.innerWidth);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showButton = window.scrollY > 300;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = (event.target as Window).innerWidth;
    this.updatePosition(width);
  }

  private updatePosition(width: number): void {
    if (width <= 600) {
      this.position.right = 5;
    } else {
      this.position.right = 24;
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
