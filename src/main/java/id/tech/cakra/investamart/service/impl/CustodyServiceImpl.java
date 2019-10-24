package id.tech.cakra.investamart.service.impl;

import id.tech.cakra.investamart.service.CustodyService;
import id.tech.cakra.investamart.domain.Custody;
import id.tech.cakra.investamart.repository.CustodyRepository;
import id.tech.cakra.investamart.service.dto.CustodyDTO;
import id.tech.cakra.investamart.service.mapper.CustodyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Custody}.
 */
@Service
@Transactional
public class CustodyServiceImpl implements CustodyService {

    private final Logger log = LoggerFactory.getLogger(CustodyServiceImpl.class);

    private final CustodyRepository custodyRepository;

    private final CustodyMapper custodyMapper;

    public CustodyServiceImpl(CustodyRepository custodyRepository, CustodyMapper custodyMapper) {
        this.custodyRepository = custodyRepository;
        this.custodyMapper = custodyMapper;
    }

    /**
     * Save a custody.
     *
     * @param custodyDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CustodyDTO save(CustodyDTO custodyDTO) {
        log.debug("Request to save Custody : {}", custodyDTO);
        Custody custody = custodyMapper.toEntity(custodyDTO);
        custody = custodyRepository.save(custody);
        return custodyMapper.toDto(custody);
    }

    /**
     * Get all the custodies.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustodyDTO> findAll() {
        log.debug("Request to get all Custodies");
        return custodyRepository.findAll().stream()
            .map(custodyMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one custody by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CustodyDTO> findOne(Long id) {
        log.debug("Request to get Custody : {}", id);
        return custodyRepository.findById(id)
            .map(custodyMapper::toDto);
    }

    /**
     * Delete the custody by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Custody : {}", id);
        custodyRepository.deleteById(id);
    }
}
