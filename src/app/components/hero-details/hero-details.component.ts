import { CommonModule } from '@angular/common';
import {Component, inject, computed, signal, OnInit} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize, switchMap } from 'rxjs';

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
export class HeroDetailsComponent implements OnInit{

  #loading = signal(false);
  isLoading = computed(() => this.#loading())

  private route = inject(ActivatedRoute);
  private heroService = inject(HeroService);
  private router = inject(Router);

  public id?: string;
  public hero = toSignal<Hero>(this.route.params.pipe(switchMap(({id}) => this.heroService.getHeroById(id))))

  ngOnInit(): void {
    this.id = this.hero()?.id;
  }

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
