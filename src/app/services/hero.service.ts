import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Hero} from '@interfaces/hero';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private http = inject(HttpClient);
  private apiUrl = `http://localhost:3000/heroes/`;

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  getHeroById(id: string): Observable<Hero | null> {
    if (!id) return of(null)
    return this.http.get<Hero>(`${this.apiUrl}${id}`);
  }

  postHero(data: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, {...data})
  }

  putHero(data: Hero, id: string): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}${id}`, {...data})
  }

  deleteHero(id: string) {
    return this.http.delete<Hero>(`${this.apiUrl}${id}`)
  }


}
