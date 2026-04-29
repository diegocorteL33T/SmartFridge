package dev.java10x.SmartFridge.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient (WebClient.Builder builder) {
        //Creates a reusable injectable default webclient
        return builder
                .baseUrl("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key="
                + System.getenv("GEMINI_API_KEY"))
                .defaultHeader("x-goog-api-key", System.getenv("GEMINI_API_KEY"))
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
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

