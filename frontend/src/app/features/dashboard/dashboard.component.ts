import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoodItemService } from '../../core/services/food-item.service';
import { FoodItem, CATEGORIES } from '../../core/models/food-item.model';
import { FoodItemCardComponent } from '../food-items/food-item-card/food-item-card.component';
import { FoodItemFormComponent } from '../food-items/food-item-form/food-item-form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FoodItemCardComponent,
    TranslateModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly svc = inject(FoodItemService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);

  items = signal<FoodItem[]>([]);
  loading = signal(false);
  search = '';
  filterCat = '';
  readonly categories = CATEGORIES;

  get filtered(): FoodItem[] {
    return this.items().filter((i) => {
      const q = !this.search || i.name.toLowerCase().includes(this.search.toLowerCase());
      const c = !this.filterCat || i.category === this.filterCat;
      return q && c;
    });
  }

  get totalItems(): number { return this.items().length; }

  get expiringSoon(): number {
    return this.items().filter((i) => {
      const days = this.daysLeft(i.expiration);
      return days >= 0 && days <= 3;
    }).length;
  }

  get categoryCount(): number {
    return new Set(this.items().map((i) => i.category)).size;
  }

  get lowStock(): number {
    return this.items().filter((i) => i.quantity <= 2).length;
  }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.svc.getAll().subscribe({
      next: (data) => { this.items.set(data); this.loading.set(false); },
      error: () => { this.loading.set(false); this.toast('Failed to load items', true); },
    });
  }

  openAdd(): void {
    this.dialog.open(FoodItemFormComponent, { width: '520px', maxWidth: '95vw', data: { foodItem: null } })
      .afterClosed().subscribe((ok) => { if (ok) { this.load(); this.toast('Item added!'); } });
  }

  openEdit(item: FoodItem): void {
    this.dialog.open(FoodItemFormComponent, { width: '520px', maxWidth: '95vw', data: { foodItem: item } })
      .afterClosed().subscribe((ok) => { if (ok) { this.load(); this.toast('Item updated!'); } });
  }

  remove(item: FoodItem): void {
    if (!item.id) return;
    this.svc.delete(item.id).subscribe({
      next: () => { this.items.update((arr) => arr.filter((i) => i.id !== item.id)); this.toast(`${item.name} removed`, true); },
      error: () => this.toast('Delete failed', true),
    });
  }

  private daysLeft(exp: string): number {
    const [y, m, d] = exp.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return Math.ceil((date.getTime() - today.getTime()) / 86400000);
  }

  private toast(msg: string, err = false): void {
    this.snack.open(msg, 'Close', { duration: 3000, panelClass: err ? 'snack-error' : 'snack-success' });
  }
}
