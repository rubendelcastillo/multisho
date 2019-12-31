package com.vankas.multishop.web.rest;

import com.vankas.multishop.service.ModoPagoService;
import com.vankas.multishop.web.rest.errors.BadRequestAlertException;
import com.vankas.multishop.service.dto.ModoPagoDTO;

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
 * REST controller for managing {@link com.vankas.multishop.domain.ModoPago}.
 */
@RestController
@RequestMapping("/api")
public class ModoPagoResource {

    private final Logger log = LoggerFactory.getLogger(ModoPagoResource.class);

    private static final String ENTITY_NAME = "modoPago";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ModoPagoService modoPagoService;

    public ModoPagoResource(ModoPagoService modoPagoService) {
        this.modoPagoService = modoPagoService;
    }

    /**
     * {@code POST  /modo-pagos} : Create a new modoPago.
     *
     * @param modoPagoDTO the modoPagoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new modoPagoDTO, or with status {@code 400 (Bad Request)} if the modoPago has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/modo-pagos")
    public ResponseEntity<ModoPagoDTO> createModoPago(@RequestBody ModoPagoDTO modoPagoDTO) throws URISyntaxException {
        log.debug("REST request to save ModoPago : {}", modoPagoDTO);
        if (modoPagoDTO.getId() != null) {
            throw new BadRequestAlertException("A new modoPago cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ModoPagoDTO result = modoPagoService.save(modoPagoDTO);
        return ResponseEntity.created(new URI("/api/modo-pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /modo-pagos} : Updates an existing modoPago.
     *
     * @param modoPagoDTO the modoPagoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated modoPagoDTO,
     * or with status {@code 400 (Bad Request)} if the modoPagoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the modoPagoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/modo-pagos")
    public ResponseEntity<ModoPagoDTO> updateModoPago(@RequestBody ModoPagoDTO modoPagoDTO) throws URISyntaxException {
        log.debug("REST request to update ModoPago : {}", modoPagoDTO);
        if (modoPagoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ModoPagoDTO result = modoPagoService.save(modoPagoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, modoPagoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /modo-pagos} : get all the modoPagos.
     *

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of modoPagos in body.
     */
    @GetMapping("/modo-pagos")
    public List<ModoPagoDTO> getAllModoPagos(@RequestParam(required = false) String filter) {
        if ("pedido-is-null".equals(filter)) {
            log.debug("REST request to get all ModoPagos where pedido is null");
            return modoPagoService.findAllWherePedidoIsNull();
        }
        log.debug("REST request to get all ModoPagos");
        return modoPagoService.findAll();
    }

    /**
     * {@code GET  /modo-pagos/:id} : get the "id" modoPago.
     *
     * @param id the id of the modoPagoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the modoPagoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/modo-pagos/{id}")
    public ResponseEntity<ModoPagoDTO> getModoPago(@PathVariable Long id) {
        log.debug("REST request to get ModoPago : {}", id);
        Optional<ModoPagoDTO> modoPagoDTO = modoPagoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(modoPagoDTO);
    }

    /**
     * {@code DELETE  /modo-pagos/:id} : delete the "id" modoPago.
     *
     * @param id the id of the modoPagoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/modo-pagos/{id}")
    public ResponseEntity<Void> deleteModoPago(@PathVariable Long id) {
        log.debug("REST request to delete ModoPago : {}", id);
        modoPagoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
