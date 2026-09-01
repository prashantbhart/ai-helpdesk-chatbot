package HelpDeskApplication.controller;



import HelpDeskApplication.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    public ResponseEntity<String> chat(

            @RequestParam String query,

            @RequestParam String conversationId
    ) {

        String response =
                aiService.getResponseFromAssistant(
                        query,
                        conversationId
                );

        return ResponseEntity.ok(response);
    }
}