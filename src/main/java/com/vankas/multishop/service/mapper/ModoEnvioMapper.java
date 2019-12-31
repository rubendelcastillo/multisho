package com.vankas.multishop.service.mapper;

import com.vankas.multishop.domain.*;
import com.vankas.multishop.service.dto.ModoEnvioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ModoEnvio} and its DTO {@link ModoEnvioDTO}.
 */
@Mapper(componentModel = "spring", uses = {PedidoMapper.class})
public interface ModoEnvioMapper extends EntityMapper<ModoEnvioDTO, ModoEnvio> {

    @Mapping(source = "pedido.id", target = "pedidoId")
    ModoEnvioDTO toDto(ModoEnvio modoEnvio);

    @Mapping(source = "pedidoId", target = "pedido")
    ModoEnvio toEntity(ModoEnvioDTO modoEnvioDTO);

    default ModoEnvio fromId(Long id) {
        if (id == null) {
            return null;
        }
        ModoEnvio modoEnvio = new ModoEnvio();
        modoEnvio.setId(id);
        return modoEnvio;
    }
}
