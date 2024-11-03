import { Component } from '@angular/core';

import { HeroFormComponent } from '@components/hero-form/hero-form.component';

@Component({
  selector: 'app-create-hero',
  standalone: true,
  imports: [HeroFormComponent],
  templateUrl: './create-hero.component.html',
  styleUrl: './create-hero.component.css',
})
export class CreateHeroComponent {}
