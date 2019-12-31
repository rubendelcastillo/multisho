package com.vankas.multishop.service.impl;

import com.vankas.multishop.service.DetallePedidoService;
import com.vankas.multishop.domain.DetallePedido;
import com.vankas.multishop.repository.DetallePedidoRepository;
import com.vankas.multishop.service.dto.DetallePedidoDTO;
import com.vankas.multishop.service.mapper.DetallePedidoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link DetallePedido}.
 */
@Service
@Transactional
public class DetallePedidoServiceImpl implements DetallePedidoService {

    private final Logger log = LoggerFactory.getLogger(DetallePedidoServiceImpl.class);

    private final DetallePedidoRepository detallePedidoRepository;

    private final DetallePedidoMapper detallePedidoMapper;

    public DetallePedidoServiceImpl(DetallePedidoRepository detallePedidoRepository, DetallePedidoMapper detallePedidoMapper) {
        this.detallePedidoRepository = detallePedidoRepository;
        this.detallePedidoMapper = detallePedidoMapper;
    }

    /**
     * Save a detallePedido.
     *
     * @param detallePedidoDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DetallePedidoDTO save(DetallePedidoDTO detallePedidoDTO) {
        log.debug("Request to save DetallePedido : {}", detallePedidoDTO);
        DetallePedido detallePedido = detallePedidoMapper.toEntity(detallePedidoDTO);
        detallePedido = detallePedidoRepository.save(detallePedido);
        return detallePedidoMapper.toDto(detallePedido);
    }

    /**
     * Get all the detallePedidos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<DetallePedidoDTO> findAll() {
        log.debug("Request to get all DetallePedidos");
        return detallePedidoRepository.findAll().stream()
            .map(detallePedidoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }



    /**
    *  Get all the detallePedidos where Product is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<DetallePedidoDTO> findAllWhereProductIsNull() {
        log.debug("Request to get all detallePedidos where Product is null");
        return StreamSupport
            .stream(detallePedidoRepository.findAll().spliterator(), false)
            .filter(detallePedido -> detallePedido.getProduct() == null)
            .map(detallePedidoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one detallePedido by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DetallePedidoDTO> findOne(Long id) {
        log.debug("Request to get DetallePedido : {}", id);
        return detallePedidoRepository.findById(id)
            .map(detallePedidoMapper::toDto);
    }

    /**
     * Delete the detallePedido by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DetallePedido : {}", id);
        detallePedidoRepository.deleteById(id);
    }
}
