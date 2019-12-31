package com.vankas.multishop.web.rest;

import com.vankas.multishop.MultishopApp;
import com.vankas.multishop.domain.ModoEnvio;
import com.vankas.multishop.repository.ModoEnvioRepository;
import com.vankas.multishop.service.ModoEnvioService;
import com.vankas.multishop.service.dto.ModoEnvioDTO;
import com.vankas.multishop.service.mapper.ModoEnvioMapper;
import com.vankas.multishop.web.rest.errors.ExceptionTranslator;

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
import java.util.List;

import static com.vankas.multishop.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ModoEnvioResource} REST controller.
 */
@SpringBootTest(classes = MultishopApp.class)
public class ModoEnvioResourceIT {

    private static final String DEFAULT_MODO_ENVIO = "AAAAAAAAAA";
    private static final String UPDATED_MODO_ENVIO = "BBBBBBBBBB";

    @Autowired
    private ModoEnvioRepository modoEnvioRepository;

    @Autowired
    private ModoEnvioMapper modoEnvioMapper;

    @Autowired
    private ModoEnvioService modoEnvioService;

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

    private MockMvc restModoEnvioMockMvc;

    private ModoEnvio modoEnvio;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModoEnvioResource modoEnvioResource = new ModoEnvioResource(modoEnvioService);
        this.restModoEnvioMockMvc = MockMvcBuilders.standaloneSetup(modoEnvioResource)
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
    public static ModoEnvio createEntity(EntityManager em) {
        ModoEnvio modoEnvio = new ModoEnvio()
            .modoEnvio(DEFAULT_MODO_ENVIO);
        return modoEnvio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ModoEnvio createUpdatedEntity(EntityManager em) {
        ModoEnvio modoEnvio = new ModoEnvio()
            .modoEnvio(UPDATED_MODO_ENVIO);
        return modoEnvio;
    }

    @BeforeEach
    public void initTest() {
        modoEnvio = createEntity(em);
    }

    @Test
    @Transactional
    public void createModoEnvio() throws Exception {
        int databaseSizeBeforeCreate = modoEnvioRepository.findAll().size();

        // Create the ModoEnvio
        ModoEnvioDTO modoEnvioDTO = modoEnvioMapper.toDto(modoEnvio);
        restModoEnvioMockMvc.perform(post("/api/modo-envios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoEnvioDTO)))
            .andExpect(status().isCreated());

        // Validate the ModoEnvio in the database
        List<ModoEnvio> modoEnvioList = modoEnvioRepository.findAll();
        assertThat(modoEnvioList).hasSize(databaseSizeBeforeCreate + 1);
        ModoEnvio testModoEnvio = modoEnvioList.get(modoEnvioList.size() - 1);
        assertThat(testModoEnvio.getModoEnvio()).isEqualTo(DEFAULT_MODO_ENVIO);
    }

    @Test
    @Transactional
    public void createModoEnvioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = modoEnvioRepository.findAll().size();

        // Create the ModoEnvio with an existing ID
        modoEnvio.setId(1L);
        ModoEnvioDTO modoEnvioDTO = modoEnvioMapper.toDto(modoEnvio);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModoEnvioMockMvc.perform(post("/api/modo-envios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoEnvioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ModoEnvio in the database
        List<ModoEnvio> modoEnvioList = modoEnvioRepository.findAll();
        assertThat(modoEnvioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkModoEnvioIsRequired() throws Exception {
        int databaseSizeBeforeTest = modoEnvioRepository.findAll().size();
        // set the field null
        modoEnvio.setModoEnvio(null);

        // Create the ModoEnvio, which fails.
        ModoEnvioDTO modoEnvioDTO = modoEnvioMapper.toDto(modoEnvio);

        restModoEnvioMockMvc.perform(post("/api/modo-envios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoEnvioDTO)))
            .andExpect(status().isBadRequest());

        List<ModoEnvio> modoEnvioList = modoEnvioRepository.findAll();
        assertThat(modoEnvioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllModoEnvios() throws Exception {
        // Initialize the database
        modoEnvioRepository.saveAndFlush(modoEnvio);

        // Get all the modoEnvioList
        restModoEnvioMockMvc.perform(get("/api/modo-envios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modoEnvio.getId().intValue())))
            .andExpect(jsonPath("$.[*].modoEnvio").value(hasItem(DEFAULT_MODO_ENVIO)));
    }
    
    @Test
    @Transactional
    public void getModoEnvio() throws Exception {
        // Initialize the database
        modoEnvioRepository.saveAndFlush(modoEnvio);

        // Get the modoEnvio
        restModoEnvioMockMvc.perform(get("/api/modo-envios/{id}", modoEnvio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(modoEnvio.getId().intValue()))
            .andExpect(jsonPath("$.modoEnvio").value(DEFAULT_MODO_ENVIO));
    }

    @Test
    @Transactional
    public void getNonExistingModoEnvio() throws Exception {
        // Get the modoEnvio
        restModoEnvioMockMvc.perform(get("/api/modo-envios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModoEnvio() throws Exception {
        // Initialize the database
        modoEnvioRepository.saveAndFlush(modoEnvio);

        int databaseSizeBeforeUpdate = modoEnvioRepository.findAll().size();

        // Update the modoEnvio
        ModoEnvio updatedModoEnvio = modoEnvioRepository.findById(modoEnvio.getId()).get();
        // Disconnect from session so that the updates on updatedModoEnvio are not directly saved in db
        em.detach(updatedModoEnvio);
        updatedModoEnvio
            .modoEnvio(UPDATED_MODO_ENVIO);
        ModoEnvioDTO modoEnvioDTO = modoEnvioMapper.toDto(updatedModoEnvio);

        restModoEnvioMockMvc.perform(put("/api/modo-envios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoEnvioDTO)))
            .andExpect(status().isOk());

        // Validate the ModoEnvio in the database
        List<ModoEnvio> modoEnvioList = modoEnvioRepository.findAll();
        assertThat(modoEnvioList).hasSize(databaseSizeBeforeUpdate);
        ModoEnvio testModoEnvio = modoEnvioList.get(modoEnvioList.size() - 1);
        assertThat(testModoEnvio.getModoEnvio()).isEqualTo(UPDATED_MODO_ENVIO);
    }

    @Test
    @Transactional
    public void updateNonExistingModoEnvio() throws Exception {
        int databaseSizeBeforeUpdate = modoEnvioRepository.findAll().size();

        // Create the ModoEnvio
        ModoEnvioDTO modoEnvioDTO = modoEnvioMapper.toDto(modoEnvio);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModoEnvioMockMvc.perform(put("/api/modo-envios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoEnvioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ModoEnvio in the database
        List<ModoEnvio> modoEnvioList = modoEnvioRepository.findAll();
        assertThat(modoEnvioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteModoEnvio() throws Exception {
        // Initialize the database
        modoEnvioRepository.saveAndFlush(modoEnvio);

        int databaseSizeBeforeDelete = modoEnvioRepository.findAll().size();

        // Delete the modoEnvio
        restModoEnvioMockMvc.perform(delete("/api/modo-envios/{id}", modoEnvio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ModoEnvio> modoEnvioList = modoEnvioRepository.findAll();
        assertThat(modoEnvioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
