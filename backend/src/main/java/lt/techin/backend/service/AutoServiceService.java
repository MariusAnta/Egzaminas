package lt.techin.backend.service;

import lt.techin.backend.model.AutoService;
import lt.techin.backend.repository.AutoServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutoServiceService {

  private final AutoServiceRepository autoServiceRepository;

  public AutoServiceService(AutoServiceRepository autoServiceRepository) {
    this.autoServiceRepository = autoServiceRepository;
  }

  public List<AutoService> getAllService() {
    return autoServiceRepository.findAll();
  }

  public Optional<AutoService> findServiceById(Long id) {
    return autoServiceRepository.findById(id);
  }

  public AutoService saveAutoService(AutoService autoService) {
    return autoServiceRepository.save(autoService);
  }

  public void deleteService(Long id) {
    autoServiceRepository.deleteById(id);
  }
}
