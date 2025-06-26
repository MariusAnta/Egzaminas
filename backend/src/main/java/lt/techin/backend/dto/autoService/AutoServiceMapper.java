package lt.techin.backend.dto.autoService;

import lt.techin.backend.model.AutoService;

import java.util.List;

public class AutoServiceMapper {

  public static AutoService toAutoService(AutoServiceRequestDTO autoServiceRequestDTO) {
    return new AutoService(
            autoServiceRequestDTO.name(),
            autoServiceRequestDTO.adress(),
            autoServiceRequestDTO.managerName()
    );
  }

  public static AutoServiceResponseDTO toDTO(AutoService autoService) {
    return new AutoServiceResponseDTO(
            autoService.getId(),
            autoService.getName(),
            autoService.getAdress(),
            autoService.getManagerName()
    );

  }

  public static List<AutoServiceResponseDTO> toListDTO(List<AutoService> autoServices) {
    return autoServices.stream()
            .map(autoService -> new AutoServiceResponseDTO(
                    autoService.getId(),
                    autoService.getName(),
                    autoService.getAdress(),
                    autoService.getManagerName()
            ))
            .toList();
  }
}
