import {Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs';

import {Hero} from '@interfaces/hero';
import {HeroService} from '@services/hero.service';
import {CreateHeroComponent} from "@components/create-hero/create-hero.component";


@Component({
  selector: 'app-update-hero',
  standalone: true,
  imports: [CreateHeroComponent],
  templateUrl: './update-hero.component.html',
  styleUrl: './update-hero.component.css'
})
export class UpdateHeroComponent {

  private route = inject(ActivatedRoute);
  private heroService = inject(HeroService)
  public hero = toSignal<Hero>(this.route.params.pipe(switchMap(({id}) => this.heroService.getHeroById(id))))
}
