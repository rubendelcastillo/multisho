package com.vankas.multishop.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.vankas.multishop.web.rest.TestUtil;

public class DetallePedidoDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetallePedidoDTO.class);
        DetallePedidoDTO detallePedidoDTO1 = new DetallePedidoDTO();
        detallePedidoDTO1.setId(1L);
        DetallePedidoDTO detallePedidoDTO2 = new DetallePedidoDTO();
        assertThat(detallePedidoDTO1).isNotEqualTo(detallePedidoDTO2);
        detallePedidoDTO2.setId(detallePedidoDTO1.getId());
        assertThat(detallePedidoDTO1).isEqualTo(detallePedidoDTO2);
        detallePedidoDTO2.setId(2L);
        assertThat(detallePedidoDTO1).isNotEqualTo(detallePedidoDTO2);
        detallePedidoDTO1.setId(null);
        assertThat(detallePedidoDTO1).isNotEqualTo(detallePedidoDTO2);
    }
}
