package com.vankas.multishop.service;

import com.vankas.multishop.service.dto.ModoPagoDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.vankas.multishop.domain.ModoPago}.
 */
public interface ModoPagoService {

    /**
     * Save a modoPago.
     *
     * @param modoPagoDTO the entity to save.
     * @return the persisted entity.
     */
    ModoPagoDTO save(ModoPagoDTO modoPagoDTO);

    /**
     * Get all the modoPagos.
     *
     * @return the list of entities.
     */
    List<ModoPagoDTO> findAll();
    /**
     * Get all the ModoPagoDTO where Pedido is {@code null}.
     *
     * @return the list of entities.
     */
    List<ModoPagoDTO> findAllWherePedidoIsNull();


    /**
     * Get the "id" modoPago.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ModoPagoDTO> findOne(Long id);

    /**
     * Delete the "id" modoPago.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
