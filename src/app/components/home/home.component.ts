import {CommonModule} from '@angular/common';
import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {delay, finalize, map, take} from 'rxjs';

import {Hero} from '@interfaces/hero';
import {HeroService} from '@services/hero.service';
import {SpinnerService} from "@shared/spinner/spinner.service";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  heroService = inject(HeroService);
  loadingService = inject(SpinnerService)

  randomHeroList$ = signal<Hero[]>([]);

  ngOnInit(): void {
    this.loadingService.open()
    this.sevenRandomHeroes()
      .pipe(delay(500), finalize(() => this.loadingService.close()))
      .subscribe({
        next: res => this.randomHeroList$.set(res),
        error: err => console.error(err)
      })
  }

  sevenRandomHeroes() {
    return this.heroService.getHeroes().pipe(
      map(heroes => this.shuffleHeroList(heroes)),
      map(heroes_random => heroes_random.slice(0, 6)),
      take(1)
    );
  }

  shuffleHeroList(heroArray: Hero[]): Hero[] {
    for (let index = heroArray.length - 1; index > 0; index--) {
      const nuevo_index = Math.floor(Math.random() * (index + 1));
      [heroArray[index], heroArray[nuevo_index]] = [heroArray[nuevo_index], heroArray[index]];
    }
    return heroArray;
  }
}
