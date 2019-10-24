package id.tech.cakra.investamart.web.rest;

import id.tech.cakra.investamart.InvestamartApp;
import id.tech.cakra.investamart.domain.Instrument;
import id.tech.cakra.investamart.repository.InstrumentRepository;
import id.tech.cakra.investamart.service.InstrumentService;
import id.tech.cakra.investamart.service.dto.InstrumentDTO;
import id.tech.cakra.investamart.service.mapper.InstrumentMapper;
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
 * Integration tests for the {@link InstrumentResource} REST controller.
 */
@SpringBootTest(classes = InvestamartApp.class)
public class InstrumentResourceIT {

    private static final String DEFAULT_INSTRUMENT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_INSTRUMENT_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_INSTRUMENT_TYPE = "A";
    private static final String UPDATED_INSTRUMENT_TYPE = "B";

    private static final String DEFAULT_INSTRUMENT_SHORT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_INSTRUMENT_SHORT_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_INSTRUMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_INSTRUMENT_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final LocalDate DEFAULT_PRICE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PRICE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_HAIRCUT = 1L;
    private static final Long UPDATED_HAIRCUT = 2L;

    private static final LocalDate DEFAULT_HARICUT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_HARICUT_DATE = LocalDate.now(ZoneId.systemDefault());

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
    private InstrumentRepository instrumentRepository;

    @Autowired
    private InstrumentMapper instrumentMapper;

    @Autowired
    private InstrumentService instrumentService;

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

    private MockMvc restInstrumentMockMvc;

    private Instrument instrument;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InstrumentResource instrumentResource = new InstrumentResource(instrumentService);
        this.restInstrumentMockMvc = MockMvcBuilders.standaloneSetup(instrumentResource)
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
    public static Instrument createEntity(EntityManager em) {
        Instrument instrument = new Instrument()
            .instrumentCode(DEFAULT_INSTRUMENT_CODE)
            .instrumentType(DEFAULT_INSTRUMENT_TYPE)
            .instrumentShortCode(DEFAULT_INSTRUMENT_SHORT_CODE)
            .instrumentName(DEFAULT_INSTRUMENT_NAME)
            .price(DEFAULT_PRICE)
            .priceDate(DEFAULT_PRICE_DATE)
            .haircut(DEFAULT_HAIRCUT)
            .haricutDate(DEFAULT_HARICUT_DATE)
            .createSystemDate(DEFAULT_CREATE_SYSTEM_DATE)
            .createDate(DEFAULT_CREATE_DATE)
            .createUserId(DEFAULT_CREATE_USER_ID)
            .lastModificationSystemDate(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(DEFAULT_LAST_MODIFICATION_DATE)
            .lastModificationUserId(DEFAULT_LAST_MODIFICATION_USER_ID);
        return instrument;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Instrument createUpdatedEntity(EntityManager em) {
        Instrument instrument = new Instrument()
            .instrumentCode(UPDATED_INSTRUMENT_CODE)
            .instrumentType(UPDATED_INSTRUMENT_TYPE)
            .instrumentShortCode(UPDATED_INSTRUMENT_SHORT_CODE)
            .instrumentName(UPDATED_INSTRUMENT_NAME)
            .price(UPDATED_PRICE)
            .priceDate(UPDATED_PRICE_DATE)
            .haircut(UPDATED_HAIRCUT)
            .haricutDate(UPDATED_HARICUT_DATE)
            .createSystemDate(UPDATED_CREATE_SYSTEM_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .createUserId(UPDATED_CREATE_USER_ID)
            .lastModificationSystemDate(UPDATED_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(UPDATED_LAST_MODIFICATION_DATE)
            .lastModificationUserId(UPDATED_LAST_MODIFICATION_USER_ID);
        return instrument;
    }

    @BeforeEach
    public void initTest() {
        instrument = createEntity(em);
    }

    @Test
    @Transactional
    public void createInstrument() throws Exception {
        int databaseSizeBeforeCreate = instrumentRepository.findAll().size();

        // Create the Instrument
        InstrumentDTO instrumentDTO = instrumentMapper.toDto(instrument);
        restInstrumentMockMvc.perform(post("/api/instruments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instrumentDTO)))
            .andExpect(status().isCreated());

        // Validate the Instrument in the database
        List<Instrument> instrumentList = instrumentRepository.findAll();
        assertThat(instrumentList).hasSize(databaseSizeBeforeCreate + 1);
        Instrument testInstrument = instrumentList.get(instrumentList.size() - 1);
        assertThat(testInstrument.getInstrumentCode()).isEqualTo(DEFAULT_INSTRUMENT_CODE);
        assertThat(testInstrument.getInstrumentType()).isEqualTo(DEFAULT_INSTRUMENT_TYPE);
        assertThat(testInstrument.getInstrumentShortCode()).isEqualTo(DEFAULT_INSTRUMENT_SHORT_CODE);
        assertThat(testInstrument.getInstrumentName()).isEqualTo(DEFAULT_INSTRUMENT_NAME);
        assertThat(testInstrument.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testInstrument.getPriceDate()).isEqualTo(DEFAULT_PRICE_DATE);
        assertThat(testInstrument.getHaircut()).isEqualTo(DEFAULT_HAIRCUT);
        assertThat(testInstrument.getHaricutDate()).isEqualTo(DEFAULT_HARICUT_DATE);
        assertThat(testInstrument.getCreateSystemDate()).isEqualTo(DEFAULT_CREATE_SYSTEM_DATE);
        assertThat(testInstrument.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testInstrument.getCreateUserId()).isEqualTo(DEFAULT_CREATE_USER_ID);
        assertThat(testInstrument.getLastModificationSystemDate()).isEqualTo(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE);
        assertThat(testInstrument.getLastModificationDate()).isEqualTo(DEFAULT_LAST_MODIFICATION_DATE);
        assertThat(testInstrument.getLastModificationUserId()).isEqualTo(DEFAULT_LAST_MODIFICATION_USER_ID);
    }

    @Test
    @Transactional
    public void createInstrumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = instrumentRepository.findAll().size();

        // Create the Instrument with an existing ID
        instrument.setId(1L);
        InstrumentDTO instrumentDTO = instrumentMapper.toDto(instrument);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstrumentMockMvc.perform(post("/api/instruments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instrumentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Instrument in the database
        List<Instrument> instrumentList = instrumentRepository.findAll();
        assertThat(instrumentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInstruments() throws Exception {
        // Initialize the database
        instrumentRepository.saveAndFlush(instrument);

        // Get all the instrumentList
        restInstrumentMockMvc.perform(get("/api/instruments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instrument.getId().intValue())))
            .andExpect(jsonPath("$.[*].instrumentCode").value(hasItem(DEFAULT_INSTRUMENT_CODE)))
            .andExpect(jsonPath("$.[*].instrumentType").value(hasItem(DEFAULT_INSTRUMENT_TYPE)))
            .andExpect(jsonPath("$.[*].instrumentShortCode").value(hasItem(DEFAULT_INSTRUMENT_SHORT_CODE)))
            .andExpect(jsonPath("$.[*].instrumentName").value(hasItem(DEFAULT_INSTRUMENT_NAME)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].priceDate").value(hasItem(DEFAULT_PRICE_DATE.toString())))
            .andExpect(jsonPath("$.[*].haircut").value(hasItem(DEFAULT_HAIRCUT.intValue())))
            .andExpect(jsonPath("$.[*].haricutDate").value(hasItem(DEFAULT_HARICUT_DATE.toString())))
            .andExpect(jsonPath("$.[*].createSystemDate").value(hasItem(DEFAULT_CREATE_SYSTEM_DATE.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(sameInstant(DEFAULT_CREATE_DATE))))
            .andExpect(jsonPath("$.[*].createUserId").value(hasItem(DEFAULT_CREATE_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].lastModificationSystemDate").value(hasItem(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModificationDate").value(hasItem(sameInstant(DEFAULT_LAST_MODIFICATION_DATE))))
            .andExpect(jsonPath("$.[*].lastModificationUserId").value(hasItem(DEFAULT_LAST_MODIFICATION_USER_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getInstrument() throws Exception {
        // Initialize the database
        instrumentRepository.saveAndFlush(instrument);

        // Get the instrument
        restInstrumentMockMvc.perform(get("/api/instruments/{id}", instrument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(instrument.getId().intValue()))
            .andExpect(jsonPath("$.instrumentCode").value(DEFAULT_INSTRUMENT_CODE))
            .andExpect(jsonPath("$.instrumentType").value(DEFAULT_INSTRUMENT_TYPE))
            .andExpect(jsonPath("$.instrumentShortCode").value(DEFAULT_INSTRUMENT_SHORT_CODE))
            .andExpect(jsonPath("$.instrumentName").value(DEFAULT_INSTRUMENT_NAME))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.priceDate").value(DEFAULT_PRICE_DATE.toString()))
            .andExpect(jsonPath("$.haircut").value(DEFAULT_HAIRCUT.intValue()))
            .andExpect(jsonPath("$.haricutDate").value(DEFAULT_HARICUT_DATE.toString()))
            .andExpect(jsonPath("$.createSystemDate").value(DEFAULT_CREATE_SYSTEM_DATE.toString()))
            .andExpect(jsonPath("$.createDate").value(sameInstant(DEFAULT_CREATE_DATE)))
            .andExpect(jsonPath("$.createUserId").value(DEFAULT_CREATE_USER_ID.intValue()))
            .andExpect(jsonPath("$.lastModificationSystemDate").value(DEFAULT_LAST_MODIFICATION_SYSTEM_DATE.toString()))
            .andExpect(jsonPath("$.lastModificationDate").value(sameInstant(DEFAULT_LAST_MODIFICATION_DATE)))
            .andExpect(jsonPath("$.lastModificationUserId").value(DEFAULT_LAST_MODIFICATION_USER_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingInstrument() throws Exception {
        // Get the instrument
        restInstrumentMockMvc.perform(get("/api/instruments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInstrument() throws Exception {
        // Initialize the database
        instrumentRepository.saveAndFlush(instrument);

        int databaseSizeBeforeUpdate = instrumentRepository.findAll().size();

        // Update the instrument
        Instrument updatedInstrument = instrumentRepository.findById(instrument.getId()).get();
        // Disconnect from session so that the updates on updatedInstrument are not directly saved in db
        em.detach(updatedInstrument);
        updatedInstrument
            .instrumentCode(UPDATED_INSTRUMENT_CODE)
            .instrumentType(UPDATED_INSTRUMENT_TYPE)
            .instrumentShortCode(UPDATED_INSTRUMENT_SHORT_CODE)
            .instrumentName(UPDATED_INSTRUMENT_NAME)
            .price(UPDATED_PRICE)
            .priceDate(UPDATED_PRICE_DATE)
            .haircut(UPDATED_HAIRCUT)
            .haricutDate(UPDATED_HARICUT_DATE)
            .createSystemDate(UPDATED_CREATE_SYSTEM_DATE)
            .createDate(UPDATED_CREATE_DATE)
            .createUserId(UPDATED_CREATE_USER_ID)
            .lastModificationSystemDate(UPDATED_LAST_MODIFICATION_SYSTEM_DATE)
            .lastModificationDate(UPDATED_LAST_MODIFICATION_DATE)
            .lastModificationUserId(UPDATED_LAST_MODIFICATION_USER_ID);
        InstrumentDTO instrumentDTO = instrumentMapper.toDto(updatedInstrument);

        restInstrumentMockMvc.perform(put("/api/instruments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instrumentDTO)))
            .andExpect(status().isOk());

        // Validate the Instrument in the database
        List<Instrument> instrumentList = instrumentRepository.findAll();
        assertThat(instrumentList).hasSize(databaseSizeBeforeUpdate);
        Instrument testInstrument = instrumentList.get(instrumentList.size() - 1);
        assertThat(testInstrument.getInstrumentCode()).isEqualTo(UPDATED_INSTRUMENT_CODE);
        assertThat(testInstrument.getInstrumentType()).isEqualTo(UPDATED_INSTRUMENT_TYPE);
        assertThat(testInstrument.getInstrumentShortCode()).isEqualTo(UPDATED_INSTRUMENT_SHORT_CODE);
        assertThat(testInstrument.getInstrumentName()).isEqualTo(UPDATED_INSTRUMENT_NAME);
        assertThat(testInstrument.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testInstrument.getPriceDate()).isEqualTo(UPDATED_PRICE_DATE);
        assertThat(testInstrument.getHaircut()).isEqualTo(UPDATED_HAIRCUT);
        assertThat(testInstrument.getHaricutDate()).isEqualTo(UPDATED_HARICUT_DATE);
        assertThat(testInstrument.getCreateSystemDate()).isEqualTo(UPDATED_CREATE_SYSTEM_DATE);
        assertThat(testInstrument.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testInstrument.getCreateUserId()).isEqualTo(UPDATED_CREATE_USER_ID);
        assertThat(testInstrument.getLastModificationSystemDate()).isEqualTo(UPDATED_LAST_MODIFICATION_SYSTEM_DATE);
        assertThat(testInstrument.getLastModificationDate()).isEqualTo(UPDATED_LAST_MODIFICATION_DATE);
        assertThat(testInstrument.getLastModificationUserId()).isEqualTo(UPDATED_LAST_MODIFICATION_USER_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingInstrument() throws Exception {
        int databaseSizeBeforeUpdate = instrumentRepository.findAll().size();

        // Create the Instrument
        InstrumentDTO instrumentDTO = instrumentMapper.toDto(instrument);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstrumentMockMvc.perform(put("/api/instruments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instrumentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Instrument in the database
        List<Instrument> instrumentList = instrumentRepository.findAll();
        assertThat(instrumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInstrument() throws Exception {
        // Initialize the database
        instrumentRepository.saveAndFlush(instrument);

        int databaseSizeBeforeDelete = instrumentRepository.findAll().size();

        // Delete the instrument
        restInstrumentMockMvc.perform(delete("/api/instruments/{id}", instrument.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Instrument> instrumentList = instrumentRepository.findAll();
        assertThat(instrumentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Instrument.class);
        Instrument instrument1 = new Instrument();
        instrument1.setId(1L);
        Instrument instrument2 = new Instrument();
        instrument2.setId(instrument1.getId());
        assertThat(instrument1).isEqualTo(instrument2);
        instrument2.setId(2L);
        assertThat(instrument1).isNotEqualTo(instrument2);
        instrument1.setId(null);
        assertThat(instrument1).isNotEqualTo(instrument2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InstrumentDTO.class);
        InstrumentDTO instrumentDTO1 = new InstrumentDTO();
        instrumentDTO1.setId(1L);
        InstrumentDTO instrumentDTO2 = new InstrumentDTO();
        assertThat(instrumentDTO1).isNotEqualTo(instrumentDTO2);
        instrumentDTO2.setId(instrumentDTO1.getId());
        assertThat(instrumentDTO1).isEqualTo(instrumentDTO2);
        instrumentDTO2.setId(2L);
        assertThat(instrumentDTO1).isNotEqualTo(instrumentDTO2);
        instrumentDTO1.setId(null);
        assertThat(instrumentDTO1).isNotEqualTo(instrumentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(instrumentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(instrumentMapper.fromId(null)).isNull();
    }
}
