import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroService } from '@services/hero.service';
import { Hero } from '@interfaces/Hero';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-create-hero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SpinnerComponent],
  templateUrl: './create-hero.component.html',
  styleUrl: './create-hero.component.css'
})
export class CreateHeroComponent{

  private heroservice = inject(HeroService);
  private spinnerservice = inject(SpinnerService);
  private fb = inject(FormBuilder);

  cargando = this.spinnerservice.cargando;

  public heroFormulario: FormGroup = new FormGroup({
    'nombre': new FormControl('', Validators.required),
    'editorial': new FormControl('', Validators.required),
    'poderes': this.fb.array([], Validators.required),
    'identidadSecreta': new FormControl('', Validators.required),
    'debut': new FormControl('', Validators.required),
    'imagen': new FormControl('', Validators.required),
  })



  get poderes(): FormArray {
    return this.heroFormulario.get('poderes') as FormArray;
  }

  agregarPoder(){
    this.poderes.push(this.fb.control('', Validators.required))
  }

  eliminarPoder(id: number){
    this.poderes.removeAt(id);
  }

  reiniciarCampos(){
    this.heroFormulario.reset({
      nombre: '',
      editorial: '',
      poderes: '',
      identidadSecreta: '',
      debut: '',
      imagen: ''
    });
    console.log("reiniciar");
  }

  crearHero(){
    let poderesHero = 
    this.heroFormulario.get('poderes')?.value || [];
    let nombreHero = 
      this.heroFormulario.get('nombre')?.value?.toString() || '';
    let editorialHero = 
      this.heroFormulario.get('editorial')?.value?.toString() || '';
    let identidadSecretaHero = 
      this.heroFormulario.get('identidadSecreta')?.value?.toString() || '';
    let debutHero = 
      this.heroFormulario.get('debut')?.value?.toString() || '';
    let imagenHero = 
      this.heroFormulario.get('imagen')?.value?.toString() || '';
    
    let hero : Hero = {
      nombre: nombreHero,
      editorial: editorialHero,
      poderes: poderesHero,
      identidadSecreta: identidadSecretaHero,
      debut: debutHero,
      imagen : imagenHero
      
    }
    //console.log(hero);
    this.cargando = true;
    this.heroservice.postHero(hero)
    .subscribe(
      res => this.cargando = false,
      err => {
        this.cargando = false;
        console.error(err);
      });
      this.reiniciarCampos();
    }

}
