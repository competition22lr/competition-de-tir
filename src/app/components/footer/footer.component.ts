import { Component } from '@angular/core';
import { ResultatsService } from '../../services/resultats.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: [ '../../../styles-print.css','./footer.component.css']
})
export class FooterComponent {
  constructor(public resultatsService: ResultatsService , private router: Router) { }
}
