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

  estInviter(): boolean {
    let estInviter_ = false;

    if (this.numero.substring(0, 4) === "0000") { estInviter_ = true; }

    else if (this.numero.indexOf("-i") > 0) { estInviter_ = true; }

    else if (this.numero.indexOf("-1") > 0) { estInviter_ = true; }
    
    return estInviter_;
  }
}