package lt.techin.backend.dto.mechanic;

import lt.techin.backend.model.Mechanic;

import java.util.List;

public class MechanicMapper {

  public static Mechanic toMechanic(MechanicRequestDTO mechanicRequestDTO) {
    return new Mechanic(
            mechanicRequestDTO.name(),
            mechanicRequestDTO.surname(),
            mechanicRequestDTO.specialization(),
            mechanicRequestDTO.city()
    );
  }

  public static MechanicResponseDTO toDTO(Mechanic mechanic) {
    return new MechanicResponseDTO(
            mechanic.getId(),
            mechanic.getName(),
            mechanic.getSurname(),
            mechanic.getSpecialization(),
            mechanic.getCity()
    );

  }

  public static List<MechanicResponseDTO> toListDTO(List<Mechanic> mechanics) {
    return mechanics.stream()
            .map(mechanic -> new MechanicResponseDTO(
                    mechanic.getId(),
                    mechanic.getName(),
                    mechanic.getSurname(),
                    mechanic.getSpecialization(),
                    mechanic.getCity()
            ))
            .toList();
  }
}

