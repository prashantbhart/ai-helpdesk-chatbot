package HelpDeskApplication.tools;

import HelpDeskApplication.dto.CreateTicketRequest;
import HelpDeskApplication.entity.Ticket;
import HelpDeskApplication.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TicketDatabaseTool {

    private final TicketService ticketService;

    @Tool(description = """
            Creates and saves a new help desk ticket in the database.
            Always call this tool when the user wants to create a new ticket.
            Never claim that a ticket was created unless this tool completes successfully.
            """)
    public Ticket createTicketTool(

            @ToolParam(description =
                    "New ticket information")
            CreateTicketRequest request
    ) {

        System.out.println(
                "CREATE TICKET TOOL CALLED"
        );

        Ticket ticket = Ticket.builder()
                .summary(request.getSummary())
                .description(request.getDescription())
                .priority(request.getPriority())
                .category(request.getCategory())
                .username(request.getUsername())
                .status(request.getStatus())
                .build();

        return ticketService.createTicket(ticket);
    }

    @Tool(description =
            "Gets the ticket information using username.")
    public Ticket getTicketByUserName(

            @ToolParam(description =
                    "Username of the ticket owner")
            String username
    ) {

        return ticketService
                .getTicketByUserName(username);
    }

    @Tool(description =
            "Updates an existing ticket.")
    public Ticket updateTicket(

            @ToolParam(description =
                    "Updated ticket information")
            Ticket ticket
    ) {

        return ticketService
                .updateTicket(ticket);
    }

    @Tool(description = """
        Close a ticket when the user confirms that their problem has been solved.
        You must use this tool before telling the user that the ticket is closed.
        """)
    public Ticket closeTicket(
            @ToolParam(description = "The database ticket id to close")
            Long ticketId
    ) {
        return ticketService.closeTicket(ticketId);
    }
}