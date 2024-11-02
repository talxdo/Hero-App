import {Component, inject, input} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs';

import {Hero} from '@interfaces/hero';
import {HeroService} from '@services/hero.service';
import { HeroFormComponent } from '@components/hero-form/hero-form.component';


@Component({
  selector: 'app-update-hero',
  standalone: true,
  imports: [HeroFormComponent],
  templateUrl: './update-hero.component.html',
  styleUrl: './update-hero.component.css'
})
export class UpdateHeroComponent {

  public hero = input<Hero | undefined>();

}
