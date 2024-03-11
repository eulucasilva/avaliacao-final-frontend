import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of, tap, toArray } from 'rxjs';
import { ISuino } from '../models/pig';

@Injectable({
  providedIn: 'root'
})
export class PigService {

  apiURL = 'https://porco-tech-a61d6-default-rtdb.firebaseio.com/suinos.json';
  private pigListUpdated = new Subject<void>();

  constructor(private http: HttpClient) { }

  getPigListUpdated(): Observable<void> {
    return this.pigListUpdated.asObservable();
  }

  emitPigListUpdate(): void {
    this.pigListUpdated.next();
  }


  addPig(pigData: ISuino): Observable<any> {
    return this.http.post<any>(this.apiURL, pigData).pipe(
      tap(() => {
        this.emitPigListUpdate();
      })
    );
  }


  getAllPigs(): Observable<ISuino[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      map((response) => {
        const pigsArray: ISuino[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const pig: ISuino = { id: key, ...response[key] };
            pigsArray.push(pig);
          }
        }
        return pigsArray;
      })
    );
  }

  getAllPigTags(): Observable<string[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      map((response) => {
        const pigTags: string[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            pigTags.push(response[key].animalTag);
          }
        }
        return pigTags;
      })
    );
  }


  updatePig(id: string, pigData: ISuino): Observable<any> {
    return this.http.put<ISuino>(`${this.apiURL.replace('.json', '')}/${id}.json`, pigData).pipe(
      tap(() => {
        this.emitPigListUpdate();
      })
    );
  }


  deletePig(id: string): Observable<any> {
    return this.http.delete<ISuino>(`${this.apiURL.replace('.json', '')}/${id}.json`).pipe(
      tap(() => {
        this.emitPigListUpdate();
      })
    );
  }

  loadPig(id: string): Observable<ISuino> {
    return this.http.get<ISuino>(`${this.apiURL}/${id}.json`).pipe(
      tap(() => {
        this.emitPigListUpdate();
      })
    );
  }
}


