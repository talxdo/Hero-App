import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { Hero } from '@interfaces/hero';
import { HeroService } from '@services/hero.service';
import { BuscarPipe } from '../../pipes/buscar.pipe';
import { SpinnerComponent } from '@shared/spinner/spinner.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BuscarPipe, FormsModule, SpinnerComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})
export class HeroListComponent implements OnInit {

  private heroService = inject(HeroService);

  #loading = signal(false);
  isLoading = computed(() => this.#loading())

  heroList = signal<Hero[]>([]);
  searchInput : string = "";
  criterio : string = "";

  ngOnInit(): void {
    this.#loading.set(true);
    this.heroService.getHeroes()
      .pipe(
        finalize(() => this.#loading.set(false))
      )
      .subscribe({
        next : res => this.heroList.set(res),
        error: err => console.error(err)
      }
      )
  }

  deleteHero(id : any){
    this.#loading.set(true);
    this.heroService.deleteHero(id)
    .pipe(
      switchMap(() => {
        return this.heroService.getHeroes();
      }),
      finalize(() => this.#loading.set(false))            
    )
    .subscribe({
      next: res => this.heroList.set(res),
      error: err => console.error(err)
    }
    )}

}
