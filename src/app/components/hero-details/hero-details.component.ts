import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Hero } from '@interfaces/Hero';
import { HeroService } from '@services/hero.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent {
  
  private route = inject(ActivatedRoute);
  private heroservice = inject(HeroService);

  public hero = toSignal<Hero>(
    this.route.params
    .pipe(
      switchMap(({id}) => this.heroservice.getHeroById(id))
    )
  )

}
