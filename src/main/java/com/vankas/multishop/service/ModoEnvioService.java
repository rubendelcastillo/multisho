package com.vankas.multishop.service;

import com.vankas.multishop.service.dto.ModoEnvioDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.vankas.multishop.domain.ModoEnvio}.
 */
public interface ModoEnvioService {

    /**
     * Save a modoEnvio.
     *
     * @param modoEnvioDTO the entity to save.
     * @return the persisted entity.
     */
    ModoEnvioDTO save(ModoEnvioDTO modoEnvioDTO);

    /**
     * Get all the modoEnvios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ModoEnvioDTO> findAll(Pageable pageable);


    /**
     * Get the "id" modoEnvio.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ModoEnvioDTO> findOne(Long id);

    /**
     * Delete the "id" modoEnvio.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
