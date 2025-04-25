export class Participant {
  numero!: string;
  nom!: string;
  pointage!: number;
  pointBoni!: number;
  total!: number;
  classement!: string;

  constructor(init?: Partial<Participant>) {
    Object.assign(this, init);
  }

  aClassement(): boolean {
    return !!this.classement && this.classement.trim() !== '';
  }
}