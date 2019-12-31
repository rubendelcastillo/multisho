package com.vankas.multishop.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class EstadoPedidoMapperTest {

    private EstadoPedidoMapper estadoPedidoMapper;

    @BeforeEach
    public void setUp() {
        estadoPedidoMapper = new EstadoPedidoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(estadoPedidoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(estadoPedidoMapper.fromId(null)).isNull();
    }
}
