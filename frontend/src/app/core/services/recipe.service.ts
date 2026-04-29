import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly http = inject(HttpClient);

  generateRecipe(): Observable<string> {
    return this.http.get('/recipe/generate', { responseType: 'text' });
  }
}
