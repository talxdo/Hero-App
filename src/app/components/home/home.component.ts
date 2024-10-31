import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '@interfaces/hero';
import { HeroService } from '@services/hero.service';
import { SpinnerService } from '@services/spinner.service';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SpinnerComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  heroservice = inject(HeroService);
  private spinnerservice = inject(SpinnerService);

  cargando = this.spinnerservice.cargando;

  randomHeroList$ = signal<Hero[]>([]);

  ngOnInit(): void {
    this.cargando = true;
    this.sieteHeroesRandom().subscribe(
      heroes => {
        this.randomHeroList$.update(() => heroes);
        this.cargando = false;
        //console.log(heroes);
      },
      err => {
        this.cargando = false;
        console.error(err);
      })
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
