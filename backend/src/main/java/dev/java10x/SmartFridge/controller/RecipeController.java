package dev.java10x.SmartFridge.controller;

import dev.java10x.SmartFridge.model.FoodItem;
import dev.java10x.SmartFridge.service.FoodItemService;
import dev.java10x.SmartFridge.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;


@RestController
@RequestMapping("/recipe")
public class RecipeController {


    private final FoodItemService foodItemService;
    private final GeminiService geminiService;

    public RecipeController(GeminiService geminiService, FoodItemService foodItemService) {
        this.geminiService = geminiService;
        this.foodItemService = foodItemService;
    }

    @GetMapping("/generate")
    public Mono<ResponseEntity<String>> generateRecipe(
            @RequestParam(defaultValue = "en") String lang) {
        List<FoodItem> foodItems = foodItemService.getFoodItems();
        return geminiService.generateRecipe(foodItems, lang)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.noContent().build());
    }

}
