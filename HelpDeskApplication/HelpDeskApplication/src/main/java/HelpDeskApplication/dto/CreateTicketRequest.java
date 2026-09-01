package HelpDeskApplication.dto;


import HelpDeskApplication.entity.Priority;
import HelpDeskApplication.entity.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTicketRequest {

    private String summary;

    private Priority priority;

    private String description;

    private String category;

    private String username;

    private Status status;
}
