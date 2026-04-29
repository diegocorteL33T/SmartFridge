import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FoodItem, CATEGORY_COLORS, CATEGORY_ICONS } from '../../../core/models/food-item.model';

@Component({
  selector: 'app-food-item-card',
  standalone: true,
  imports: [DatePipe, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './food-item-card.component.html',
  styleUrl: './food-item-card.component.scss',
})
export class FoodItemCardComponent {
  @Input({ required: true }) foodItem!: FoodItem;
  @Output() editItem = new EventEmitter<FoodItem>();
  @Output() deleteItem = new EventEmitter<FoodItem>();

  get status(): 'expired' | 'soon' | 'ok' {
    const days = this.daysLeft;
    if (days < 0) return 'expired';
    if (days <= 3) return 'soon';
    return 'ok';
  }

  get daysLeft(): number {
    const [y, m, d] = this.foodItem.expiration.split('-').map(Number);
    const exp = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.ceil((exp.getTime() - today.getTime()) / 86400000);
  }

  get categoryColor(): string {
    return CATEGORY_COLORS[this.foodItem.category] ?? '#546e7a';
  }

  get categoryIcon(): string {
    return CATEGORY_ICONS[this.foodItem.category] ?? 'fastfood';
  }
}
