import {Routes} from '@angular/router';
import {CreateHeroComponent} from '@components/create-hero/create-hero.component';
import {HeroDetailsComponent} from '@components/hero-details/hero-details.component';
import {HeroListComponent} from '@components/hero-list/hero-list.component';
import {HomeComponent} from '@components/home/home.component';
import {UpdateHeroComponent} from '@components/update-hero/update-hero.component';
import {getHeroResolver} from "./resolver/get-hero.resolver";


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'heroes',
    component: HeroListComponent
  },
  {
    path: 'hero/:id',
    component: HeroDetailsComponent,
    resolve: { hero: getHeroResolver }
  },
  {
    path: 'create-hero',
    component: CreateHeroComponent
  },
  {
    path: 'update-hero/:id',
    component: UpdateHeroComponent,
    resolve: { hero: getHeroResolver }
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },

];
