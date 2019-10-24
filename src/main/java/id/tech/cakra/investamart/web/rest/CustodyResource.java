package id.tech.cakra.investamart.web.rest;

import id.tech.cakra.investamart.service.CustodyService;
import id.tech.cakra.investamart.web.rest.errors.BadRequestAlertException;
import id.tech.cakra.investamart.service.dto.CustodyDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link id.tech.cakra.investamart.domain.Custody}.
 */
@RestController
@RequestMapping("/api")
public class CustodyResource {

    private final Logger log = LoggerFactory.getLogger(CustodyResource.class);

    private static final String ENTITY_NAME = "custody";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustodyService custodyService;

    public CustodyResource(CustodyService custodyService) {
        this.custodyService = custodyService;
    }

    /**
     * {@code POST  /custodies} : Create a new custody.
     *
     * @param custodyDTO the custodyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new custodyDTO, or with status {@code 400 (Bad Request)} if the custody has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/custodies")
    public ResponseEntity<CustodyDTO> createCustody(@Valid @RequestBody CustodyDTO custodyDTO) throws URISyntaxException {
        log.debug("REST request to save Custody : {}", custodyDTO);
        if (custodyDTO.getId() != null) {
            throw new BadRequestAlertException("A new custody cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustodyDTO result = custodyService.save(custodyDTO);
        return ResponseEntity.created(new URI("/api/custodies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /custodies} : Updates an existing custody.
     *
     * @param custodyDTO the custodyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated custodyDTO,
     * or with status {@code 400 (Bad Request)} if the custodyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the custodyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/custodies")
    public ResponseEntity<CustodyDTO> updateCustody(@Valid @RequestBody CustodyDTO custodyDTO) throws URISyntaxException {
        log.debug("REST request to update Custody : {}", custodyDTO);
        if (custodyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustodyDTO result = custodyService.save(custodyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, custodyDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /custodies} : get all the custodies.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of custodies in body.
     */
    @GetMapping("/custodies")
    public List<CustodyDTO> getAllCustodies() {
        log.debug("REST request to get all Custodies");
        return custodyService.findAll();
    }

    /**
     * {@code GET  /custodies/:id} : get the "id" custody.
     *
     * @param id the id of the custodyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the custodyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/custodies/{id}")
    public ResponseEntity<CustodyDTO> getCustody(@PathVariable Long id) {
        log.debug("REST request to get Custody : {}", id);
        Optional<CustodyDTO> custodyDTO = custodyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(custodyDTO);
    }

    /**
     * {@code DELETE  /custodies/:id} : delete the "id" custody.
     *
     * @param id the id of the custodyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/custodies/{id}")
    public ResponseEntity<Void> deleteCustody(@PathVariable Long id) {
        log.debug("REST request to delete Custody : {}", id);
        custodyService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
