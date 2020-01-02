package com.vankas.multishop.web.rest;

import com.vankas.multishop.service.ModoEnvioService;
import com.vankas.multishop.web.rest.errors.BadRequestAlertException;
import com.vankas.multishop.service.dto.ModoEnvioDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.vankas.multishop.domain.ModoEnvio}.
 */
@RestController
@RequestMapping("/api")
public class ModoEnvioResource {

    private final Logger log = LoggerFactory.getLogger(ModoEnvioResource.class);

    private static final String ENTITY_NAME = "modoEnvio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ModoEnvioService modoEnvioService;

    public ModoEnvioResource(ModoEnvioService modoEnvioService) {
        this.modoEnvioService = modoEnvioService;
    }

    /**
     * {@code POST  /modo-envios} : Create a new modoEnvio.
     *
     * @param modoEnvioDTO the modoEnvioDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new modoEnvioDTO, or with status {@code 400 (Bad Request)} if the modoEnvio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/modo-envios")
    public ResponseEntity<ModoEnvioDTO> createModoEnvio(@Valid @RequestBody ModoEnvioDTO modoEnvioDTO) throws URISyntaxException {
        log.debug("REST request to save ModoEnvio : {}", modoEnvioDTO);
        if (modoEnvioDTO.getId() != null) {
            throw new BadRequestAlertException("A new modoEnvio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ModoEnvioDTO result = modoEnvioService.save(modoEnvioDTO);
        return ResponseEntity.created(new URI("/api/modo-envios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /modo-envios} : Updates an existing modoEnvio.
     *
     * @param modoEnvioDTO the modoEnvioDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated modoEnvioDTO,
     * or with status {@code 400 (Bad Request)} if the modoEnvioDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the modoEnvioDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/modo-envios")
    public ResponseEntity<ModoEnvioDTO> updateModoEnvio(@Valid @RequestBody ModoEnvioDTO modoEnvioDTO) throws URISyntaxException {
        log.debug("REST request to update ModoEnvio : {}", modoEnvioDTO);
        if (modoEnvioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ModoEnvioDTO result = modoEnvioService.save(modoEnvioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, modoEnvioDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /modo-envios} : get all the modoEnvios.
     *

     * @param pageable the pagination information.

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of modoEnvios in body.
     */
    @GetMapping("/modo-envios")
    public ResponseEntity<List<ModoEnvioDTO>> getAllModoEnvios(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("pedido-is-null".equals(filter)) {
            log.debug("REST request to get all ModoEnvios where pedido is null");
            return new ResponseEntity<>(modoEnvioService.findAllWherePedidoIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of ModoEnvios");
        Page<ModoEnvioDTO> page = modoEnvioService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /modo-envios/:id} : get the "id" modoEnvio.
     *
     * @param id the id of the modoEnvioDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the modoEnvioDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/modo-envios/{id}")
    public ResponseEntity<ModoEnvioDTO> getModoEnvio(@PathVariable Long id) {
        log.debug("REST request to get ModoEnvio : {}", id);
        Optional<ModoEnvioDTO> modoEnvioDTO = modoEnvioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(modoEnvioDTO);
    }

    /**
     * {@code DELETE  /modo-envios/:id} : delete the "id" modoEnvio.
     *
     * @param id the id of the modoEnvioDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/modo-envios/{id}")
    public ResponseEntity<Void> deleteModoEnvio(@PathVariable Long id) {
        log.debug("REST request to delete ModoEnvio : {}", id);
        modoEnvioService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
