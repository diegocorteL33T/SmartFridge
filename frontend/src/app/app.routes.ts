import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'recipe',
    loadComponent: () =>
      import('./features/recipe/recipe.component').then((m) => m.RecipeComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
