import { Component } from '@angular/core';
import { ResultatsService } from '../../services/resultats.service';
import { Router, RouterModule } from '@angular/router';
import { appVersion } from '../../../environments/version';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: [ '../../../styles-print.css','./footer.component.css']
})
export class FooterComponent {  
  version = appVersion; // crée une propriété accessible au HTML
  constructor(public resultatsService: ResultatsService , private router: Router) {   
  }
}
