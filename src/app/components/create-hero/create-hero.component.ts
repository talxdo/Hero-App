import {Component, inject, input, computed, signal} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {finalize} from "rxjs";

import {HeroService} from '@services/hero.service';
import {Hero} from '@interfaces/hero';
import {SpinnerComponent} from '@shared/spinner/spinner.component';


@Component({
  selector: 'app-create-hero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SpinnerComponent],
  templateUrl: './create-hero.component.html',
  styleUrl: './create-hero.component.css'
})
export class CreateHeroComponent {

  title = input<string>('Crear Héroe');
  hero = input<Hero | undefined>();
  #cargando = signal(false)
  isLoading = computed(() => this.#cargando())

  private heroservice = inject(HeroService);
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

  agregarPoder() {
    this.poderes.push(this.fb.control('', Validators.required))
  }

  eliminarPoder(id: number) {
    this.poderes.removeAt(id);
  }

  reiniciarCampos() {
    this.heroFormulario()?.reset({
      nombre: '',
      editorial: '',
      poderes: '',
      identidadSecreta: '',
      debut: '',
      imagen: ''
    });
  }

  crearHero() {
    const poderesHero = this.heroFormulario()?.get('poderes')?.value || [];
    const nombreHero = this.heroFormulario()?.get('nombre')?.value?.toString() || '';
    const editorialHero = this.heroFormulario()?.get('editorial')?.value?.toString() || '';
    const identidadSecretaHero = this.heroFormulario()?.get('identidadSecreta')?.value?.toString() || '';
    const debutHero = this.heroFormulario()?.get('debut')?.value?.toString() || '';
    const imagenHero = this.heroFormulario()?.get('imagen')?.value?.toString() || '';

    const hero: Hero = {
      nombre: nombreHero,
      editorial: editorialHero,
      poderes: poderesHero,
      identidadSecreta: identidadSecretaHero,
      debut: debutHero,
      imagen: imagenHero

    }
    this.#cargando.set(true);
    this.heroservice.postHero(hero)
      .pipe(finalize(() => this.#cargando.set(true)))
      .subscribe({
        error: err => console.error(err)
      });
    this.reiniciarCampos();
  }

}
