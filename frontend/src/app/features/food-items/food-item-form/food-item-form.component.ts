import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FoodItemService } from '../../../core/services/food-item.service';
import { FoodItem, CATEGORIES } from '../../../core/models/food-item.model';

export interface FoodItemFormData {
  foodItem: FoodItem | null;
}

@Component({
  selector: 'app-food-item-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './food-item-form.component.html',
  styleUrl: './food-item-form.component.scss',
})
export class FoodItemFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<FoodItemFormComponent>);
  readonly data = inject<FoodItemFormData>(MAT_DIALOG_DATA);
  private readonly foodItemService = inject(FoodItemService);

  readonly categories = CATEGORIES;
  loading = false;
  readonly isEdit = !!this.data.foodItem;
  readonly minDate = new Date();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    quantity: [1, [Validators.required, Validators.min(1), Validators.max(9999)]],
    category: ['', Validators.required],
    expiration: [null as Date | null, Validators.required],
  });

  ngOnInit(): void {
    const item = this.data.foodItem;
    if (item) {
      const [y, m, d] = item.expiration.split('-').map(Number);
      this.form.patchValue({
        name: item.name,
        quantity: item.quantity,
        category: item.category,
        expiration: new Date(y, m - 1, d),
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const v = this.form.value;
    const exp = v.expiration as Date;
    const payload: FoodItem = {
      name: v.name!,
      quantity: v.quantity!,
      category: v.category!,
      expiration: this.toIsoDate(exp),
    };

    const req$ = this.isEdit
      ? this.foodItemService.update(this.data.foodItem!.id!, payload)
      : this.foodItemService.add(payload);

    req$.subscribe({
      next: () => { this.loading = false; this.dialogRef.close(true); },
      error: () => { this.loading = false; },
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  private toIsoDate(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}
