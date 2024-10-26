import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Hero } from '@interfaces/Hero';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private http = inject(HttpClient);

  getHeroes():Observable<Hero[]>{
     return this.http.get<Hero[]>(`http://localhost:3000/heroes`);
    
  }

  getHeroById(id: string):Observable<Hero>{
    return this.http.get<Hero>(`http://localhost:3000/heroes/${id}`);
  }

  
}
