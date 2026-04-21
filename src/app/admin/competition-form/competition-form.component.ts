import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-competition-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './competition-form.component.html',
  styleUrls: ['./competition-form.component.css']
})
export class CompetitionFormComponent implements OnInit {

  @Input() clubId?: number;
  @Output() created = new EventEmitter<number>();

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {

    this.form = this.fb.group({
      id_club: [null, Validators.required],
      id_type: [null, Validators.required],

      nom: ['', Validators.required],
      description: [''],

      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],

      actif: [true]
    });
  }

  ngOnInit() {
    if (this.clubId) {
      this.form.patchValue({
        id_club: this.clubId
      });

      this.form.get('id_club')?.disable();
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = this.form.getRawValue();

    this.http.post<any>('/api/competitions', payload).subscribe({
      next: (res) => {
        this.loading = false;

        this.created.emit(res.id_competition);

        this.form.reset({
          id_club: this.clubId,
          actif: true
        });
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'Erreur création compétition');
      }
    });
  }
}