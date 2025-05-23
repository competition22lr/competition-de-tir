import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResultatsService } from '../../services/resultats.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterModule, TranslateModule,CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

  constructor(public resultatsService: ResultatsService, public translate: TranslateService) { }
}
