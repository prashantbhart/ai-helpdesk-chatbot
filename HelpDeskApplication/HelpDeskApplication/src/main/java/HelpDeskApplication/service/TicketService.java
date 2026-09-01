package HelpDeskApplication.service;


import HelpDeskApplication.entity.Status;
import HelpDeskApplication.entity.Ticket;
import HelpDeskApplication.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    public Ticket createTicket(Ticket ticket) {

        System.out.println("Saving ticket into database...");

        Ticket savedTicket =
                ticketRepository.save(ticket);

        System.out.println(
                "Ticket saved successfully with ID: "
                        + savedTicket.getId()
        );

        return savedTicket;
    }

    public Ticket getTicketByUserName(String username) {

        return ticketRepository
                .findByUsername(username)
                .orElse(null);
    }

    public Ticket updateTicket(Ticket ticket) {

        return ticketRepository.save(ticket);
    }

    public Ticket closeTicket(Long ticketId) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found with id: " + ticketId));

        ticket.setStatus(Status.CLOSED);

        return ticketRepository.save(ticket);
    }
}
