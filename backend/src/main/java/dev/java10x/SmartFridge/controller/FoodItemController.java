package dev.java10x.SmartFridge.controller;


import dev.java10x.SmartFridge.model.FoodItem;
import dev.java10x.SmartFridge.service.FoodItemService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food")
public class FoodItemController {

    private final FoodItemService service;

    public FoodItemController(FoodItemService foodItemService) {
        this.service = foodItemService;
    }

    @PostMapping("/add")
    public ResponseEntity<FoodItem> addFoodItem(@RequestBody FoodItem foodItem) {
        try {
            FoodItem savedItem = service.addFoodItem(foodItem);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<FoodItem>> getFoodItems() {
        List<FoodItem> foodItems = service.getFoodItems();
        return ResponseEntity.ok(foodItems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItem> getFoodItem(@PathVariable Long id){
        return ResponseEntity.ok(service.getFoodItem(id));
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<FoodItem> updateFoodItem(
            @RequestBody @Valid FoodItem foodItem,
            @PathVariable Long id) {

        return ResponseEntity.ok(service.updateFoodItem(id,foodItem));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<FoodItem> deleteFoodItem(@PathVariable Long id) {
        service.deleteFoodItem(id);
        return ResponseEntity.noContent().build();
    }
}
