import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { delay, finalize } from 'rxjs';

import { Hero } from '@interfaces/hero';
import { HeroService } from '@services/hero.service';
import { SpinnerService } from '@shared/spinner/spinner.service';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css',
})
export class HeroDetailsComponent {
  private heroService = inject(HeroService);
  private router = inject(Router);
  private spinnerService = inject(SpinnerService);

  public hero = input<Hero | undefined>();

  goBack() {
    this.router.navigate(['/heroes']);
  }

  deleteHero() {
    const id: string = this.hero()?.id || '';
    this.spinnerService.open();
    this.heroService
      .deleteHero(id)
      .pipe(
        delay(500),
        finalize(() => this.spinnerService.open())
      )
      .subscribe({
        error: (err) => console.error(err),
      });
    this.router.navigate(['/heroes']);
  }
}
