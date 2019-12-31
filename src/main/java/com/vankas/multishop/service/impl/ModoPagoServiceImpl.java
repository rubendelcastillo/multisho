package com.vankas.multishop.service.impl;

import com.vankas.multishop.service.ModoPagoService;
import com.vankas.multishop.domain.ModoPago;
import com.vankas.multishop.repository.ModoPagoRepository;
import com.vankas.multishop.service.dto.ModoPagoDTO;
import com.vankas.multishop.service.mapper.ModoPagoMapper;
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
 * Service Implementation for managing {@link ModoPago}.
 */
@Service
@Transactional
public class ModoPagoServiceImpl implements ModoPagoService {

    private final Logger log = LoggerFactory.getLogger(ModoPagoServiceImpl.class);

    private final ModoPagoRepository modoPagoRepository;

    private final ModoPagoMapper modoPagoMapper;

    public ModoPagoServiceImpl(ModoPagoRepository modoPagoRepository, ModoPagoMapper modoPagoMapper) {
        this.modoPagoRepository = modoPagoRepository;
        this.modoPagoMapper = modoPagoMapper;
    }

    /**
     * Save a modoPago.
     *
     * @param modoPagoDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ModoPagoDTO save(ModoPagoDTO modoPagoDTO) {
        log.debug("Request to save ModoPago : {}", modoPagoDTO);
        ModoPago modoPago = modoPagoMapper.toEntity(modoPagoDTO);
        modoPago = modoPagoRepository.save(modoPago);
        return modoPagoMapper.toDto(modoPago);
    }

    /**
     * Get all the modoPagos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ModoPagoDTO> findAll() {
        log.debug("Request to get all ModoPagos");
        return modoPagoRepository.findAll().stream()
            .map(modoPagoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }



    /**
    *  Get all the modoPagos where Pedido is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<ModoPagoDTO> findAllWherePedidoIsNull() {
        log.debug("Request to get all modoPagos where Pedido is null");
        return StreamSupport
            .stream(modoPagoRepository.findAll().spliterator(), false)
            .filter(modoPago -> modoPago.getPedido() == null)
            .map(modoPagoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one modoPago by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ModoPagoDTO> findOne(Long id) {
        log.debug("Request to get ModoPago : {}", id);
        return modoPagoRepository.findById(id)
            .map(modoPagoMapper::toDto);
    }

    /**
     * Delete the modoPago by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ModoPago : {}", id);
        modoPagoRepository.deleteById(id);
    }
}
