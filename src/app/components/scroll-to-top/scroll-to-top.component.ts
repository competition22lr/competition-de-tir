import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ResultatsService } from '../../services/resultats.service';

@Component({
  selector: 'app-scroll-to-top',
   imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {
  @Input() showLogo = true;
  @Input() logoUrl?: string;
  @Input() icon: string = '⮝';
  @Input() position = { bottom: 24, right: 24 };

  showButton = false;

  constructor(public resultatsService: ResultatsService) { }

  ngOnInit(): void {
    // Initialise un logo par défaut si rien n’est fourni
    if (this.showLogo && !this.logoUrl) {
      this.logoUrl = this.resultatsService.imageLocationUrl + 'LogoClubDeTir.png'
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showButton = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
