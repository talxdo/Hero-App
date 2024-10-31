import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '@interfaces/Hero';
import { HeroService } from '@services/hero.service';
import { delay, switchMap } from 'rxjs';
import { BuscarPipe } from '../../pipes/buscar.pipe';
import { FormsModule } from '@angular/forms';
import { SpinnerService } from '@services/spinner.service';
import { SpinnerComponent } from '@shared/spinner/spinner.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BuscarPipe, FormsModule, SpinnerComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})
export class HeroListComponent implements OnInit {

  private heroservice = inject(HeroService);
  private spinnerservice = inject(SpinnerService);

  cargando = this.spinnerservice.cargando;

  heroList = signal<Hero[]>([]);
  buscar : string = "";
  criterio : string = "";

  ngOnInit(): void {
    this.cargando = true;
    this.heroservice.getHeroes()
      .subscribe(
        res => {
          this.heroList.update(() => res);
          this.cargando = false;
        //console.log(res);
      },
      err => {
        this.cargando = false;
        console.error(err);
      })
  }

  eliminarHero(id : any){
    this.cargando = true;
    this.heroservice.deleteHero(id).pipe(
      switchMap(() => { 
        return this.heroservice.getHeroes(); 
      })
    ).subscribe(
      updatedHeroes => {
        this.heroList.update(() => updatedHeroes);
        this.cargando = false;
        //console.log(updatedHeroes);
  },
      err => {
        this.cargando = false;
        console.error(err);
      })}
  
}
