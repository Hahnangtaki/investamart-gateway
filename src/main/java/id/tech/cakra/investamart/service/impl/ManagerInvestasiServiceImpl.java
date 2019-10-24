package id.tech.cakra.investamart.service.impl;

import id.tech.cakra.investamart.service.ManagerInvestasiService;
import id.tech.cakra.investamart.domain.ManagerInvestasi;
import id.tech.cakra.investamart.repository.ManagerInvestasiRepository;
import id.tech.cakra.investamart.service.dto.ManagerInvestasiDTO;
import id.tech.cakra.investamart.service.mapper.ManagerInvestasiMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link ManagerInvestasi}.
 */
@Service
@Transactional
public class ManagerInvestasiServiceImpl implements ManagerInvestasiService {

    private final Logger log = LoggerFactory.getLogger(ManagerInvestasiServiceImpl.class);

    private final ManagerInvestasiRepository managerInvestasiRepository;

    private final ManagerInvestasiMapper managerInvestasiMapper;

    public ManagerInvestasiServiceImpl(ManagerInvestasiRepository managerInvestasiRepository, ManagerInvestasiMapper managerInvestasiMapper) {
        this.managerInvestasiRepository = managerInvestasiRepository;
        this.managerInvestasiMapper = managerInvestasiMapper;
    }

    /**
     * Save a managerInvestasi.
     *
     * @param managerInvestasiDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ManagerInvestasiDTO save(ManagerInvestasiDTO managerInvestasiDTO) {
        log.debug("Request to save ManagerInvestasi : {}", managerInvestasiDTO);
        ManagerInvestasi managerInvestasi = managerInvestasiMapper.toEntity(managerInvestasiDTO);
        managerInvestasi = managerInvestasiRepository.save(managerInvestasi);
        return managerInvestasiMapper.toDto(managerInvestasi);
    }

    /**
     * Get all the managerInvestasis.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ManagerInvestasiDTO> findAll() {
        log.debug("Request to get all ManagerInvestasis");
        return managerInvestasiRepository.findAll().stream()
            .map(managerInvestasiMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one managerInvestasi by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ManagerInvestasiDTO> findOne(Long id) {
        log.debug("Request to get ManagerInvestasi : {}", id);
        return managerInvestasiRepository.findById(id)
            .map(managerInvestasiMapper::toDto);
    }

    /**
     * Delete the managerInvestasi by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ManagerInvestasi : {}", id);
        managerInvestasiRepository.deleteById(id);
    }
}
