package com.vankas.multishop.service;

import com.vankas.multishop.service.dto.DetallePedidoDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.vankas.multishop.domain.DetallePedido}.
 */
public interface DetallePedidoService {

    /**
     * Save a detallePedido.
     *
     * @param detallePedidoDTO the entity to save.
     * @return the persisted entity.
     */
    DetallePedidoDTO save(DetallePedidoDTO detallePedidoDTO);

    /**
     * Get all the detallePedidos.
     *
     * @return the list of entities.
     */
    List<DetallePedidoDTO> findAll();
    /**
     * Get all the DetallePedidoDTO where Product is {@code null}.
     *
     * @return the list of entities.
     */
    List<DetallePedidoDTO> findAllWhereProductIsNull();


    /**
     * Get the "id" detallePedido.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DetallePedidoDTO> findOne(Long id);

    /**
     * Delete the "id" detallePedido.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
