package com.vankas.multishop.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.vankas.multishop.domain.ModoPago} entity.
 */
public class ModoPagoDTO implements Serializable {

    private Long id;

    private String descripcion;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ModoPagoDTO modoPagoDTO = (ModoPagoDTO) o;
        if (modoPagoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), modoPagoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ModoPagoDTO{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
