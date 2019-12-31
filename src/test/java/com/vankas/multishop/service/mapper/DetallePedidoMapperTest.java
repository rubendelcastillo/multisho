package com.vankas.multishop.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class DetallePedidoMapperTest {

    private DetallePedidoMapper detallePedidoMapper;

    @BeforeEach
    public void setUp() {
        detallePedidoMapper = new DetallePedidoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(detallePedidoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(detallePedidoMapper.fromId(null)).isNull();
    }
}
