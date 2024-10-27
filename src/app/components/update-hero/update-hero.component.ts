import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Hero } from '@interfaces/Hero';
import { HeroService } from '@services/hero.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-update-hero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-hero.component.html',
  styleUrl: './update-hero.component.css'
})
export class UpdateHeroComponent implements OnInit{

  private heroservice = inject(HeroService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public id: string = "";
  //public hero = signal<Hero | undefined>(undefined);
  public hero = toSignal(
    this.route.params
      .pipe(
        switchMap(({id}) => this.heroservice.getHeroById(id))
      )
  )
  
  public heroFormulario: FormGroup = new FormGroup({
    'nombre': new FormControl('', Validators.required),
    'editorial': new FormControl('', Validators.required),
    'poderes': this.fb.array([], Validators.required),
    'identidadSecreta': new FormControl('', Validators.required),
    'debut': new FormControl('', Validators.required),
    'imagen': new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.heroservice.getHeroById(this.id)
      .subscribe(res => {
        this.heroFormulario.get('nombre')?.setValue(res.nombre);
        this.heroFormulario.get('editorial')?.setValue(res.editorial);
        this.heroFormulario.get('identidadSecreta')?.setValue(res.identidadSecreta);
        this.heroFormulario.get('debut')?.setValue(res.debut);
        this.heroFormulario.get('imagen')?.setValue(res.imagen);
        if(res.poderes){
          res.poderes.forEach(poder => {
            this.poderes.push(this.fb.control(poder, Validators.required));
          })
        }
      
      })

    console.log(this?.hero()?.nombre)
  }

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

  modificarHero(){
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

    this.heroservice.putHero(hero, this.id)
    .subscribe(res => console.log(res));
    this.router.navigate(['/heroes:']);
  }
}
