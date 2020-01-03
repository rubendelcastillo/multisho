package com.vankas.multishop.web.rest;

import com.vankas.multishop.service.DetallePedidoService;
import com.vankas.multishop.web.rest.errors.BadRequestAlertException;
import com.vankas.multishop.service.dto.DetallePedidoDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.vankas.multishop.domain.DetallePedido}.
 */
@RestController
@RequestMapping("/api")
public class DetallePedidoResource {

    private final Logger log = LoggerFactory.getLogger(DetallePedidoResource.class);

    private static final String ENTITY_NAME = "detallePedido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetallePedidoService detallePedidoService;

    public DetallePedidoResource(DetallePedidoService detallePedidoService) {
        this.detallePedidoService = detallePedidoService;
    }

    /**
     * {@code POST  /detalle-pedidos} : Create a new detallePedido.
     *
     * @param detallePedidoDTO the detallePedidoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detallePedidoDTO, or with status {@code 400 (Bad Request)} if the detallePedido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detalle-pedidos")
    public ResponseEntity<DetallePedidoDTO> createDetallePedido(@RequestBody DetallePedidoDTO detallePedidoDTO) throws URISyntaxException {
        log.debug("REST request to save DetallePedido : {}", detallePedidoDTO);
        if (detallePedidoDTO.getId() != null) {
            throw new BadRequestAlertException("A new detallePedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetallePedidoDTO result = detallePedidoService.save(detallePedidoDTO);
        return ResponseEntity.created(new URI("/api/detalle-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detalle-pedidos} : Updates an existing detallePedido.
     *
     * @param detallePedidoDTO the detallePedidoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detallePedidoDTO,
     * or with status {@code 400 (Bad Request)} if the detallePedidoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detallePedidoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalle-pedidos")
    public ResponseEntity<DetallePedidoDTO> updateDetallePedido(@RequestBody DetallePedidoDTO detallePedidoDTO) throws URISyntaxException {
        log.debug("REST request to update DetallePedido : {}", detallePedidoDTO);
        if (detallePedidoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DetallePedidoDTO result = detallePedidoService.save(detallePedidoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, detallePedidoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /detalle-pedidos} : get all the detallePedidos.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detallePedidos in body.
     */
    @GetMapping("/detalle-pedidos")
    public List<DetallePedidoDTO> getAllDetallePedidos(@RequestParam(required = false) String filter) {
        if ("product-is-null".equals(filter)) {
            log.debug("REST request to get all DetallePedidos where product is null");
            return detallePedidoService.findAllWhereProductIsNull();
        }
        log.debug("REST request to get all DetallePedidos");
        return detallePedidoService.findAll();
    }

    /**
     * {@code GET  /detalle-pedidos/:id} : get the "id" detallePedido.
     *
     * @param id the id of the detallePedidoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detallePedidoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detalle-pedidos/{id}")
    public ResponseEntity<DetallePedidoDTO> getDetallePedido(@PathVariable Long id) {
        log.debug("REST request to get DetallePedido : {}", id);
        Optional<DetallePedidoDTO> detallePedidoDTO = detallePedidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(detallePedidoDTO);
    }

    /**
     * {@code DELETE  /detalle-pedidos/:id} : delete the "id" detallePedido.
     *
     * @param id the id of the detallePedidoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detalle-pedidos/{id}")
    public ResponseEntity<Void> deleteDetallePedido(@PathVariable Long id) {
        log.debug("REST request to delete DetallePedido : {}", id);
        detallePedidoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
