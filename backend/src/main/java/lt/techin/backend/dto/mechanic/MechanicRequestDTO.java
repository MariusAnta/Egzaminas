package lt.techin.backend.dto.mechanic;

import jakarta.validation.constraints.NotBlank;

public record MechanicRequestDTO(
         String name,
         String surname,
        String specialization,
         String city,
) {
}
