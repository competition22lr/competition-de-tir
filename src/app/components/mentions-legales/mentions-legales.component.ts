import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mentions-legales',
  imports: [TranslateModule],
  templateUrl: './mentions-legales.component.html',
  styleUrl: './mentions-legales.component.css'
})
export class MentionsLegalesComponent {
constructor(private translate: TranslateService) { }
}
