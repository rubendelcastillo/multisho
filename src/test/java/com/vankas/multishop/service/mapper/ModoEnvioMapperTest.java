package com.vankas.multishop.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class ModoEnvioMapperTest {

    private ModoEnvioMapper modoEnvioMapper;

    @BeforeEach
    public void setUp() {
        modoEnvioMapper = new ModoEnvioMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(modoEnvioMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(modoEnvioMapper.fromId(null)).isNull();
    }
}
