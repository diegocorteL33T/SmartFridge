package dev.java10x.SmartFridge.service;

import dev.java10x.SmartFridge.exception.ResourceNotFoundException;
import dev.java10x.SmartFridge.model.FoodItem;
import dev.java10x.SmartFridge.repository.FoodItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FoodItemService {

    private final FoodItemRepository repository;

    public FoodItemService(FoodItemRepository foodItemRepository) {
        this.repository = foodItemRepository;
    }

    public FoodItem addFoodItem(FoodItem foodItem) {
        return repository.save(foodItem);
    }

    public List<FoodItem> getFoodItems() {
        return repository.findAll();
    }


    public FoodItem getFoodItem(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food Item not Found with id: " + id));
    }


    private <T> void updateIfNotNull(T newValue, java.util.function.Consumer<T> setter) {
        if (newValue != null)
            setter.accept(newValue);
    }


    public FoodItem updateFoodItem(Long id, FoodItem newFoodItem) {
        FoodItem existingItem = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found with id: " + id));

        updateIfNotNull(newFoodItem.getName(), existingItem::setName);
        updateIfNotNull(newFoodItem.getQuantity(), existingItem::setQuantity);
        updateIfNotNull(newFoodItem.getCategory(), existingItem::setCategory);
        updateIfNotNull(newFoodItem.getExpiration(), existingItem::setExpiration);

        return repository.save(existingItem);

     }


    public void deleteFoodItem(Long id) {
        FoodItem item = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found with id: " + id));
        repository.delete(item);
    }


}
