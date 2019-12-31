package com.vankas.multishop.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.vankas.multishop.web.rest.TestUtil;

public class ModoPagoDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ModoPagoDTO.class);
        ModoPagoDTO modoPagoDTO1 = new ModoPagoDTO();
        modoPagoDTO1.setId(1L);
        ModoPagoDTO modoPagoDTO2 = new ModoPagoDTO();
        assertThat(modoPagoDTO1).isNotEqualTo(modoPagoDTO2);
        modoPagoDTO2.setId(modoPagoDTO1.getId());
        assertThat(modoPagoDTO1).isEqualTo(modoPagoDTO2);
        modoPagoDTO2.setId(2L);
        assertThat(modoPagoDTO1).isNotEqualTo(modoPagoDTO2);
        modoPagoDTO1.setId(null);
        assertThat(modoPagoDTO1).isNotEqualTo(modoPagoDTO2);
    }
}
