package com.vankas.multishop.web.rest;

import com.vankas.multishop.MultishopApp;
import com.vankas.multishop.domain.ModoPago;
import com.vankas.multishop.repository.ModoPagoRepository;
import com.vankas.multishop.service.ModoPagoService;
import com.vankas.multishop.service.dto.ModoPagoDTO;
import com.vankas.multishop.service.mapper.ModoPagoMapper;
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
 * Integration tests for the {@link ModoPagoResource} REST controller.
 */
@SpringBootTest(classes = MultishopApp.class)
public class ModoPagoResourceIT {

    private static final Integer DEFAULT_ID_MODO_PAGO = 1;
    private static final Integer UPDATED_ID_MODO_PAGO = 2;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private ModoPagoRepository modoPagoRepository;

    @Autowired
    private ModoPagoMapper modoPagoMapper;

    @Autowired
    private ModoPagoService modoPagoService;

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

    private MockMvc restModoPagoMockMvc;

    private ModoPago modoPago;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ModoPagoResource modoPagoResource = new ModoPagoResource(modoPagoService);
        this.restModoPagoMockMvc = MockMvcBuilders.standaloneSetup(modoPagoResource)
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
    public static ModoPago createEntity(EntityManager em) {
        ModoPago modoPago = new ModoPago()
            .idModoPago(DEFAULT_ID_MODO_PAGO)
            .descripcion(DEFAULT_DESCRIPCION);
        return modoPago;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ModoPago createUpdatedEntity(EntityManager em) {
        ModoPago modoPago = new ModoPago()
            .idModoPago(UPDATED_ID_MODO_PAGO)
            .descripcion(UPDATED_DESCRIPCION);
        return modoPago;
    }

    @BeforeEach
    public void initTest() {
        modoPago = createEntity(em);
    }

    @Test
    @Transactional
    public void createModoPago() throws Exception {
        int databaseSizeBeforeCreate = modoPagoRepository.findAll().size();

        // Create the ModoPago
        ModoPagoDTO modoPagoDTO = modoPagoMapper.toDto(modoPago);
        restModoPagoMockMvc.perform(post("/api/modo-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoPagoDTO)))
            .andExpect(status().isCreated());

        // Validate the ModoPago in the database
        List<ModoPago> modoPagoList = modoPagoRepository.findAll();
        assertThat(modoPagoList).hasSize(databaseSizeBeforeCreate + 1);
        ModoPago testModoPago = modoPagoList.get(modoPagoList.size() - 1);
        assertThat(testModoPago.getIdModoPago()).isEqualTo(DEFAULT_ID_MODO_PAGO);
        assertThat(testModoPago.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createModoPagoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = modoPagoRepository.findAll().size();

        // Create the ModoPago with an existing ID
        modoPago.setId(1L);
        ModoPagoDTO modoPagoDTO = modoPagoMapper.toDto(modoPago);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModoPagoMockMvc.perform(post("/api/modo-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoPagoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ModoPago in the database
        List<ModoPago> modoPagoList = modoPagoRepository.findAll();
        assertThat(modoPagoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllModoPagos() throws Exception {
        // Initialize the database
        modoPagoRepository.saveAndFlush(modoPago);

        // Get all the modoPagoList
        restModoPagoMockMvc.perform(get("/api/modo-pagos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modoPago.getId().intValue())))
            .andExpect(jsonPath("$.[*].idModoPago").value(hasItem(DEFAULT_ID_MODO_PAGO)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getModoPago() throws Exception {
        // Initialize the database
        modoPagoRepository.saveAndFlush(modoPago);

        // Get the modoPago
        restModoPagoMockMvc.perform(get("/api/modo-pagos/{id}", modoPago.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(modoPago.getId().intValue()))
            .andExpect(jsonPath("$.idModoPago").value(DEFAULT_ID_MODO_PAGO))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }

    @Test
    @Transactional
    public void getNonExistingModoPago() throws Exception {
        // Get the modoPago
        restModoPagoMockMvc.perform(get("/api/modo-pagos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModoPago() throws Exception {
        // Initialize the database
        modoPagoRepository.saveAndFlush(modoPago);

        int databaseSizeBeforeUpdate = modoPagoRepository.findAll().size();

        // Update the modoPago
        ModoPago updatedModoPago = modoPagoRepository.findById(modoPago.getId()).get();
        // Disconnect from session so that the updates on updatedModoPago are not directly saved in db
        em.detach(updatedModoPago);
        updatedModoPago
            .idModoPago(UPDATED_ID_MODO_PAGO)
            .descripcion(UPDATED_DESCRIPCION);
        ModoPagoDTO modoPagoDTO = modoPagoMapper.toDto(updatedModoPago);

        restModoPagoMockMvc.perform(put("/api/modo-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoPagoDTO)))
            .andExpect(status().isOk());

        // Validate the ModoPago in the database
        List<ModoPago> modoPagoList = modoPagoRepository.findAll();
        assertThat(modoPagoList).hasSize(databaseSizeBeforeUpdate);
        ModoPago testModoPago = modoPagoList.get(modoPagoList.size() - 1);
        assertThat(testModoPago.getIdModoPago()).isEqualTo(UPDATED_ID_MODO_PAGO);
        assertThat(testModoPago.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingModoPago() throws Exception {
        int databaseSizeBeforeUpdate = modoPagoRepository.findAll().size();

        // Create the ModoPago
        ModoPagoDTO modoPagoDTO = modoPagoMapper.toDto(modoPago);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModoPagoMockMvc.perform(put("/api/modo-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modoPagoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ModoPago in the database
        List<ModoPago> modoPagoList = modoPagoRepository.findAll();
        assertThat(modoPagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteModoPago() throws Exception {
        // Initialize the database
        modoPagoRepository.saveAndFlush(modoPago);

        int databaseSizeBeforeDelete = modoPagoRepository.findAll().size();

        // Delete the modoPago
        restModoPagoMockMvc.perform(delete("/api/modo-pagos/{id}", modoPago.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ModoPago> modoPagoList = modoPagoRepository.findAll();
        assertThat(modoPagoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
