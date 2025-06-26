package lt.techin.backend.dto.autoService;

import jakarta.validation.constraints.NotBlank;

public record AutoServiceRequestDTO(
        @NotBlank
        String name,

        @NotBlank
        String adress,

        @NotBlank
        String managerName
) {
}
