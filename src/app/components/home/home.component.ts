import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '@interfaces/Hero';
import { HeroService } from '@services/hero.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  heroservice = inject(HeroService);

  randomHeroList$ = signal<Hero[]>([]);
  
  ngOnInit(): void {
    this.sieteHeroesRandom().subscribe(
      heroes => {
        this.randomHeroList$.update(() => heroes);
        console.log(heroes);
    })
    console.log()
  }

  sieteHeroesRandom(){
    return this.heroservice.getHeroes().pipe(
      map((heroes) => this.heroListDesordenado(heroes)),
      map((heroes_random) => heroes_random.slice(0, 6)),
      take(1)
    );
  }

  heroListDesordenado(arregloHeroes: Hero[]) : Hero[]{
    for (let index = arregloHeroes.length - 1 ; index > 0; index--) {
      const nuevo_index = Math.floor(Math.random() * (index + 1));
      [arregloHeroes[index], arregloHeroes[nuevo_index]] = [arregloHeroes[nuevo_index], arregloHeroes[index]]; 
    }
    return arregloHeroes;
  }
}
