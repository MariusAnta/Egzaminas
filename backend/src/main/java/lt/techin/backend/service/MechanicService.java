package lt.techin.backend.service;

import lt.techin.backend.model.Mechanic;
import lt.techin.backend.repository.MechanicRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MechanicService {

  private final MechanicRepository mechanicRepository;

  public MechanicService(MechanicRepository mechanicRepository) {
    this.mechanicRepository = mechanicRepository;
  }


  public List<Mechanic> getAllMechanics() {
    return this.mechanicRepository.findAll();
  }

  public Optional<Mechanic> findMechanicById(Long id) {
    return mechanicRepository.findById(id);
  }

  public Mechanic saveMechanic(Mechanic mechanic) {
    return mechanicRepository.save(mechanic);
  }

  public void deleteMechanic(Long id) {
    mechanicRepository.deleteById(id);
  }
}
