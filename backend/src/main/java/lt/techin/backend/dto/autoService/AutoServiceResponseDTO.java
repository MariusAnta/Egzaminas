package lt.techin.backend.dto.autoService;

public record AutoServiceResponseDTO(
        Long id,
        String name,
        String adress,
        String managerName
) {
}
