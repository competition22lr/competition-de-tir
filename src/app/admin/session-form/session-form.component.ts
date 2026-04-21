import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminStateService } from '../state/admin-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-session-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})
export class SessionFormComponent implements OnInit, OnDestroy {

  @Output() created = new EventEmitter<number>();

  form: FormGroup;
  loading = false;

  private sub?: Subscription;
  private competitionId?: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private adminState: AdminStateService
  ) {

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
    this.sub = this.adminState.stateChanges$.subscribe(state => {
      if (state.competitionId !== this.competitionId) {
        this.competitionId = state.competitionId;

        this.form.patchValue({
          id_competition: this.competitionId
        });

        if (this.competitionId) {
          this.form.get('id_competition')?.disable();
        } else {
          this.form.get('id_competition')?.enable();
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
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

        if (this.competitionId) {
          this.form.get('id_competition')?.disable();
        }
      },
      error: () => this.loading = false
    });
  }
}