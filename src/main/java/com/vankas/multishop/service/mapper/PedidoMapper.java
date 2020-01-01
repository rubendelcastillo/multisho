package com.vankas.multishop.service.mapper;

import com.vankas.multishop.domain.*;
import com.vankas.multishop.service.dto.PedidoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Pedido} and its DTO {@link PedidoDTO}.
 */
@Mapper(componentModel = "spring", uses = {ModoPagoMapper.class, EstadoPedidoMapper.class, ClientMapper.class})
public interface PedidoMapper extends EntityMapper<PedidoDTO, Pedido> {

    @Mapping(source = "modoPago.id", target = "modoPagoId")
    @Mapping(source = "estadoPedido.id", target = "estadoPedidoId")
    @Mapping(source = "client.id", target = "clientId")
    PedidoDTO toDto(Pedido pedido);

    @Mapping(source = "modoPagoId", target = "modoPago")
    @Mapping(source = "estadoPedidoId", target = "estadoPedido")
    @Mapping(target = "idPedidos", ignore = true)
    @Mapping(target = "removeIdPedido", ignore = true)
    @Mapping(target = "modoEnvio", ignore = true)
    @Mapping(source = "clientId", target = "client")
    Pedido toEntity(PedidoDTO pedidoDTO);

    default Pedido fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pedido pedido = new Pedido();
        pedido.setId(id);
        return pedido;
    }
}
