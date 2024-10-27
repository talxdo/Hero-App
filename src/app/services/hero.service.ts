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

  postHero(data : Hero):Observable<Hero>{
    return this.http.post<Hero>(`http://localhost:3000/heroes`,
      {
        "nombre": data.nombre,
        "editorial": data.editorial,
        "poderes": data.poderes,
        "identidadSecreta": data.identidadSecreta,
        "debut": data.debut,
        "imagen": data.imagen
      }
    )
  }

  putHero(data: Hero, id: string):Observable<Hero>{
    return this.http.put<Hero>(`http://localhost:3000/heroes/${id}`, {
      "nombre": data.nombre,
        "editorial": data.editorial,
        "poderes": data.poderes,
        "identidadSecreta": data.identidadSecreta,
        "debut": data.debut,
        "imagen": data.imagen
    })
  }

  
}
