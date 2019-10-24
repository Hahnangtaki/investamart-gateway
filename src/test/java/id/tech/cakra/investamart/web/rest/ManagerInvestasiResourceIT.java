package id.tech.cakra.investamart.web.rest;

import id.tech.cakra.investamart.InvestamartApp;
import id.tech.cakra.investamart.domain.ManagerInvestasi;
import id.tech.cakra.investamart.repository.ManagerInvestasiRepository;
import id.tech.cakra.investamart.service.ManagerInvestasiService;
import id.tech.cakra.investamart.service.dto.ManagerInvestasiDTO;
import id.tech.cakra.investamart.service.mapper.ManagerInvestasiMapper;
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
 * Integration tests for the {@link ManagerInvestasiResource} REST controller.
 */
@SpringBootTest(classes = InvestamartApp.class)
public class ManagerInvestasiResourceIT {

    private static final String DEFAULT_MI_CODE = "AAAAAAAAAA";
    private static final String UPDATED_MI_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_MI_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MI_NAME = "BBBBBBBBBB";

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
    private ManagerInvestasiRepository managerInvestasiRepository;

    @Autowired
    private ManagerInvestasiMapper managerInvestasiMapper;

    @Autowired
    private ManagerInvestasiService managerInvestasiService;

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

    private MockMvc restManagerInvestasiMockMvc;

    private ManagerInvestasi managerInvestasi;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ManagerInvestasiResource managerInvestasiResource = new ManagerInvestasiResource(managerInvestasiService);
        this.restManagerInvestasiMockMvc = MockMvcBuilders.standaloneSetup(managerInvestasiResource)
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
    public static ManagerInvestasi createEntity(EntityManager em) {
        ManagerInvestasi managerInvestasi = new ManagerInvestasi()
            .miCode(DEFAULT_MI_CODE)
            .miName(DEFAULT_MI_NAME)
            .createSystemDate(DEFAULT_CREATE_SYSTEM_DATE)
            .createDate(DEFAULT_CREATE_DATE)
            .createUserId(DEFAULT_CREATE_USER_ID)
            .lastModificationSystemDate(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(DEFAULT_LAST_MODIFICATION_DATE)
            .lastModificationUserId(DEFAULT_LAST_MODIFICATION_USER_ID);
        return managerInvestasi;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ManagerInvestasi createUpdatedEntity(EntityManager em) {
        ManagerInvestasi managerInvestasi = new ManagerInvestasi()
            .miCode(UPDATED_MI_CODE)
            .miName(UPDATED_MI_NAME)
            .createSystemDate(UPDATED_CREATE_SYSTEM_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .createUserId(UPDATED_CREATE_USER_ID)
            .lastModificationSystemDate(UPDATED_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(UPDATED_LAST_MODIFICATION_DATE)
            .lastModificationUserId(UPDATED_LAST_MODIFICATION_USER_ID);
        return managerInvestasi;
    }

    @BeforeEach
    public void initTest() {
        managerInvestasi = createEntity(em);
    }

    @Test
    @Transactional
    public void createManagerInvestasi() throws Exception {
        int databaseSizeBeforeCreate = managerInvestasiRepository.findAll().size();

        // Create the ManagerInvestasi
        ManagerInvestasiDTO managerInvestasiDTO = managerInvestasiMapper.toDto(managerInvestasi);
        restManagerInvestasiMockMvc.perform(post("/api/manager-investasis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(managerInvestasiDTO)))
            .andExpect(status().isCreated());

        // Validate the ManagerInvestasi in the database
        List<ManagerInvestasi> managerInvestasiList = managerInvestasiRepository.findAll();
        assertThat(managerInvestasiList).hasSize(databaseSizeBeforeCreate + 1);
        ManagerInvestasi testManagerInvestasi = managerInvestasiList.get(managerInvestasiList.size() - 1);
        assertThat(testManagerInvestasi.getMiCode()).isEqualTo(DEFAULT_MI_CODE);
        assertThat(testManagerInvestasi.getMiName()).isEqualTo(DEFAULT_MI_NAME);
        assertThat(testManagerInvestasi.getCreateSystemDate()).isEqualTo(DEFAULT_CREATE_SYSTEM_DATE);
        assertThat(testManagerInvestasi.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testManagerInvestasi.getCreateUserId()).isEqualTo(DEFAULT_CREATE_USER_ID);
        assertThat(testManagerInvestasi.getLastModificationSystemDate()).isEqualTo(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE);
        assertThat(testManagerInvestasi.getLastModificationDate()).isEqualTo(DEFAULT_LAST_MODIFICATION_DATE);
        assertThat(testManagerInvestasi.getLastModificationUserId()).isEqualTo(DEFAULT_LAST_MODIFICATION_USER_ID);
    }

    @Test
    @Transactional
    public void createManagerInvestasiWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = managerInvestasiRepository.findAll().size();

        // Create the ManagerInvestasi with an existing ID
        managerInvestasi.setId(1L);
        ManagerInvestasiDTO managerInvestasiDTO = managerInvestasiMapper.toDto(managerInvestasi);

        // An entity with an existing ID cannot be created, so this API call must fail
        restManagerInvestasiMockMvc.perform(post("/api/manager-investasis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(managerInvestasiDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ManagerInvestasi in the database
        List<ManagerInvestasi> managerInvestasiList = managerInvestasiRepository.findAll();
        assertThat(managerInvestasiList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMiCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = managerInvestasiRepository.findAll().size();
        // set the field null
        managerInvestasi.setMiCode(null);

        // Create the ManagerInvestasi, which fails.
        ManagerInvestasiDTO managerInvestasiDTO = managerInvestasiMapper.toDto(managerInvestasi);

        restManagerInvestasiMockMvc.perform(post("/api/manager-investasis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(managerInvestasiDTO)))
            .andExpect(status().isBadRequest());

        List<ManagerInvestasi> managerInvestasiList = managerInvestasiRepository.findAll();
        assertThat(managerInvestasiList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllManagerInvestasis() throws Exception {
        // Initialize the database
        managerInvestasiRepository.saveAndFlush(managerInvestasi);

        // Get all the managerInvestasiList
        restManagerInvestasiMockMvc.perform(get("/api/manager-investasis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(managerInvestasi.getId().intValue())))
            .andExpect(jsonPath("$.[*].miCode").value(hasItem(DEFAULT_MI_CODE)))
            .andExpect(jsonPath("$.[*].miName").value(hasItem(DEFAULT_MI_NAME)))
            .andExpect(jsonPath("$.[*].createSystemDate").value(hasItem(DEFAULT_CREATE_SYSTEM_DATE.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(sameInstant(DEFAULT_CREATE_DATE))))
            .andExpect(jsonPath("$.[*].createUserId").value(hasItem(DEFAULT_CREATE_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].lastModificationSystemDate").value(hasItem(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModificationDate").value(hasItem(sameInstant(DEFAULT_LAST_MODIFICATION_DATE))))
            .andExpect(jsonPath("$.[*].lastModificationUserId").value(hasItem(DEFAULT_LAST_MODIFICATION_USER_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getManagerInvestasi() throws Exception {
        // Initialize the database
        managerInvestasiRepository.saveAndFlush(managerInvestasi);

        // Get the managerInvestasi
        restManagerInvestasiMockMvc.perform(get("/api/manager-investasis/{id}", managerInvestasi.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(managerInvestasi.getId().intValue()))
            .andExpect(jsonPath("$.miCode").value(DEFAULT_MI_CODE))
            .andExpect(jsonPath("$.miName").value(DEFAULT_MI_NAME))
            .andExpect(jsonPath("$.createSystemDate").value(DEFAULT_CREATE_SYSTEM_DATE.toString()))
            .andExpect(jsonPath("$.createDate").value(sameInstant(DEFAULT_CREATE_DATE)))
            .andExpect(jsonPath("$.createUserId").value(DEFAULT_CREATE_USER_ID.intValue()))
            .andExpect(jsonPath("$.lastModificationSystemDate").value(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE.toString()))
            .andExpect(jsonPath("$.lastModificationDate").value(sameInstant(DEFAULT_LAST_MODIFICATION_DATE)))
            .andExpect(jsonPath("$.lastModificationUserId").value(DEFAULT_LAST_MODIFICATION_USER_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingManagerInvestasi() throws Exception {
        // Get the managerInvestasi
        restManagerInvestasiMockMvc.perform(get("/api/manager-investasis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateManagerInvestasi() throws Exception {
        // Initialize the database
        managerInvestasiRepository.saveAndFlush(managerInvestasi);

        int databaseSizeBeforeUpdate = managerInvestasiRepository.findAll().size();

        // Update the managerInvestasi
        ManagerInvestasi updatedManagerInvestasi = managerInvestasiRepository.findById(managerInvestasi.getId()).get();
        // Disconnect from session so that the updates on updatedManagerInvestasi are not directly saved in db
        em.detach(updatedManagerInvestasi);
        updatedManagerInvestasi
            .miCode(UPDATED_MI_CODE)
            .miName(UPDATED_MI_NAME)
            .createSystemDate(UPDATED_CREATE_SYSTEM_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .createUserId(UPDATED_CREATE_USER_ID)
            .lastModificationSystemDate(UPDATED_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(UPDATED_LAST_MODIFICATION_DATE)
            .lastModificationUserId(UPDATED_LAST_MODIFICATION_USER_ID);
        ManagerInvestasiDTO managerInvestasiDTO = managerInvestasiMapper.toDto(updatedManagerInvestasi);

        restManagerInvestasiMockMvc.perform(put("/api/manager-investasis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(managerInvestasiDTO)))
            .andExpect(status().isOk());

        // Validate the ManagerInvestasi in the database
        List<ManagerInvestasi> managerInvestasiList = managerInvestasiRepository.findAll();
        assertThat(managerInvestasiList).hasSize(databaseSizeBeforeUpdate);
        ManagerInvestasi testManagerInvestasi = managerInvestasiList.get(managerInvestasiList.size() - 1);
        assertThat(testManagerInvestasi.getMiCode()).isEqualTo(UPDATED_MI_CODE);
        assertThat(testManagerInvestasi.getMiName()).isEqualTo(UPDATED_MI_NAME);
        assertThat(testManagerInvestasi.getCreateSystemDate()).isEqualTo(UPDATED_CREATE_SYSTEM_DATE);
        assertThat(testManagerInvestasi.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testManagerInvestasi.getCreateUserId()).isEqualTo(UPDATED_CREATE_USER_ID);
        assertThat(testManagerInvestasi.getLastModificationSystemDate()).isEqualTo(UPDATED_LAST_MODIFICATION_SYSTEM_DATE);
        assertThat(testManagerInvestasi.getLastModificationDate()).isEqualTo(UPDATED_LAST_MODIFICATION_DATE);
        assertThat(testManagerInvestasi.getLastModificationUserId()).isEqualTo(UPDATED_LAST_MODIFICATION_USER_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingManagerInvestasi() throws Exception {
        int databaseSizeBeforeUpdate = managerInvestasiRepository.findAll().size();

        // Create the ManagerInvestasi
        ManagerInvestasiDTO managerInvestasiDTO = managerInvestasiMapper.toDto(managerInvestasi);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restManagerInvestasiMockMvc.perform(put("/api/manager-investasis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(managerInvestasiDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ManagerInvestasi in the database
        List<ManagerInvestasi> managerInvestasiList = managerInvestasiRepository.findAll();
        assertThat(managerInvestasiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteManagerInvestasi() throws Exception {
        // Initialize the database
        managerInvestasiRepository.saveAndFlush(managerInvestasi);

        int databaseSizeBeforeDelete = managerInvestasiRepository.findAll().size();

        // Delete the managerInvestasi
        restManagerInvestasiMockMvc.perform(delete("/api/manager-investasis/{id}", managerInvestasi.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ManagerInvestasi> managerInvestasiList = managerInvestasiRepository.findAll();
        assertThat(managerInvestasiList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ManagerInvestasi.class);
        ManagerInvestasi managerInvestasi1 = new ManagerInvestasi();
        managerInvestasi1.setId(1L);
        ManagerInvestasi managerInvestasi2 = new ManagerInvestasi();
        managerInvestasi2.setId(managerInvestasi1.getId());
        assertThat(managerInvestasi1).isEqualTo(managerInvestasi2);
        managerInvestasi2.setId(2L);
        assertThat(managerInvestasi1).isNotEqualTo(managerInvestasi2);
        managerInvestasi1.setId(null);
        assertThat(managerInvestasi1).isNotEqualTo(managerInvestasi2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ManagerInvestasiDTO.class);
        ManagerInvestasiDTO managerInvestasiDTO1 = new ManagerInvestasiDTO();
        managerInvestasiDTO1.setId(1L);
        ManagerInvestasiDTO managerInvestasiDTO2 = new ManagerInvestasiDTO();
        assertThat(managerInvestasiDTO1).isNotEqualTo(managerInvestasiDTO2);
        managerInvestasiDTO2.setId(managerInvestasiDTO1.getId());
        assertThat(managerInvestasiDTO1).isEqualTo(managerInvestasiDTO2);
        managerInvestasiDTO2.setId(2L);
        assertThat(managerInvestasiDTO1).isNotEqualTo(managerInvestasiDTO2);
        managerInvestasiDTO1.setId(null);
        assertThat(managerInvestasiDTO1).isNotEqualTo(managerInvestasiDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(managerInvestasiMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(managerInvestasiMapper.fromId(null)).isNull();
    }
}
