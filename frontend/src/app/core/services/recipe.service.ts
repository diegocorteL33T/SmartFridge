import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly http = inject(HttpClient);

  generateRecipe(): Observable<string> {
    return this.http.get(`${environment.apiUrl}/recipe/generate`, { responseType: 'text' });
  }
}
