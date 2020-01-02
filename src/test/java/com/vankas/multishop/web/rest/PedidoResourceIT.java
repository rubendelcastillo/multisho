package com.vankas.multishop.web.rest;

import com.vankas.multishop.MultishopApp;
import com.vankas.multishop.domain.Pedido;
import com.vankas.multishop.repository.PedidoRepository;
import com.vankas.multishop.service.PedidoService;
import com.vankas.multishop.service.dto.PedidoDTO;
import com.vankas.multishop.service.mapper.PedidoMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.vankas.multishop.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PedidoResource} REST controller.
 */
@SpringBootTest(classes = MultishopApp.class)
public class PedidoResourceIT {

    private static final LocalDate DEFAULT_FECHA_PEDIDO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_PEDIDO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_NOTIFICACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_NOTIFICACION = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_ID_MODO_PAGO = 1;
    private static final Integer UPDATED_ID_MODO_PAGO = 2;

    private static final Double DEFAULT_CARGO_POR_COSTE = 1D;
    private static final Double UPDATED_CARGO_POR_COSTE = 2D;

    private static final Double DEFAULT_GASTOS_ENVIO = 1D;
    private static final Double UPDATED_GASTOS_ENVIO = 2D;

    private static final Long DEFAULT_ID_MODO_ENVIO = 1L;
    private static final Long UPDATED_ID_MODO_ENVIO = 2L;

    private static final String DEFAULT_JOB_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_JOB_TITLE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_CONFIRMACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CONFIRMACION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoMapper pedidoMapper;

    @Autowired
    private PedidoService pedidoService;

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

    private MockMvc restPedidoMockMvc;

    private Pedido pedido;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PedidoResource pedidoResource = new PedidoResource(pedidoService);
        this.restPedidoMockMvc = MockMvcBuilders.standaloneSetup(pedidoResource)
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
    public static Pedido createEntity(EntityManager em) {
        Pedido pedido = new Pedido()
            .fechaPedido(DEFAULT_FECHA_PEDIDO)
            .fechaNotificacion(DEFAULT_FECHA_NOTIFICACION)
            .idModoPago(DEFAULT_ID_MODO_PAGO)
            .cargoPorCoste(DEFAULT_CARGO_POR_COSTE)
            .gastosEnvio(DEFAULT_GASTOS_ENVIO)
            .idModoEnvio(DEFAULT_ID_MODO_ENVIO)
            .jobTitle(DEFAULT_JOB_TITLE)
            .fechaConfirmacion(DEFAULT_FECHA_CONFIRMACION);
        return pedido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pedido createUpdatedEntity(EntityManager em) {
        Pedido pedido = new Pedido()
            .fechaPedido(UPDATED_FECHA_PEDIDO)
            .fechaNotificacion(UPDATED_FECHA_NOTIFICACION)
            .idModoPago(UPDATED_ID_MODO_PAGO)
            .cargoPorCoste(UPDATED_CARGO_POR_COSTE)
            .gastosEnvio(UPDATED_GASTOS_ENVIO)
            .idModoEnvio(UPDATED_ID_MODO_ENVIO)
            .jobTitle(UPDATED_JOB_TITLE)
            .fechaConfirmacion(UPDATED_FECHA_CONFIRMACION);
        return pedido;
    }

    @BeforeEach
    public void initTest() {
        pedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createPedido() throws Exception {
        int databaseSizeBeforeCreate = pedidoRepository.findAll().size();

        // Create the Pedido
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);
        restPedidoMockMvc.perform(post("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidoDTO)))
            .andExpect(status().isCreated());

        // Validate the Pedido in the database
        List<Pedido> pedidoList = pedidoRepository.findAll();
        assertThat(pedidoList).hasSize(databaseSizeBeforeCreate + 1);
        Pedido testPedido = pedidoList.get(pedidoList.size() - 1);
        assertThat(testPedido.getFechaPedido()).isEqualTo(DEFAULT_FECHA_PEDIDO);
        assertThat(testPedido.getFechaNotificacion()).isEqualTo(DEFAULT_FECHA_NOTIFICACION);
        assertThat(testPedido.getIdModoPago()).isEqualTo(DEFAULT_ID_MODO_PAGO);
        assertThat(testPedido.getCargoPorCoste()).isEqualTo(DEFAULT_CARGO_POR_COSTE);
        assertThat(testPedido.getGastosEnvio()).isEqualTo(DEFAULT_GASTOS_ENVIO);
        assertThat(testPedido.getIdModoEnvio()).isEqualTo(DEFAULT_ID_MODO_ENVIO);
        assertThat(testPedido.getJobTitle()).isEqualTo(DEFAULT_JOB_TITLE);
        assertThat(testPedido.getFechaConfirmacion()).isEqualTo(DEFAULT_FECHA_CONFIRMACION);
    }

    @Test
    @Transactional
    public void createPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pedidoRepository.findAll().size();

        // Create the Pedido with an existing ID
        pedido.setId(1L);
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPedidoMockMvc.perform(post("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Pedido in the database
        List<Pedido> pedidoList = pedidoRepository.findAll();
        assertThat(pedidoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPedidos() throws Exception {
        // Initialize the database
        pedidoRepository.saveAndFlush(pedido);

        // Get all the pedidoList
        restPedidoMockMvc.perform(get("/api/pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaPedido").value(hasItem(DEFAULT_FECHA_PEDIDO.toString())))
            .andExpect(jsonPath("$.[*].fechaNotificacion").value(hasItem(DEFAULT_FECHA_NOTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].idModoPago").value(hasItem(DEFAULT_ID_MODO_PAGO)))
            .andExpect(jsonPath("$.[*].cargoPorCoste").value(hasItem(DEFAULT_CARGO_POR_COSTE.doubleValue())))
            .andExpect(jsonPath("$.[*].gastosEnvio").value(hasItem(DEFAULT_GASTOS_ENVIO.doubleValue())))
            .andExpect(jsonPath("$.[*].idModoEnvio").value(hasItem(DEFAULT_ID_MODO_ENVIO.intValue())))
            .andExpect(jsonPath("$.[*].jobTitle").value(hasItem(DEFAULT_JOB_TITLE)))
            .andExpect(jsonPath("$.[*].fechaConfirmacion").value(hasItem(DEFAULT_FECHA_CONFIRMACION.toString())));
    }
    
    @Test
    @Transactional
    public void getPedido() throws Exception {
        // Initialize the database
        pedidoRepository.saveAndFlush(pedido);

        // Get the pedido
        restPedidoMockMvc.perform(get("/api/pedidos/{id}", pedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pedido.getId().intValue()))
            .andExpect(jsonPath("$.fechaPedido").value(DEFAULT_FECHA_PEDIDO.toString()))
            .andExpect(jsonPath("$.fechaNotificacion").value(DEFAULT_FECHA_NOTIFICACION.toString()))
            .andExpect(jsonPath("$.idModoPago").value(DEFAULT_ID_MODO_PAGO))
            .andExpect(jsonPath("$.cargoPorCoste").value(DEFAULT_CARGO_POR_COSTE.doubleValue()))
            .andExpect(jsonPath("$.gastosEnvio").value(DEFAULT_GASTOS_ENVIO.doubleValue()))
            .andExpect(jsonPath("$.idModoEnvio").value(DEFAULT_ID_MODO_ENVIO.intValue()))
            .andExpect(jsonPath("$.jobTitle").value(DEFAULT_JOB_TITLE))
            .andExpect(jsonPath("$.fechaConfirmacion").value(DEFAULT_FECHA_CONFIRMACION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPedido() throws Exception {
        // Get the pedido
        restPedidoMockMvc.perform(get("/api/pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePedido() throws Exception {
        // Initialize the database
        pedidoRepository.saveAndFlush(pedido);

        int databaseSizeBeforeUpdate = pedidoRepository.findAll().size();

        // Update the pedido
        Pedido updatedPedido = pedidoRepository.findById(pedido.getId()).get();
        // Disconnect from session so that the updates on updatedPedido are not directly saved in db
        em.detach(updatedPedido);
        updatedPedido
            .fechaPedido(UPDATED_FECHA_PEDIDO)
            .fechaNotificacion(UPDATED_FECHA_NOTIFICACION)
            .idModoPago(UPDATED_ID_MODO_PAGO)
            .cargoPorCoste(UPDATED_CARGO_POR_COSTE)
            .gastosEnvio(UPDATED_GASTOS_ENVIO)
            .idModoEnvio(UPDATED_ID_MODO_ENVIO)
            .jobTitle(UPDATED_JOB_TITLE)
            .fechaConfirmacion(UPDATED_FECHA_CONFIRMACION);
        PedidoDTO pedidoDTO = pedidoMapper.toDto(updatedPedido);

        restPedidoMockMvc.perform(put("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidoDTO)))
            .andExpect(status().isOk());

        // Validate the Pedido in the database
        List<Pedido> pedidoList = pedidoRepository.findAll();
        assertThat(pedidoList).hasSize(databaseSizeBeforeUpdate);
        Pedido testPedido = pedidoList.get(pedidoList.size() - 1);
        assertThat(testPedido.getFechaPedido()).isEqualTo(UPDATED_FECHA_PEDIDO);
        assertThat(testPedido.getFechaNotificacion()).isEqualTo(UPDATED_FECHA_NOTIFICACION);
        assertThat(testPedido.getIdModoPago()).isEqualTo(UPDATED_ID_MODO_PAGO);
        assertThat(testPedido.getCargoPorCoste()).isEqualTo(UPDATED_CARGO_POR_COSTE);
        assertThat(testPedido.getGastosEnvio()).isEqualTo(UPDATED_GASTOS_ENVIO);
        assertThat(testPedido.getIdModoEnvio()).isEqualTo(UPDATED_ID_MODO_ENVIO);
        assertThat(testPedido.getJobTitle()).isEqualTo(UPDATED_JOB_TITLE);
        assertThat(testPedido.getFechaConfirmacion()).isEqualTo(UPDATED_FECHA_CONFIRMACION);
    }

    @Test
    @Transactional
    public void updateNonExistingPedido() throws Exception {
        int databaseSizeBeforeUpdate = pedidoRepository.findAll().size();

        // Create the Pedido
        PedidoDTO pedidoDTO = pedidoMapper.toDto(pedido);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPedidoMockMvc.perform(put("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedidoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Pedido in the database
        List<Pedido> pedidoList = pedidoRepository.findAll();
        assertThat(pedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePedido() throws Exception {
        // Initialize the database
        pedidoRepository.saveAndFlush(pedido);

        int databaseSizeBeforeDelete = pedidoRepository.findAll().size();

        // Delete the pedido
        restPedidoMockMvc.perform(delete("/api/pedidos/{id}", pedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pedido> pedidoList = pedidoRepository.findAll();
        assertThat(pedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
