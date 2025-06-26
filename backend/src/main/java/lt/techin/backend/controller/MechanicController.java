package lt.techin.backend.controller;

import jakarta.validation.Valid;
import lt.techin.backend.dto.mechanic.MechanicMapper;
import lt.techin.backend.dto.mechanic.MechanicRequestDTO;
import lt.techin.backend.dto.mechanic.MechanicResponseDTO;
import lt.techin.backend.model.Mechanic;
import lt.techin.backend.service.MechanicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@RestController

@RequestMapping("/api")
public class MechanicController {

  private final MechanicService mechanicService;

  @Autowired
  public MechanicController(MechanicService mechanicService) {
    this.mechanicService = mechanicService;
  }

  @GetMapping("/mechanics")
  public ResponseEntity<List<MechanicResponseDTO>> getAllMechanics() {
    List<Mechanic> mechanics = this.mechanicService.getAllMechanics();
    return ResponseEntity.ok(MechanicMapper.toListDTO(mechanics));
  }

  @PostMapping("/mechanics")
  public ResponseEntity<Object> saveMechanic(@Valid @RequestBody MechanicRequestDTO mechanicRequestDTO) {

    Mechanic savedMechanic = this.mechanicService
            .saveMechanic(MechanicMapper.toMechanic(mechanicRequestDTO));

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedMechanic.getId())
                            .toUri())
            .body(MechanicMapper.toDTO(savedMechanic));
  }

  @DeleteMapping("/mechanics/{id}")
  public ResponseEntity<Object> deleteMechanic(@PathVariable long id) {
    Optional<Mechanic> mechanicOptional = this.mechanicService.findMechanicById(id);
    if (mechanicOptional.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    this.mechanicService.deleteMechanic(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/mechanics/{id}")
  public ResponseEntity<Object> updateMechanic(@PathVariable long id, @RequestBody MechanicRequestDTO mechanicRequestDTO) {

    Optional<Mechanic> mechanicFromDb = this.mechanicService.findMechanicById(id);

    if (mechanicFromDb.isPresent()) {
      Mechanic updatedMechanic = mechanicFromDb.get();

      updatedMechanic.setName(mechanicRequestDTO.name());
      updatedMechanic.setSurname(mechanicRequestDTO.surname());
      updatedMechanic.setSpecialization(mechanicRequestDTO.specialization());
      updatedMechanic.setCity(mechanicRequestDTO.city());

      Mechanic mechanic = this.mechanicService.saveMechanic(updatedMechanic);

      return ResponseEntity.ok(MechanicMapper.toDTO(mechanic));
    }

    Mechanic savedMechanic = this.mechanicService
            .saveMechanic(MechanicMapper.toMechanic(mechanicRequestDTO));

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedMechanic.getId())
                            .toUri())
            .body(MechanicMapper.toDTO(savedMechanic));
  }
}
