package com.vankas.multishop.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.vankas.multishop.web.rest.TestUtil;

public class ModoEnvioTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ModoEnvio.class);
        ModoEnvio modoEnvio1 = new ModoEnvio();
        modoEnvio1.setId(1L);
        ModoEnvio modoEnvio2 = new ModoEnvio();
        modoEnvio2.setId(modoEnvio1.getId());
        assertThat(modoEnvio1).isEqualTo(modoEnvio2);
        modoEnvio2.setId(2L);
        assertThat(modoEnvio1).isNotEqualTo(modoEnvio2);
        modoEnvio1.setId(null);
        assertThat(modoEnvio1).isNotEqualTo(modoEnvio2);
    }
}
