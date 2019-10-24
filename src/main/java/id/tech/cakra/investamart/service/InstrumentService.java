package id.tech.cakra.investamart.service;

import id.tech.cakra.investamart.service.dto.InstrumentDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link id.tech.cakra.investamart.domain.Instrument}.
 */
public interface InstrumentService {

    /**
     * Save a instrument.
     *
     * @param instrumentDTO the entity to save.
     * @return the persisted entity.
     */
    InstrumentDTO save(InstrumentDTO instrumentDTO);

    /**
     * Get all the instruments.
     *
     * @return the list of entities.
     */
    List<InstrumentDTO> findAll();


    /**
     * Get the "id" instrument.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InstrumentDTO> findOne(Long id);

    /**
     * Delete the "id" instrument.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
