package id.tech.cakra.investamart.service;

import id.tech.cakra.investamart.service.dto.ManagerInvestasiDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link id.tech.cakra.investamart.domain.ManagerInvestasi}.
 */
public interface ManagerInvestasiService {

    /**
     * Save a managerInvestasi.
     *
     * @param managerInvestasiDTO the entity to save.
     * @return the persisted entity.
     */
    ManagerInvestasiDTO save(ManagerInvestasiDTO managerInvestasiDTO);

    /**
     * Get all the managerInvestasis.
     *
     * @return the list of entities.
     */
    List<ManagerInvestasiDTO> findAll();


    /**
     * Get the "id" managerInvestasi.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ManagerInvestasiDTO> findOne(Long id);

    /**
     * Delete the "id" managerInvestasi.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
