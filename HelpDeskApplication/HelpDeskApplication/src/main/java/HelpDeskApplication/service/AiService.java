package HelpDeskApplication.service;


import HelpDeskApplication.tools.TicketDatabaseTool;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiService {

    private final ChatClient chatClient;

    private final TicketDatabaseTool ticketDatabaseTool;

    @Value("classpath:/helpdesk-system.st")
    private Resource systemPromptResource;

    public String getResponseFromAssistant(
            String query,
            String conversationId
    ) {

        return chatClient
                .prompt()

                .advisors(advisor ->
                        advisor.param(
                                ChatMemory.CONVERSATION_ID,
                                conversationId
                        )
                )

                .tools(ticketDatabaseTool)

                .system(systemPromptResource)

                .user(query)

                .call()

                .content();
    }
}