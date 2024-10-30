import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '@interfaces/Hero';
import { HeroService } from '@services/hero.service';
import { switchMap } from 'rxjs';
import { BuscarPipe } from '../../pipes/buscar.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BuscarPipe, FormsModule],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})
export class HeroListComponent implements OnInit {

  private heroservice = inject(HeroService);

  heroList = signal<Hero[]>([]);
  buscar : string = "";
  criterio : string = "";

  ngOnInit(): void {
    this.heroservice.getHeroes()
      .subscribe(res => {
        this.heroList.update(() => res);
        console.log(res);
      })
  }

  eliminarHero(id : any){
    this.heroservice.deleteHero(id).pipe(
      switchMap(() => { 
        return this.heroservice.getHeroes(); 
      })
    ).subscribe(updatedHeroes => {
      this.heroList.update(() => updatedHeroes);
      console.log(updatedHeroes);
  })}
  
}
