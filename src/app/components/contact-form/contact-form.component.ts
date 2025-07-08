import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);

  form: FormGroup = this.fb.group({
    sujet: ['', Validators.required],
    section: [''],
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, emailPlusStrictValidator]],
    message: ['', Validators.required],
  });

  sujets = ['SUGGESTION', 'REGLEMENT', 'LICENCE'];
  sections = ['DEROULEMENT', 'CATEGORIES', 'FEUILLEPOINTS', 'CALCULPOINTS', 'CLASSEMENT', 'EQUIPEMENT', 'CALIBRES'];

  get isSectionRequired(): boolean {
    return this.form.get('sujet')?.value === 'REGLEMENT';
  }

  formSoumis = false;

  champInvalide(nom: string): boolean {
    const champ = this.form.get(nom);
    return !!champ && champ.invalid && (champ.touched || this.formSoumis);
  }

  envoyer() {
    this.formSoumis = true;

    // Rendre la section obligatoire uniquement si REGLEMENT est choisi
    if (this.isSectionRequired && !this.form.get('section')?.value) {
      this.form.get('section')?.setErrors({ required: true });
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { sujet, section, nom, email, message } = this.form.value;

    const sujetTexte = this.translate.instant('CONTACT.SUBJECTS.' + sujet);
    const sectionTexte = section ? this.translate.instant('CONTACT.SECTIONS.' + section) : '';

    const templateParams = {
      name: nom,
      email,
      sujet: sujetTexte,
      section: sectionTexte,
      message,
      time: new Date().toLocaleString()
    };

    emailjs.send('service_5fyttj7', 'template_7nttp4s', templateParams, 'gOZLc-fdBjBjbuP64')
      .then(() => {
        alert(this.translate.instant('CONTACT.SENT_CONFIRMATION'));
        this.form.reset();
      }, (error) => {
        console.error(error);
        alert(this.translate.instant('CONTACT.SEND_ERROR') || 'Erreur lors de l’envoi du message.');
      });
  }

  
}

export function emailPlusStrictValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) ? null : { emailStrict: true };
}