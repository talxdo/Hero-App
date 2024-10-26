import { Routes } from '@angular/router';
import { CreateHeroComponent } from '@components/create-hero/create-hero.component';
import { HeroDetailsComponent } from '@components/hero-details/hero-details.component';
import { HeroListComponent } from '@components/hero-list/hero-list.component';
import { HomeComponent } from '@components/home/home.component';


export const routes: Routes = [
    {
        path: 'heroes',
        component: HeroListComponent
    },
    {
        path: 'hero',
        component: HeroDetailsComponent
    },
    {
        path: 'create-hero',
        component: CreateHeroComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '**',
        component: HeroListComponent
    },

];
