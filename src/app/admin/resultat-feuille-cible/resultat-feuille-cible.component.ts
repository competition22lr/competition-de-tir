import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MOCK_MEMBRES } from '../../mocks/mock-membres';
import { MOCK_RESULTATS } from '../../mocks/mock-resultat';
import { MOCK_RESULTAT_CIBLES } from '../../mocks/mock-resultat-cible';

type Cible = {
  numero_cible: number;
  score: number;
  bonus: number;
};

@Component({
  selector: 'app-resultat-feuille-cible',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resultat-feuille-cible.component.html',
  styleUrls: ['./resultat-feuille-cible.component.css']
})
export class ResultatFeuilleCibleComponent implements OnInit {

  @Input() idResultat?: number;
  @Input() idSession?: number;
  @Input() idClub?: number;
  @Input() idMembre?: number;
  @Output() saved = new EventEmitter<number>();

  form!: FormGroup;
  loading = false;
  membres: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadMembres();

    this.form = this.fb.group({
      id_membre: [this.idMembre ?? null, Validators.required],

      // =========================
      // HEADER = TABLE RESULTATS
      // =========================
      date_tir: ['', Validators.required],
      numero_feuille: [1, Validators.required],
      calibre: [''],
      position_tir: [''],
      signature_officiel: [''],
      note: [''],

      // =========================
      // CHILDREN = resultat_cibles
      // =========================
      cibles: this.fb.array([])
    });

    this.buildCibles();

    if (this.idResultat) {
      this.load();
    }
  }


  loadMembres(): void {

    // 🔥 filtre actifs seulement
    let list = MOCK_MEMBRES.filter(m => m.actif);

    // 🔥 si tu veux filtrer par club plus tard
    // (quand tu passeras idClub en @Input)
    if (this.idClub) {
      list = list.filter(m => m.id_club === this.idClub);
    }

    this.membres = list;
  }

  // =========================
  // FORM ARRAY SAFE
  // =========================
  get cibles(): FormArray {
    return this.form.get('cibles') as FormArray;
  }

  private createCible(c: Cible): FormGroup {
    return this.fb.group({
      numero_cible: [c.numero_cible],
      score: [c.score, [Validators.min(0)]],
      bonus: [c.bonus, [Validators.min(0)]]
    });
  }

  buildCibles(): void {
    for (let i = 1; i <= 20; i++) {
      this.cibles.push(
        this.createCible({
          numero_cible: i,
          score: 0,
          bonus: 0
        })
      );
    }
  }

  // =========================
  // LOAD (JOIN resultats + resultat_cibles)
  // =========================
  load(): void {

    const resultat = MOCK_RESULTATS.find(r => r.id_resultat === this.idResultat);

    if (!resultat) return;

    const cibles = MOCK_RESULTAT_CIBLES.filter(c => c.id_resultat === this.idResultat);

    // HEADER
    this.form.patchValue({
      id_membre: resultat.id_membre,
      date_tir: resultat.date_tir,
      numero_feuille: resultat.numero_feuille,
      calibre: resultat.calibre,
      position_tir: resultat.position_tir,
      note: resultat.note
    });

    // RESET CHILDREN
    this.cibles.clear();

    for (let i = 1; i <= 20; i++) {

      const existing = cibles.find(c => c.numero_cible === i);

      this.cibles.push(
        this.createCible({
          numero_cible: i,
          score: existing?.score ?? 0,
          bonus: existing?.bonus ?? 0
        })
      );
    }
  }

  // =========================
  // INDEX ACCESS SAFE (OPTION 3 PRO)
  // =========================
  getScore(i: number): FormControl {
    return this.cibles.at(i).get('score') as FormControl;
  }

  getBonus(i: number): FormControl {
    return this.cibles.at(i).get('bonus') as FormControl;
  }

  // =========================
  // TOTALS (PURE)
  // =========================
  get totalBase(): number {
    return this.cibles.controls.reduce(
      (sum, c: any) => sum + (c.get('score')?.value || 0),
      0
    );
  }

  get totalBonus(): number {
    return this.cibles.controls.reduce(
      (sum, c: any) => sum + (c.get('bonus')?.value || 0),
      0
    );
  }

  get total(): number {
    return this.totalBase + this.totalBonus;
  }

  // =========================
  // SAVE (1:1 + CHILDREN CLEAN PAYLOAD)
  // =========================
  save(): void {
    if (this.form.invalid) return;

    this.loading = true;

    const payload = {
      resultat: {
        id_resultat: this.idResultat ?? Date.now(),
        id_session: this.idSession ?? Date.now(),
        id_membre: this.form.value.id_membre,
        date_tir: this.form.value.date_tir,
        numero_feuille: this.form.value.numero_feuille,
        calibre: this.form.value.calibre,
        position_tir: this.form.value.position_tir,
        signature_officiel: this.form.value.signature_officiel,
        note: this.form.value.note,
        total: this.total
      },

      cibles: this.cibles.value
    };

    // =========================
    // 🔥 MOCK SAVE (simulate API)
    // =========================

    setTimeout(() => {

      // 👉 UPDATE ou INSERT resultat
      const index = MOCK_RESULTATS.findIndex(r => r.id_resultat === payload.resultat.id_resultat);

      if (index >= 0) {
        MOCK_RESULTATS[index] = payload.resultat;
      } else {
        MOCK_RESULTATS.push(payload.resultat);
      }

      // 👉 DELETE anciennes cibles
      for (let i = MOCK_RESULTAT_CIBLES.length - 1; i >= 0; i--) {
        if (MOCK_RESULTAT_CIBLES[i].id_resultat === payload.resultat.id_resultat) {
          MOCK_RESULTAT_CIBLES.splice(i, 1);
        }
      }

      // 👉 INSERT nouvelles cibles
      payload.cibles.forEach((c: any, i: number) => {
        MOCK_RESULTAT_CIBLES.push({
          id_cible: Date.now() + i,
          id_resultat: payload.resultat.id_resultat,
          numero_cible: c.numero_cible,
          score: c.score,
          bonus: c.bonus
        });
      });

      this.loading = false;

      this.saved.emit(payload.resultat.id_resultat);

    }, 300); // simulate latency

    console.log(MOCK_RESULTATS);
    console.log(MOCK_RESULTAT_CIBLES);
  }
}