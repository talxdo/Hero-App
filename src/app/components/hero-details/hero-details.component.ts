import { CommonModule } from '@angular/common';
import {Component, inject, computed, signal, input} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { Hero } from '@interfaces/hero';
import { HeroService } from '@services/hero.service';
import { SpinnerComponent } from '@shared/spinner/spinner.component';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [RouterLink, CommonModule, SpinnerComponent],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent {

  #loading = signal(false);
  isLoading = computed(() => this.#loading())

  private heroService = inject(HeroService);
  private router = inject(Router);

  public hero = input<Hero | undefined>();

  goBack(){
    this.router.navigate(['/heroes']);
  }

  deleteHero(){
    const id : string = this.hero()?.id || '';
    this.#loading.set(true);
    this.heroService.deleteHero(id)
      .pipe(
        finalize(() => this.#loading.set(false))
      )
      .subscribe({
          error : err => console.error(err)
      });
    this.router.navigate(['/heroes']);
  }

}
