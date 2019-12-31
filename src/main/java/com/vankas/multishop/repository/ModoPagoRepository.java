package com.vankas.multishop.repository;

import com.vankas.multishop.domain.ModoPago;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ModoPago entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModoPagoRepository extends JpaRepository<ModoPago, Long> {

}
