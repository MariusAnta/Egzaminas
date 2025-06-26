package lt.techin.backend.dto.mechanic;

public record MechanicResponseDTO(
        Long id,
        String name,
        String surname,
        String specialization,
        String city
) {
}
