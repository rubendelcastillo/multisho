package com.vankas.multishop.service;

import com.vankas.multishop.service.dto.EstadoPedidoDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.vankas.multishop.domain.EstadoPedido}.
 */
public interface EstadoPedidoService {

    /**
     * Save a estadoPedido.
     *
     * @param estadoPedidoDTO the entity to save.
     * @return the persisted entity.
     */
    EstadoPedidoDTO save(EstadoPedidoDTO estadoPedidoDTO);

    /**
     * Get all the estadoPedidos.
     *
     * @return the list of entities.
     */
    List<EstadoPedidoDTO> findAll();
    /**
     * Get all the EstadoPedidoDTO where Pedido is {@code null}.
     *
     * @return the list of entities.
     */
    List<EstadoPedidoDTO> findAllWherePedidoIsNull();


    /**
     * Get the "id" estadoPedido.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EstadoPedidoDTO> findOne(Long id);

    /**
     * Delete the "id" estadoPedido.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
