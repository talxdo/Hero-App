import { Routes } from '@angular/router';
import { CreateHeroComponent } from '@components/create-hero/create-hero.component';
import { HeroDetailsComponent } from '@components/hero-details/hero-details.component';
import { HeroListComponent } from '@components/hero-list/hero-list.component';
import { HomeComponent } from '@components/home/home.component';
import { UpdateHeroComponent } from '@components/update-hero/update-hero.component';


export const routes: Routes = [
    {
        path: 'heroes',
        component: HeroListComponent
    },
    {
        path: 'hero/:id',
        component: HeroDetailsComponent
    },
    {
        path: 'create-hero',
        component: CreateHeroComponent
    },
    {
        path: 'update-hero/:id',
        component: UpdateHeroComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '**',
        component: HomeComponent,
        pathMatch: 'full'
    },

];
