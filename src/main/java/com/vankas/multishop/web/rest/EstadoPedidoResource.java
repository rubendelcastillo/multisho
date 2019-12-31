package com.vankas.multishop.web.rest;

import com.vankas.multishop.service.EstadoPedidoService;
import com.vankas.multishop.web.rest.errors.BadRequestAlertException;
import com.vankas.multishop.service.dto.EstadoPedidoDTO;

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
 * REST controller for managing {@link com.vankas.multishop.domain.EstadoPedido}.
 */
@RestController
@RequestMapping("/api")
public class EstadoPedidoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoPedidoResource.class);

    private static final String ENTITY_NAME = "estadoPedido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoPedidoService estadoPedidoService;

    public EstadoPedidoResource(EstadoPedidoService estadoPedidoService) {
        this.estadoPedidoService = estadoPedidoService;
    }

    /**
     * {@code POST  /estado-pedidos} : Create a new estadoPedido.
     *
     * @param estadoPedidoDTO the estadoPedidoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoPedidoDTO, or with status {@code 400 (Bad Request)} if the estadoPedido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-pedidos")
    public ResponseEntity<EstadoPedidoDTO> createEstadoPedido(@RequestBody EstadoPedidoDTO estadoPedidoDTO) throws URISyntaxException {
        log.debug("REST request to save EstadoPedido : {}", estadoPedidoDTO);
        if (estadoPedidoDTO.getId() != null) {
            throw new BadRequestAlertException("A new estadoPedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoPedidoDTO result = estadoPedidoService.save(estadoPedidoDTO);
        return ResponseEntity.created(new URI("/api/estado-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-pedidos} : Updates an existing estadoPedido.
     *
     * @param estadoPedidoDTO the estadoPedidoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoPedidoDTO,
     * or with status {@code 400 (Bad Request)} if the estadoPedidoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoPedidoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-pedidos")
    public ResponseEntity<EstadoPedidoDTO> updateEstadoPedido(@RequestBody EstadoPedidoDTO estadoPedidoDTO) throws URISyntaxException {
        log.debug("REST request to update EstadoPedido : {}", estadoPedidoDTO);
        if (estadoPedidoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoPedidoDTO result = estadoPedidoService.save(estadoPedidoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, estadoPedidoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estado-pedidos} : get all the estadoPedidos.
     *

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoPedidos in body.
     */
    @GetMapping("/estado-pedidos")
    public List<EstadoPedidoDTO> getAllEstadoPedidos(@RequestParam(required = false) String filter) {
        if ("pedido-is-null".equals(filter)) {
            log.debug("REST request to get all EstadoPedidos where pedido is null");
            return estadoPedidoService.findAllWherePedidoIsNull();
        }
        log.debug("REST request to get all EstadoPedidos");
        return estadoPedidoService.findAll();
    }

    /**
     * {@code GET  /estado-pedidos/:id} : get the "id" estadoPedido.
     *
     * @param id the id of the estadoPedidoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoPedidoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-pedidos/{id}")
    public ResponseEntity<EstadoPedidoDTO> getEstadoPedido(@PathVariable Long id) {
        log.debug("REST request to get EstadoPedido : {}", id);
        Optional<EstadoPedidoDTO> estadoPedidoDTO = estadoPedidoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoPedidoDTO);
    }

    /**
     * {@code DELETE  /estado-pedidos/:id} : delete the "id" estadoPedido.
     *
     * @param id the id of the estadoPedidoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-pedidos/{id}")
    public ResponseEntity<Void> deleteEstadoPedido(@PathVariable Long id) {
        log.debug("REST request to delete EstadoPedido : {}", id);
        estadoPedidoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
