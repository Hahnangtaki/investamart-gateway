package id.tech.cakra.investamart.web.rest;

import id.tech.cakra.investamart.InvestamartApp;
import id.tech.cakra.investamart.domain.Custody;
import id.tech.cakra.investamart.repository.CustodyRepository;
import id.tech.cakra.investamart.service.CustodyService;
import id.tech.cakra.investamart.service.dto.CustodyDTO;
import id.tech.cakra.investamart.service.mapper.CustodyMapper;
import id.tech.cakra.investamart.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static id.tech.cakra.investamart.web.rest.TestUtil.sameInstant;
import static id.tech.cakra.investamart.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CustodyResource} REST controller.
 */
@SpringBootTest(classes = InvestamartApp.class)
public class CustodyResourceIT {

    private static final String DEFAULT_CUSTODY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CUSTODY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CUSTODI_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CUSTODI_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATE_SYSTEM_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATE_SYSTEM_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final ZonedDateTime DEFAULT_CREATE_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATE_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Long DEFAULT_CREATE_USER_ID = 1L;
    private static final Long UPDATED_CREATE_USER_ID = 2L;

    private static final LocalDate DEFAULT_LAST_MODIFICATION_SYSTEM_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_MODIFICATION_SYSTEM_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final ZonedDateTime DEFAULT_LAST_MODIFICATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_MODIFICATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Long DEFAULT_LAST_MODIFICATION_USER_ID = 1L;
    private static final Long UPDATED_LAST_MODIFICATION_USER_ID = 2L;

    @Autowired
    private CustodyRepository custodyRepository;

    @Autowired
    private CustodyMapper custodyMapper;

    @Autowired
    private CustodyService custodyService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCustodyMockMvc;

    private Custody custody;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustodyResource custodyResource = new CustodyResource(custodyService);
        this.restCustodyMockMvc = MockMvcBuilders.standaloneSetup(custodyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Custody createEntity(EntityManager em) {
        Custody custody = new Custody()
            .custodyCode(DEFAULT_CUSTODY_CODE)
            .custodiName(DEFAULT_CUSTODI_NAME)
            .createSystemDate(DEFAULT_CREATE_SYSTEM_DATE)
            .createDate(DEFAULT_CREATE_DATE)
            .createUserId(DEFAULT_CREATE_USER_ID)
            .lastModificationSystemDate(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(DEFAULT_LAST_MODIFICATION_DATE)
            .lastModificationUserId(DEFAULT_LAST_MODIFICATION_USER_ID);
        return custody;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Custody createUpdatedEntity(EntityManager em) {
        Custody custody = new Custody()
            .custodyCode(UPDATED_CUSTODY_CODE)
            .custodiName(UPDATED_CUSTODI_NAME)
            .createSystemDate(UPDATED_CREATE_SYSTEM_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .createUserId(UPDATED_CREATE_USER_ID)
            .lastModificationSystemDate(UPDATED_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(UPDATED_LAST_MODIFICATION_DATE)
            .lastModificationUserId(UPDATED_LAST_MODIFICATION_USER_ID);
        return custody;
    }

    @BeforeEach
    public void initTest() {
        custody = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustody() throws Exception {
        int databaseSizeBeforeCreate = custodyRepository.findAll().size();

        // Create the Custody
        CustodyDTO custodyDTO = custodyMapper.toDto(custody);
        restCustodyMockMvc.perform(post("/api/custodies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(custodyDTO)))
            .andExpect(status().isCreated());

        // Validate the Custody in the database
        List<Custody> custodyList = custodyRepository.findAll();
        assertThat(custodyList).hasSize(databaseSizeBeforeCreate + 1);
        Custody testCustody = custodyList.get(custodyList.size() - 1);
        assertThat(testCustody.getCustodyCode()).isEqualTo(DEFAULT_CUSTODY_CODE);
        assertThat(testCustody.getCustodiName()).isEqualTo(DEFAULT_CUSTODI_NAME);
        assertThat(testCustody.getCreateSystemDate()).isEqualTo(DEFAULT_CREATE_SYSTEM_DATE);
        assertThat(testCustody.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testCustody.getCreateUserId()).isEqualTo(DEFAULT_CREATE_USER_ID);
        assertThat(testCustody.getLastModificationSystemDate()).isEqualTo(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE);
        assertThat(testCustody.getLastModificationDate()).isEqualTo(DEFAULT_LAST_MODIFICATION_DATE);
        assertThat(testCustody.getLastModificationUserId()).isEqualTo(DEFAULT_LAST_MODIFICATION_USER_ID);
    }

    @Test
    @Transactional
    public void createCustodyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = custodyRepository.findAll().size();

        // Create the Custody with an existing ID
        custody.setId(1L);
        CustodyDTO custodyDTO = custodyMapper.toDto(custody);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustodyMockMvc.perform(post("/api/custodies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(custodyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Custody in the database
        List<Custody> custodyList = custodyRepository.findAll();
        assertThat(custodyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCustodyCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = custodyRepository.findAll().size();
        // set the field null
        custody.setCustodyCode(null);

        // Create the Custody, which fails.
        CustodyDTO custodyDTO = custodyMapper.toDto(custody);

        restCustodyMockMvc.perform(post("/api/custodies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(custodyDTO)))
            .andExpect(status().isBadRequest());

        List<Custody> custodyList = custodyRepository.findAll();
        assertThat(custodyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustodies() throws Exception {
        // Initialize the database
        custodyRepository.saveAndFlush(custody);

        // Get all the custodyList
        restCustodyMockMvc.perform(get("/api/custodies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(custody.getId().intValue())))
            .andExpect(jsonPath("$.[*].custodyCode").value(hasItem(DEFAULT_CUSTODY_CODE)))
            .andExpect(jsonPath("$.[*].custodiName").value(hasItem(DEFAULT_CUSTODI_NAME)))
            .andExpect(jsonPath("$.[*].createSystemDate").value(hasItem(DEFAULT_CREATE_SYSTEM_DATE.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(sameInstant(DEFAULT_CREATE_DATE))))
            .andExpect(jsonPath("$.[*].createUserId").value(hasItem(DEFAULT_CREATE_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].lastModificationSystemDate").value(hasItem(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModificationDate").value(hasItem(sameInstant(DEFAULT_LAST_MODIFICATION_DATE))))
            .andExpect(jsonPath("$.[*].lastModificationUserId").value(hasItem(DEFAULT_LAST_MODIFICATION_USER_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getCustody() throws Exception {
        // Initialize the database
        custodyRepository.saveAndFlush(custody);

        // Get the custody
        restCustodyMockMvc.perform(get("/api/custodies/{id}", custody.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(custody.getId().intValue()))
            .andExpect(jsonPath("$.custodyCode").value(DEFAULT_CUSTODY_CODE))
            .andExpect(jsonPath("$.custodiName").value(DEFAULT_CUSTODI_NAME))
            .andExpect(jsonPath("$.createSystemDate").value(DEFAULT_CREATE_SYSTEM_DATE.toString()))
            .andExpect(jsonPath("$.createDate").value(sameInstant(DEFAULT_CREATE_DATE)))
            .andExpect(jsonPath("$.createUserId").value(DEFAULT_CREATE_USER_ID.intValue()))
            .andExpect(jsonPath("$.lastModificationSystemDate").value(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE.toString()))
            .andExpect(jsonPath("$.lastModificationDate").value(sameInstant(DEFAULT_LAST_MODIFICATION_DATE)))
            .andExpect(jsonPath("$.lastModificationUserId").value(DEFAULT_LAST_MODIFICATION_USER_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCustody() throws Exception {
        // Get the custody
        restCustodyMockMvc.perform(get("/api/custodies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustody() throws Exception {
        // Initialize the database
        custodyRepository.saveAndFlush(custody);

        int databaseSizeBeforeUpdate = custodyRepository.findAll().size();

        // Update the custody
        Custody updatedCustody = custodyRepository.findById(custody.getId()).get();
        // Disconnect from session so that the updates on updatedCustody are not directly saved in db
        em.detach(updatedCustody);
        updatedCustody
            .custodyCode(UPDATED_CUSTODY_CODE)
            .custodiName(UPDATED_CUSTODI_NAME)
            .createSystemDate(UPDATED_CREATE_SYSTEM_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .createUserId(UPDATED_CREATE_USER_ID)
            .lastModificationSystemDate(UPDATED_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(UPDATED_LAST_MODIFICATION_DATE)
            .lastModificationUserId(UPDATED_LAST_MODIFICATION_USER_ID);
        CustodyDTO custodyDTO = custodyMapper.toDto(updatedCustody);

        restCustodyMockMvc.perform(put("/api/custodies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(custodyDTO)))
            .andExpect(status().isOk());

        // Validate the Custody in the database
        List<Custody> custodyList = custodyRepository.findAll();
        assertThat(custodyList).hasSize(databaseSizeBeforeUpdate);
        Custody testCustody = custodyList.get(custodyList.size() - 1);
        assertThat(testCustody.getCustodyCode()).isEqualTo(UPDATED_CUSTODY_CODE);
        assertThat(testCustody.getCustodiName()).isEqualTo(UPDATED_CUSTODI_NAME);
        assertThat(testCustody.getCreateSystemDate()).isEqualTo(UPDATED_CREATE_SYSTEM_DATE);
        assertThat(testCustody.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testCustody.getCreateUserId()).isEqualTo(UPDATED_CREATE_USER_ID);
        assertThat(testCustody.getLastModificationSystemDate()).isEqualTo(UPDATED_LAST_MODIFICATION_SYSTEM_DATE);
        assertThat(testCustody.getLastModificationDate()).isEqualTo(UPDATED_LAST_MODIFICATION_DATE);
        assertThat(testCustody.getLastModificationUserId()).isEqualTo(UPDATED_LAST_MODIFICATION_USER_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingCustody() throws Exception {
        int databaseSizeBeforeUpdate = custodyRepository.findAll().size();

        // Create the Custody
        CustodyDTO custodyDTO = custodyMapper.toDto(custody);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustodyMockMvc.perform(put("/api/custodies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(custodyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Custody in the database
        List<Custody> custodyList = custodyRepository.findAll();
        assertThat(custodyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustody() throws Exception {
        // Initialize the database
        custodyRepository.saveAndFlush(custody);

        int databaseSizeBeforeDelete = custodyRepository.findAll().size();

        // Delete the custody
        restCustodyMockMvc.perform(delete("/api/custodies/{id}", custody.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Custody> custodyList = custodyRepository.findAll();
        assertThat(custodyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Custody.class);
        Custody custody1 = new Custody();
        custody1.setId(1L);
        Custody custody2 = new Custody();
        custody2.setId(custody1.getId());
        assertThat(custody1).isEqualTo(custody2);
        custody2.setId(2L);
        assertThat(custody1).isNotEqualTo(custody2);
        custody1.setId(null);
        assertThat(custody1).isNotEqualTo(custody2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustodyDTO.class);
        CustodyDTO custodyDTO1 = new CustodyDTO();
        custodyDTO1.setId(1L);
        CustodyDTO custodyDTO2 = new CustodyDTO();
        assertThat(custodyDTO1).isNotEqualTo(custodyDTO2);
        custodyDTO2.setId(custodyDTO1.getId());
        assertThat(custodyDTO1).isEqualTo(custodyDTO2);
        custodyDTO2.setId(2L);
        assertThat(custodyDTO1).isNotEqualTo(custodyDTO2);
        custodyDTO1.setId(null);
        assertThat(custodyDTO1).isNotEqualTo(custodyDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(custodyMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(custodyMapper.fromId(null)).isNull();
    }
}
