package lt.techin.backend.controller;


import jakarta.validation.Valid;
import lt.techin.backend.dto.autoService.AutoServiceMapper;
import lt.techin.backend.dto.autoService.AutoServiceRequestDTO;
import lt.techin.backend.dto.autoService.AutoServiceResponseDTO;
import lt.techin.backend.model.AutoService;
import lt.techin.backend.service.AutoServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@RestController

@RequestMapping("/api")
public class AutoServiceController {

  private final AutoServiceService autoServiceService;

  @Autowired
  public AutoServiceController(AutoServiceService autoServiceService) {
    this.autoServiceService = autoServiceService;
  }

  @GetMapping("/services")
  public ResponseEntity<List<AutoServiceResponseDTO>> getAllServices() {
    List<AutoService> services = autoServiceService.getAllService();
    return ResponseEntity.ok(AutoServiceMapper.toListDTO(services));
  }

  @PostMapping("/services")
  public ResponseEntity<Object> saveAutoService(@Valid @RequestBody AutoServiceRequestDTO autoServiceRequestDTO) {

    AutoService savedAutoService = this.autoServiceService
            .saveAutoService(AutoServiceMapper.toAutoService(autoServiceRequestDTO));

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedAutoService.getId())
                            .toUri())
            .body(AutoServiceMapper.toDTO(savedAutoService));
  }

  @DeleteMapping("/service/{id}")
  public ResponseEntity<Object> deleteService(@PathVariable long id) {
    Optional<AutoService> serviceOptional = this.autoServiceService.findServiceById(id);
    if (serviceOptional.isEmpty()) {
      return ResponseEntity.notFound().build();
    }
    this.autoServiceService.deleteService(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/services/{id}")
  public ResponseEntity<Object> updateService(@PathVariable long id, @RequestBody AutoServiceRequestDTO autoServiceRequestDTO) {

    Optional<AutoService> autoServiceFromDb = this.autoServiceService.findServiceById(id);

    if (autoServiceFromDb.isPresent()) {
      AutoService updatedAutoService = autoServiceFromDb.get();

      updatedAutoService.setName(autoServiceRequestDTO.name());
      updatedAutoService.setAdress(autoServiceRequestDTO.adress());
      updatedAutoService.setManagerName(autoServiceRequestDTO.managerName());

      AutoService autoService = this.autoServiceService.saveAutoService(updatedAutoService);

      return ResponseEntity.ok(AutoServiceMapper.toDTO(autoService));
    }

    AutoService savedAutoService = this.autoServiceService.saveAutoService(AutoServiceMapper.toAutoService(autoServiceRequestDTO));

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedAutoService.getId())
                            .toUri())
            .body(AutoServiceMapper.toDTO(savedAutoService));
  }
}
