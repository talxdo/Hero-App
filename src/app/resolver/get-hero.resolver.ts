import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";

import {HeroService} from "@services/hero.service";
import {Hero} from "@interfaces/hero";


export const getHeroResolver: ResolveFn<Hero | null> = route => inject(HeroService).getHeroById(route.paramMap.get('id') ?? '');
