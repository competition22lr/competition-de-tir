import { Component, Input } from '@angular/core';
import { ResultatsService } from '../../services/resultats.service';
import { Router, RouterModule } from '@angular/router';
import { appVersion } from '../../../environments/version';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [RouterModule,TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['../../../styles-print.css', './footer.component.css']
})
export class FooterComponent {
  version = appVersion; // crée une propriété accessible au HTML  
  @Input() isPrintMode = false;
  constructor(public resultatsService: ResultatsService, private router: Router) { }
}
