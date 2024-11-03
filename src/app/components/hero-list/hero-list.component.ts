import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { delay, finalize, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { Hero } from '@interfaces/hero';
import { HeroService } from '@services/hero.service';
import { BuscarPipe } from '../../pipes/buscar.pipe';
import { SpinnerService } from '@shared/spinner/spinner.service';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BuscarPipe, FormsModule],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css',
})
export class HeroListComponent implements OnInit {
  private heroService = inject(HeroService);
  private spinnerService = inject(SpinnerService);

  heroList = signal<Hero[]>([]);
  searchInput: string = '';
  criterio: string = '';

  ngOnInit(): void {
    this.spinnerService.open();
    this.heroService
      .getHeroes()
      .pipe(
        delay(500),
        finalize(() => this.spinnerService.close())
      )
      .subscribe({
        next: (res) => this.heroList.set(res),
        error: (err) => console.error(err),
      });
  }

  deleteHero(id: any) {
    this.spinnerService.open();
    this.heroService
      .deleteHero(id)
      .pipe(
        delay(500),
        switchMap(() => {
          return this.heroService.getHeroes();
        }),
        finalize(() => this.spinnerService.close())
      )
      .subscribe({
        next: (res) => this.heroList.set(res),
        error: (err) => console.error(err),
      });
  }
}
