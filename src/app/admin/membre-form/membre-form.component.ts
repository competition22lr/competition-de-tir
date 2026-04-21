import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MOCK_MEMBRES } from '../../mocks/mock-membres';
import { AdminStateService } from '../state/admin-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-membre-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './membre-form.component.html',
  styleUrls: ['./membre-form.component.css']
})
export class MembreFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  @Output() created = new EventEmitter<number>();
  @Output() cancel = new EventEmitter<void>();

  private sub?: Subscription;
  private clubId?: number;

  constructor(
    private fb: FormBuilder,
    private adminState: AdminStateService
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      num_membre: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      courriel: [''],
      telephone: [''],
      actif: [true]
    });

    this.sub = this.adminState.stateChanges$.subscribe(state => {
      this.clubId = state.clubId;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // =========================
  // SAVE
  // =========================
  save() {
    if (this.form.invalid) return;

    if (!this.clubId) {
      console.warn('Aucun club sélectionné');
      return;
    }

    const newId =
      Math.max(...MOCK_MEMBRES.map(m => m.id_membre)) + 1;

    const membre = {
      id_membre: newId,
      id_club: this.clubId, // 🔥 STATE GLOBAL
      ...this.form.value,
      date_inscription: new Date().toISOString().slice(0, 10)
    };

    MOCK_MEMBRES.push(membre);

    this.created.emit(newId);

    this.form.reset({
      actif: true
    });
  }

  // =========================
  // CANCEL
  // =========================
  onCancel() {
    this.cancel.emit();
  }
}