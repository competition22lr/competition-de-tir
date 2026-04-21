import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminStateService } from '../state/admin-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-competition-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './competition-form.component.html',
  styleUrls: ['./competition-form.component.css']
})
export class CompetitionFormComponent implements OnInit, OnDestroy {

  @Output() created = new EventEmitter<number>();

  form: FormGroup;
  loading = false;

  private sub?: Subscription;
  private clubId?: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private adminState: AdminStateService
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
    this.sub = this.adminState.stateChanges$.subscribe(state => {
      if (state.clubId !== this.clubId) {
        this.clubId = state.clubId;

        this.form.patchValue({
          id_club: this.clubId
        });

        if (this.clubId) {
          this.form.get('id_club')?.disable();
        } else {
          this.form.get('id_club')?.enable();
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
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

        // reset propre mais en gardant le club courant
        this.form.reset({
          id_club: this.clubId,
          actif: true
        });

        if (this.clubId) {
          this.form.get('id_club')?.disable();
        }
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'Erreur création compétition');
      }
    });
  }
}