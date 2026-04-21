import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-club-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent {

  @Output() created = new EventEmitter<number>();

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      nom_club: ['', Validators.required],
      description: [''],

      adresse_ligne1: [''],
      ville: [''],
      province: [''],
      code_postal: [''],
      pays: ['Canada'],

      telephone: [''],
      email: ['', Validators.email],
      site_web: [''],
      google_maps_url: [''],

      actif: [true]
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = this.form.value;

    this.http.post<any>('/api/clubs', payload).subscribe({
      next: (res) => {
        this.loading = false;

        // 🔥 retourne id_club au dashboard
        this.created.emit(res.id_club);

        // reset form après création
        this.form.reset({
          pays: 'Canada',
          actif: true
        });
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'Erreur lors de la création du club');
      }
    });
  }
}