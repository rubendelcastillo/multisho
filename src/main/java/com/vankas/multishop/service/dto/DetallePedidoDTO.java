package com.vankas.multishop.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.vankas.multishop.domain.DetallePedido} entity.
 */
public class DetallePedidoDTO implements Serializable {

    private Long id;

    private Long idPedido;

    private Long idProducto;

    private Double precioCompra;


    private Long pedidoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }

    public Double getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(Double precioCompra) {
        this.precioCompra = precioCompra;
    }

    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DetallePedidoDTO detallePedidoDTO = (DetallePedidoDTO) o;
        if (detallePedidoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), detallePedidoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DetallePedidoDTO{" +
            "id=" + getId() +
            ", idPedido=" + getIdPedido() +
            ", idProducto=" + getIdProducto() +
            ", precioCompra=" + getPrecioCompra() +
            ", pedidoId=" + getPedidoId() +
            "}";
    }
}
