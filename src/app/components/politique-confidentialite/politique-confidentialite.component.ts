import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-politique-confidentialite',
  imports: [CommonModule, TranslateModule],
  templateUrl: './politique-confidentialite.component.html',
  styleUrl: './politique-confidentialite.component.css'
})
export class PolitiqueConfidentialiteComponent {
  lastUpdated = new Date();
}
