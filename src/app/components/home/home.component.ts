import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize, map, take } from 'rxjs';

import { Hero } from '@interfaces/hero';
import { HeroService } from '@services/hero.service';
import { SpinnerComponent } from '@shared/spinner/spinner.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SpinnerComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  heroService = inject(HeroService);

  #loading = signal(false);
  isLoading = computed(() => this.#loading());

  randomHeroList$ = signal<Hero[]>([]);

  ngOnInit(): void {
    this.#loading.set(true);
    this.sevenRandomHeroes()
      .pipe(finalize(()=> this.#loading.set(false))
      )
      .subscribe({
        next: res => this.randomHeroList$.update(value => value = res),
        error: err => console.error(err)
      })    
  }

  sevenRandomHeroes(){
    return this.heroService.getHeroes().pipe(
      map((heroes) => this.shuffleHeroList(heroes)),
      map((heroes_random) => heroes_random.slice(0, 6)),
      take(1)
    );
  }

  shuffleHeroList(heroArray: Hero[]) : Hero[]{
    for (let index = heroArray.length - 1 ; index > 0; index--) {
      const nuevo_index = Math.floor(Math.random() * (index + 1));
      [heroArray[index], heroArray[nuevo_index]] = [heroArray[nuevo_index], heroArray[index]];
    }
    return heroArray;
  }
}
