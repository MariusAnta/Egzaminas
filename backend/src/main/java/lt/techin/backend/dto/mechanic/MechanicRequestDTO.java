package lt.techin.backend.dto.mechanic;

public record MechanicRequestDTO(
        String name,
        String surname,
        String specialization,
        String city
) {
}
