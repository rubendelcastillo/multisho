package com.vankas.multishop.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.vankas.multishop.web.rest.TestUtil;

public class ModoEnvioDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ModoEnvioDTO.class);
        ModoEnvioDTO modoEnvioDTO1 = new ModoEnvioDTO();
        modoEnvioDTO1.setId(1L);
        ModoEnvioDTO modoEnvioDTO2 = new ModoEnvioDTO();
        assertThat(modoEnvioDTO1).isNotEqualTo(modoEnvioDTO2);
        modoEnvioDTO2.setId(modoEnvioDTO1.getId());
        assertThat(modoEnvioDTO1).isEqualTo(modoEnvioDTO2);
        modoEnvioDTO2.setId(2L);
        assertThat(modoEnvioDTO1).isNotEqualTo(modoEnvioDTO2);
        modoEnvioDTO1.setId(null);
        assertThat(modoEnvioDTO1).isNotEqualTo(modoEnvioDTO2);
    }
}
