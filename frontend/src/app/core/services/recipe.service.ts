import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);

  generateRecipe(): Observable<string> {
    const lang = this.translate.currentLang ?? 'en';
    return this.http.get(`${environment.apiUrl}/recipe/generate`, {
      params: { lang },
      responseType: 'text',
    });
  }
}
