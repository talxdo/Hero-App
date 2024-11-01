import {Component, inject, input, computed, signal} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {finalize} from "rxjs";

import {HeroService} from '@services/hero.service';
import {Hero} from '@interfaces/hero';
import {SpinnerComponent} from '@shared/spinner/spinner.component';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SpinnerComponent],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent {

  title = input<string>('');
  hero = input<Hero | undefined>();
  
  #loading = signal(false)
  isLoading = computed(() => this.#loading())

  private heroService = inject(HeroService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  heroFormulario = computed<FormGroup>(() =>
    new FormGroup({
      'nombre': new FormControl(this.hero()?.nombre ?? '', Validators.required),
      'editorial': new FormControl(this.hero()?.editorial ?? '', Validators.required),
      'poderes': this.fb.array([new FormControl(this.hero()?.poderes[0] ?? '', Validators.required)], Validators.required),
      'identidadSecreta': new FormControl(this.hero()?.identidadSecreta ?? '', Validators.required),
      'debut': new FormControl(this.hero()?.debut ?? '', Validators.required),
      'imagen': new FormControl(this.hero()?.imagen ?? '', Validators.required),
    }));

    get poderes(): FormArray {
      return this.heroFormulario()?.get('poderes') as FormArray;
    }
  
    addPower() {
      this.poderes.push(this.fb.control('', Validators.required))
    }
  
    removePower(id: number) {
      this.poderes.removeAt(id);
    }

    resetForm() {
      this.heroFormulario()?.reset({
        nombre: '',
        editorial: '',
        poderes: '',
        identidadSecreta: '',
        debut: '',
        imagen: ''
      });
    }

    saveHero() {
      const poderesHero = this.heroFormulario()?.get('poderes')?.value || [];
      const nombreHero = this.heroFormulario()?.get('nombre')?.value?.toString() || '';
      const editorialHero = this.heroFormulario()?.get('editorial')?.value?.toString() || '';
      const identidadSecretaHero = this.heroFormulario()?.get('identidadSecreta')?.value?.toString() || '';
      const debutHero = this.heroFormulario()?.get('debut')?.value?.toString() || '';
      const imagenHero = this.heroFormulario()?.get('imagen')?.value?.toString() || '';
      
      const id = this.hero()?.id || '';
      const hero: Hero = {
        nombre: nombreHero,
        editorial: editorialHero,
        poderes: poderesHero,
        identidadSecreta: identidadSecretaHero,
        debut: debutHero,
        imagen: imagenHero
  
      }
      this.#loading.set(true);

      if(this.title() == 'Actualizar Héroe'){
        this.heroService.putHero(hero, id)
        .pipe(finalize(() => this.#loading.set(false)))
        .subscribe({
          error: err => console.error(err)
        });
      this.resetForm();
      this.router.navigate(['/heroes']);
      }
      else if(this.title() == 'Crear héroe'){
        this.heroService.postHero(hero)
        .pipe(finalize(() => this.#loading.set(false)))
        .subscribe({
          error: err => console.error(err)
        });
        this.resetForm();
        this.router.navigate(['/heroes']);
      } else {
        this.router.navigate(['/heroes']);
      }
      
    }  

}
