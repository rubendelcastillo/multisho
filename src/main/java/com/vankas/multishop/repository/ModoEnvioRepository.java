package com.vankas.multishop.repository;

import com.vankas.multishop.domain.ModoEnvio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ModoEnvio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModoEnvioRepository extends JpaRepository<ModoEnvio, Long> {

}
