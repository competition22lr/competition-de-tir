import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type State = {
  clubId?: number;
  competitionId?: number;
  sessionId?: number;
  membreId?: number;
};

@Injectable({
  providedIn: 'root'
})
export class AdminStateService {

  private state$ = new BehaviorSubject<State>({});

  // =========================
  // STATE ACCESS
  // =========================
  get snapshot(): State {
    return this.state$.value;
  }

  stateChanges$ = this.state$.asObservable();

  // =========================
  // SETTERS (FLOW PROPRE)
  // =========================
  setClub(id: number) {
    this.state$.next({
      clubId: id,
      competitionId: undefined,
      sessionId: undefined,
      membreId: undefined
    });
  }

  setCompetition(id: number) {
    this.state$.next({
      ...this.snapshot,
      competitionId: id,
      sessionId: undefined,
      membreId: undefined
    });
  }

  setSession(id: number) {
    this.state$.next({
      ...this.snapshot,
      sessionId: id,
      membreId: undefined
    });
  }

  setMembre(id: number) {
    this.state$.next({
      ...this.snapshot,
      membreId: id
    });
  }

  // =========================
  // RESET PRO (IMPORTANT FIX)
  // =========================
  reset(level: 'club' | 'competition' | 'session') {

    const s = this.snapshot;

    if (level === 'club') {
      this.state$.next({
        clubId: undefined,
        competitionId: undefined,
        sessionId: undefined,
        membreId: undefined
      });
      return;
    }

    if (level === 'competition') {
      this.state$.next({
        clubId: s.clubId,
        competitionId: undefined,
        sessionId: undefined,
        membreId: undefined
      });
      return;
    }

    if (level === 'session') {
      this.state$.next({
        clubId: s.clubId,
        competitionId: s.competitionId,
        sessionId: undefined,
        membreId: undefined
      });
      return;
    }
  }

  // =========================
  // OPTIONAL BONUS (très utile)
  // =========================

  clearAll() {
    this.state$.next({});
  }
}