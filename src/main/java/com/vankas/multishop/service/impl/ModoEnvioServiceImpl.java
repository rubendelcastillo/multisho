package com.vankas.multishop.service.impl;

import com.vankas.multishop.service.ModoEnvioService;
import com.vankas.multishop.domain.ModoEnvio;
import com.vankas.multishop.repository.ModoEnvioRepository;
import com.vankas.multishop.service.dto.ModoEnvioDTO;
import com.vankas.multishop.service.mapper.ModoEnvioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link ModoEnvio}.
 */
@Service
@Transactional
public class ModoEnvioServiceImpl implements ModoEnvioService {

    private final Logger log = LoggerFactory.getLogger(ModoEnvioServiceImpl.class);

    private final ModoEnvioRepository modoEnvioRepository;

    private final ModoEnvioMapper modoEnvioMapper;

    public ModoEnvioServiceImpl(ModoEnvioRepository modoEnvioRepository, ModoEnvioMapper modoEnvioMapper) {
        this.modoEnvioRepository = modoEnvioRepository;
        this.modoEnvioMapper = modoEnvioMapper;
    }

    /**
     * Save a modoEnvio.
     *
     * @param modoEnvioDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ModoEnvioDTO save(ModoEnvioDTO modoEnvioDTO) {
        log.debug("Request to save ModoEnvio : {}", modoEnvioDTO);
        ModoEnvio modoEnvio = modoEnvioMapper.toEntity(modoEnvioDTO);
        modoEnvio = modoEnvioRepository.save(modoEnvio);
        return modoEnvioMapper.toDto(modoEnvio);
    }

    /**
     * Get all the modoEnvios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ModoEnvioDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ModoEnvios");
        return modoEnvioRepository.findAll(pageable)
            .map(modoEnvioMapper::toDto);
    }



    /**
    *  Get all the modoEnvios where Pedido is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<ModoEnvioDTO> findAllWherePedidoIsNull() {
        log.debug("Request to get all modoEnvios where Pedido is null");
        return StreamSupport
            .stream(modoEnvioRepository.findAll().spliterator(), false)
            .filter(modoEnvio -> modoEnvio.getPedido() == null)
            .map(modoEnvioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one modoEnvio by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ModoEnvioDTO> findOne(Long id) {
        log.debug("Request to get ModoEnvio : {}", id);
        return modoEnvioRepository.findById(id)
            .map(modoEnvioMapper::toDto);
    }

    /**
     * Delete the modoEnvio by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ModoEnvio : {}", id);
        modoEnvioRepository.deleteById(id);
    }
}
