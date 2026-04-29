package dev.java10x.SmartFridge.service;

import dev.java10x.SmartFridge.model.FoodItem;
import dev.java10x.SmartFridge.model.dto.GeminiResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GeminiService {

    private final WebClient webClient;

    public GeminiService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<String> generateRecipe(List<FoodItem> foodItems) {
        String ingredients = foodItems.stream()
                .map(i -> String.format("%s - Quantity: %d, expirationDate: %s",
                i.getName(),
                i.getQuantity(),
                i.getExpiration()))
                .collect(Collectors.joining("\n"));

        Map<String, Object> requestBody = getStringObjectMap(ingredients);

        return webClient.post()
                .bodyValue(requestBody)
                .retrieve()
                .onStatus(HttpStatusCode::isError, response ->
                        response.bodyToMono(String.class)
                                .flatMap(body -> {
                                    System.out.println("Gemini error: " + body);
                                    return Mono.error(new RuntimeException("Gemini error: " + body));
                                })
                )
                .bodyToMono(GeminiResponse.class)
                .map(r -> r.candidates().getFirst().content().parts().getFirst().text());
    }

    private static @NonNull Map<String, Object> getStringObjectMap(String ingredients) {
        String prompt = """
    You are a professional chef. Create a detailed recipe using ONLY the following ingredients:
    %s
    
    Respond with:
    - Recipe name
    - Prep and cook time
    - Step-by-step instructions
    - Any important cooking tips
    """.formatted(ingredients);

        // Create body
        return Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );
    }

}

/*
    curl  \
            -H "x-goog-api-key: $GEMINI_API_KEY" \
            -H 'Content-Type: application/json' \
            -X POST \
            -d '{
            "contents": [
            {
            "parts": [
            {
            "text": "Explain how AI works in a few words"
            }
            ]
            }
            ]
            }'
        */



