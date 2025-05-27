import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-participant-dialog',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule // ← indispensable pour que le bouton soit stylisé et fonctionnel
  ],
  templateUrl: './participant-dialog.component.html',
  styleUrls: ['./participant-dialog.component.css']
})
export class ParticipantDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { nom: string; participations: number; mois: string[] }) {}
}
