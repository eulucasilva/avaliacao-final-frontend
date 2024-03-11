import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { IWeight } from '../models/weight';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  apiURL = 'https://porco-tech-a61d6-default-rtdb.firebaseio.com/weight.json';
  private weightListUpdated = new Subject<void>();

  constructor(private http: HttpClient) { }


  getWeightListUpdated(): Observable<void> {
    return this.weightListUpdated.asObservable();
  }

  emitWeightListUpdate(): void {
    this.weightListUpdated.next();
  }


  getAllWeights(): Observable<IWeight[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
      map((response) => {
        const weightsArray: IWeight[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const pig: IWeight = { id: key, ...response[key] };
            weightsArray.push(pig);
          }
        }
        return weightsArray;
      })
    );
  }


  addWeight(weightData: IWeight): Observable<any> {
    return this.http.post<any>(this.apiURL, weightData).pipe(
      tap(() => {
        this.emitWeightListUpdate();
      })
    );
  }

  updateWeight(id: string, weightData: IWeight): Observable<any> {
    return this.http.put<IWeight>(`${this.apiURL.replace('.json', '')}/${id}.json`, weightData).pipe(
      tap(() => {
        this.emitWeightListUpdate();
      })
    );
  }


  deleteWeight(id: string): Observable<any> {
    return this.http.delete<IWeight>(`${this.apiURL.replace('.json', '')}/${id}.json`).pipe(
      tap(() => {
        this.emitWeightListUpdate();
      })
    );
  }

  loadWeight(id: string): Observable<IWeight> {
    return this.http.get<IWeight>(`${this.apiURL}/${id}.json`).pipe(
      tap(() => {
        this.emitWeightListUpdate();
      })
    );
  }

  getWeightHistory(animalTag: string): Observable<IWeight[]> {
    return this.http.get<{ [key: string]: IWeight }>(`${this.apiURL}?orderBy="animalTag"&equalTo="${animalTag}"`).pipe(
      map(response => {
        const weights: IWeight[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            weights.push({ ...response[key], id: key });
          }
        }
        return weights;
      })
    );
  }


}
