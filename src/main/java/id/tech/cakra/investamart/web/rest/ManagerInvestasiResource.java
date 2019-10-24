package id.tech.cakra.investamart.web.rest;

import id.tech.cakra.investamart.service.ManagerInvestasiService;
import id.tech.cakra.investamart.web.rest.errors.BadRequestAlertException;
import id.tech.cakra.investamart.service.dto.ManagerInvestasiDTO;

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
 * REST controller for managing {@link id.tech.cakra.investamart.domain.ManagerInvestasi}.
 */
@RestController
@RequestMapping("/api")
public class ManagerInvestasiResource {

    private final Logger log = LoggerFactory.getLogger(ManagerInvestasiResource.class);

    private static final String ENTITY_NAME = "managerInvestasi";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ManagerInvestasiService managerInvestasiService;

    public ManagerInvestasiResource(ManagerInvestasiService managerInvestasiService) {
        this.managerInvestasiService = managerInvestasiService;
    }

    /**
     * {@code POST  /manager-investasis} : Create a new managerInvestasi.
     *
     * @param managerInvestasiDTO the managerInvestasiDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new managerInvestasiDTO, or with status {@code 400 (Bad Request)} if the managerInvestasi has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/manager-investasis")
    public ResponseEntity<ManagerInvestasiDTO> createManagerInvestasi(@Valid @RequestBody ManagerInvestasiDTO managerInvestasiDTO) throws URISyntaxException {
        log.debug("REST request to save ManagerInvestasi : {}", managerInvestasiDTO);
        if (managerInvestasiDTO.getId() != null) {
            throw new BadRequestAlertException("A new managerInvestasi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ManagerInvestasiDTO result = managerInvestasiService.save(managerInvestasiDTO);
        return ResponseEntity.created(new URI("/api/manager-investasis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /manager-investasis} : Updates an existing managerInvestasi.
     *
     * @param managerInvestasiDTO the managerInvestasiDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated managerInvestasiDTO,
     * or with status {@code 400 (Bad Request)} if the managerInvestasiDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the managerInvestasiDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/manager-investasis")
    public ResponseEntity<ManagerInvestasiDTO> updateManagerInvestasi(@Valid @RequestBody ManagerInvestasiDTO managerInvestasiDTO) throws URISyntaxException {
        log.debug("REST request to update ManagerInvestasi : {}", managerInvestasiDTO);
        if (managerInvestasiDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ManagerInvestasiDTO result = managerInvestasiService.save(managerInvestasiDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, managerInvestasiDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /manager-investasis} : get all the managerInvestasis.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of managerInvestasis in body.
     */
    @GetMapping("/manager-investasis")
    public List<ManagerInvestasiDTO> getAllManagerInvestasis() {
        log.debug("REST request to get all ManagerInvestasis");
        return managerInvestasiService.findAll();
    }

    /**
     * {@code GET  /manager-investasis/:id} : get the "id" managerInvestasi.
     *
     * @param id the id of the managerInvestasiDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the managerInvestasiDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/manager-investasis/{id}")
    public ResponseEntity<ManagerInvestasiDTO> getManagerInvestasi(@PathVariable Long id) {
        log.debug("REST request to get ManagerInvestasi : {}", id);
        Optional<ManagerInvestasiDTO> managerInvestasiDTO = managerInvestasiService.findOne(id);
        return ResponseUtil.wrapOrNotFound(managerInvestasiDTO);
    }

    /**
     * {@code DELETE  /manager-investasis/:id} : delete the "id" managerInvestasi.
     *
     * @param id the id of the managerInvestasiDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/manager-investasis/{id}")
    public ResponseEntity<Void> deleteManagerInvestasi(@PathVariable Long id) {
        log.debug("REST request to delete ManagerInvestasi : {}", id);
        managerInvestasiService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
