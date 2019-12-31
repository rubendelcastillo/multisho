package com.vankas.multishop.service.mapper;

import com.vankas.multishop.domain.*;
import com.vankas.multishop.service.dto.DetallePedidoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link DetallePedido} and its DTO {@link DetallePedidoDTO}.
 */
@Mapper(componentModel = "spring", uses = {PedidoMapper.class})
public interface DetallePedidoMapper extends EntityMapper<DetallePedidoDTO, DetallePedido> {

    @Mapping(source = "pedido.id", target = "pedidoId")
    DetallePedidoDTO toDto(DetallePedido detallePedido);

    @Mapping(target = "product", ignore = true)
    @Mapping(source = "pedidoId", target = "pedido")
    DetallePedido toEntity(DetallePedidoDTO detallePedidoDTO);

    default DetallePedido fromId(Long id) {
        if (id == null) {
            return null;
        }
        DetallePedido detallePedido = new DetallePedido();
        detallePedido.setId(id);
        return detallePedido;
    }
}
