package com.vankas.multishop.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class ModoPagoMapperTest {

    private ModoPagoMapper modoPagoMapper;

    @BeforeEach
    public void setUp() {
        modoPagoMapper = new ModoPagoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(modoPagoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(modoPagoMapper.fromId(null)).isNull();
    }
}
