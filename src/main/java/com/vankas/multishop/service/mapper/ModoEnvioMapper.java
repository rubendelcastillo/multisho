package com.vankas.multishop.service.mapper;

import com.vankas.multishop.domain.*;
import com.vankas.multishop.service.dto.ModoEnvioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ModoEnvio} and its DTO {@link ModoEnvioDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ModoEnvioMapper extends EntityMapper<ModoEnvioDTO, ModoEnvio> {


    @Mapping(target = "pedido", ignore = true)
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
