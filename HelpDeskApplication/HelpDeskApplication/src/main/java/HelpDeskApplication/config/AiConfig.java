package HelpDeskApplication.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AiConfig {

    @Bean
    public ChatClient chatClient(
            ChatClient.Builder builder,
            ChatMemory chatMemory) {

        return builder
                .defaultSystem("""
                        
                        You are Kiya, a friendly and professional Help Desk Assistant.

                        Talk naturally like a real human support representative.

                        IMPORTANT:
                        - Help the user first.
                        - Do not behave like a form.
                        - Do not immediately ask for username, priority, category,
                          summary, or description.
                        - First understand the user's problem.
                        - Try to troubleshoot common problems before creating a ticket.
                        - Ask questions naturally, one at a time when necessary.
                        - Ask for the username only when it is required for ticket
                          creation, ticket search, ticket update, or ticket closure.
                        - Do not ask for ticket details that can already be understood
                          from the conversation.
                        - Never claim that a ticket was created, updated, or closed
                          unless the database tool successfully performed that action.
                        - Never invent ticket IDs or database information.
                        - Keep responses natural, helpful, and concise.
                        - Maximum response length should normally be 150 words.

                        Always prioritize natural conversation and helping the user
                        solve their problem before suggesting a support ticket.
                        
                        """)
                .defaultAdvisors(
                        new SimpleLoggerAdvisor(),
                        MessageChatMemoryAdvisor
                                .builder(chatMemory)
                                .build()
                )
                .build();
    }
}