import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem } from '../models/food-item.model';

@Injectable({ providedIn: 'root' })
export class FoodItemService {
  private readonly http = inject(HttpClient);
  private readonly api = '/food';

  getAll(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.api}/all`);
  }

  add(item: FoodItem): Observable<FoodItem> {
    return this.http.post<FoodItem>(`${this.api}/add`, item);
  }

  update(id: number, item: Partial<FoodItem>): Observable<FoodItem> {
    return this.http.patch<FoodItem>(`${this.api}/update/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/delete/${id}`);
  }
}
