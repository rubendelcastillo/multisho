package com.vankas.multishop.service.mapper;

import com.vankas.multishop.domain.*;
import com.vankas.multishop.service.dto.ModoPagoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ModoPago} and its DTO {@link ModoPagoDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ModoPagoMapper extends EntityMapper<ModoPagoDTO, ModoPago> {


    @Mapping(target = "pedido", ignore = true)
    ModoPago toEntity(ModoPagoDTO modoPagoDTO);

    default ModoPago fromId(Long id) {
        if (id == null) {
            return null;
        }
        ModoPago modoPago = new ModoPago();
        modoPago.setId(id);
        return modoPago;
    }
}
