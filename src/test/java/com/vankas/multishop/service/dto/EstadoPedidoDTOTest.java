package com.vankas.multishop.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.vankas.multishop.web.rest.TestUtil;

public class EstadoPedidoDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoPedidoDTO.class);
        EstadoPedidoDTO estadoPedidoDTO1 = new EstadoPedidoDTO();
        estadoPedidoDTO1.setId(1L);
        EstadoPedidoDTO estadoPedidoDTO2 = new EstadoPedidoDTO();
        assertThat(estadoPedidoDTO1).isNotEqualTo(estadoPedidoDTO2);
        estadoPedidoDTO2.setId(estadoPedidoDTO1.getId());
        assertThat(estadoPedidoDTO1).isEqualTo(estadoPedidoDTO2);
        estadoPedidoDTO2.setId(2L);
        assertThat(estadoPedidoDTO1).isNotEqualTo(estadoPedidoDTO2);
        estadoPedidoDTO1.setId(null);
        assertThat(estadoPedidoDTO1).isNotEqualTo(estadoPedidoDTO2);
    }
}
