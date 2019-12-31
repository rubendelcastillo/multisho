package com.vankas.multishop.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.vankas.multishop.domain.EstadoPedido} entity.
 */
public class EstadoPedidoDTO implements Serializable {

    private Long id;

    private Integer idEstado;

    private String descripcion;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(Integer idEstado) {
        this.idEstado = idEstado;
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

        EstadoPedidoDTO estadoPedidoDTO = (EstadoPedidoDTO) o;
        if (estadoPedidoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), estadoPedidoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EstadoPedidoDTO{" +
            "id=" + getId() +
            ", idEstado=" + getIdEstado() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
