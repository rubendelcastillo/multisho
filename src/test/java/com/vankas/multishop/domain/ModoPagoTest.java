package com.vankas.multishop.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.vankas.multishop.web.rest.TestUtil;

public class ModoPagoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ModoPago.class);
        ModoPago modoPago1 = new ModoPago();
        modoPago1.setId(1L);
        ModoPago modoPago2 = new ModoPago();
        modoPago2.setId(modoPago1.getId());
        assertThat(modoPago1).isEqualTo(modoPago2);
        modoPago2.setId(2L);
        assertThat(modoPago1).isNotEqualTo(modoPago2);
        modoPago1.setId(null);
        assertThat(modoPago1).isNotEqualTo(modoPago2);
    }
}
