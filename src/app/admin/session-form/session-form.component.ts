import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-session-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})
export class SessionFormComponent {

  @Input() competitionId?: number;
  @Output() created = new EventEmitter<number>();

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {

    // ✅ INITIALISATION ICI (IMPORTANT)
    this.form = this.fb.group({
      id_competition: [null, Validators.required],
      annee: [2026, Validators.required],
      mois: [1, Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      verrouille: [false]
    });
  }

  ngOnInit() {
    if (this.competitionId) {
      this.form.patchValue({
        id_competition: this.competitionId
      });

      this.form.get('id_competition')?.disable();
    }
  }

  save() {
    if (this.form.invalid) return;

    this.loading = true;

    const payload = this.form.getRawValue();

    this.http.post<any>('/api/sessions', payload).subscribe({
      next: (res) => {
        this.loading = false;
        this.created.emit(res.id_session);

        this.form.reset({
          id_competition: this.competitionId,
          annee: 2026,
          mois: 1,
          verrouille: false
        });
      },
      error: () => this.loading = false
    });
  }
}