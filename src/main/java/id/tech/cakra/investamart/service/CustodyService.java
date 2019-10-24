package id.tech.cakra.investamart.service;

import id.tech.cakra.investamart.service.dto.CustodyDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link id.tech.cakra.investamart.domain.Custody}.
 */
public interface CustodyService {

    /**
     * Save a custody.
     *
     * @param custodyDTO the entity to save.
     * @return the persisted entity.
     */
    CustodyDTO save(CustodyDTO custodyDTO);

    /**
     * Get all the custodies.
     *
     * @return the list of entities.
     */
    List<CustodyDTO> findAll();


    /**
     * Get the "id" custody.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CustodyDTO> findOne(Long id);

    /**
     * Delete the "id" custody.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
