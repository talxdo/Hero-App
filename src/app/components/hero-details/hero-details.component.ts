import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Hero } from '@interfaces/Hero';
import { HeroService } from '@services/hero.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent implements OnInit{
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private heroservice = inject(HeroService);
  private location = inject(Location);

  public hero = toSignal<Hero>(
    this.route.params
    .pipe(
      switchMap(({id}) => this.heroservice.getHeroById(id))
    )
  )

  public id : string = "";

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  irAtras(){
    this.location.back();
  }

  eliminarHeroe(){
    this.heroservice.deleteHero(this.id)
      .subscribe(res => console.log(res))
    this.router.navigate(["/heroes/"])
  }

}
