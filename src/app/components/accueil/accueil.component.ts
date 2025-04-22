import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResultatsService } from '../../services/resultats.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  
    constructor(public resultatsService: ResultatsService) { }
}
