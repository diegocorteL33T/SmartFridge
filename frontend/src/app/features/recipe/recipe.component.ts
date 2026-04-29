import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoodItemService } from '../../core/services/food-item.service';
import { RecipeService } from '../../core/services/recipe.service';
import { FoodItem, CATEGORY_COLORS } from '../../core/models/food-item.model';
import { TranslateModule } from '@ngx-translate/core';

type LineType = 'heading' | 'step' | 'bullet' | 'text';
interface RecipeLine { type: LineType; content: string; number?: string; }

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule,
    TranslateModule,
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  private readonly itemSvc = inject(FoodItemService);
  private readonly recipeSvc = inject(RecipeService);
  private readonly snack = inject(MatSnackBar);

  items = signal<FoodItem[]>([]);
  recipe = signal<string>('');
  loadingItems = signal(false);
  generating = signal(false);

  ngOnInit(): void {
    this.loadingItems.set(true);
    this.itemSvc.getAll().subscribe({
      next: (data) => { this.items.set(data); this.loadingItems.set(false); },
      error: () => { this.loadingItems.set(false); this.snack.open('Failed to load items', 'Close', { duration: 3000 }); },
    });
  }

  generate(): void {
    if (!this.items().length) {
      this.snack.open('Add some items to your fridge first!', 'Close', { duration: 3000 });
      return;
    }
    this.generating.set(true);
    this.recipe.set('');
    this.recipeSvc.generateRecipe().subscribe({
      next: (txt) => { this.recipe.set(txt); this.generating.set(false); },
      error: () => { this.generating.set(false); this.snack.open('Recipe generation failed. Check GEMINI_API_KEY on the server.', 'Close', { duration: 5000 }); },
    });
  }

  get lines(): RecipeLine[] {
    return this.recipe()
      .split('\n')
      .filter((l) => l.trim())
      .map((l): RecipeLine => {
        if (/^#{1,3}\s/.test(l) || (l.startsWith('**') && l.endsWith('**'))) {
          return { type: 'heading', content: l.replace(/^#+\s*/, '').replace(/\*\*/g, '') };
        }
        const step = l.match(/^(\d+)\.\s+(.*)/);
        if (step) return { type: 'step', content: step[2], number: step[1] };
        if (/^[-•*]\s/.test(l)) return { type: 'bullet', content: l.replace(/^[-•*]\s+/, '') };
        return { type: 'text', content: l };
      });
  }

  color(cat: string): string {
    return CATEGORY_COLORS[cat] ?? '#546e7a';
  }
}
