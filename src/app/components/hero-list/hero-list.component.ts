import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '@interfaces/Hero';
import { HeroService } from '@services/hero.service';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})
export class HeroListComponent implements OnInit {

  heroservice = inject(HeroService);

  heroList = signal<Hero[]>([]);

  ngOnInit(): void {
    this.heroservice.getHeroes()
      .subscribe(res => {
        this.heroList.set(res);
        console.log(res);
      })
  }

  eliminarHero(hero : Hero){
    console.log("Eliminado", hero.nombre)
  }
  
  

}
