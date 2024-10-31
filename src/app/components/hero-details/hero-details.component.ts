import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Hero } from '@interfaces/hero';
import { HeroService } from '@services/hero.service';
import { SpinnerService } from '@services/spinner.service';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [RouterLink, CommonModule, SpinnerComponent],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private heroservice = inject(HeroService);
  private location = inject(Location);
  private spinnerservice = inject(SpinnerService);

  cargando = this.spinnerservice.cargando;

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
    this.cargando = true;
    this.heroservice.deleteHero(this.id)
      .subscribe(
        res => this.cargando = false,
        err => {
          this.cargando = false;
          console.error(err);
        }
      )
      this.location.back();
  }

}
