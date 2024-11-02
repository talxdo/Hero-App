import {Component, input} from '@angular/core';

import {Hero} from '@interfaces/hero';
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
