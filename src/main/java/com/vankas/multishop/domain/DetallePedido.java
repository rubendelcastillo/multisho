package com.vankas.multishop.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A DetallePedido.
 */
@Entity
@Table(name = "detalle_pedido")
public class DetallePedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_pedido")
    private Long idPedido;

    @Column(name = "id_producto")
    private Long idProducto;

    @Column(name = "precio_compra")
    private Double precioCompra;

    @OneToOne(mappedBy = "detallePedido")
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties("idPedidos")
    private Pedido pedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdPedido() {
        return idPedido;
    }

    public DetallePedido idPedido(Long idPedido) {
        this.idPedido = idPedido;
        return this;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

    public Long getIdProducto() {
        return idProducto;
    }

    public DetallePedido idProducto(Long idProducto) {
        this.idProducto = idProducto;
        return this;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }

    public Double getPrecioCompra() {
        return precioCompra;
    }

    public DetallePedido precioCompra(Double precioCompra) {
        this.precioCompra = precioCompra;
        return this;
    }

    public void setPrecioCompra(Double precioCompra) {
        this.precioCompra = precioCompra;
    }

    public Product getProduct() {
        return product;
    }

    public DetallePedido product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public DetallePedido pedido(Pedido pedido) {
        this.pedido = pedido;
        return this;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetallePedido)) {
            return false;
        }
        return id != null && id.equals(((DetallePedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DetallePedido{" +
            "id=" + getId() +
            ", idPedido=" + getIdPedido() +
            ", idProducto=" + getIdProducto() +
            ", precioCompra=" + getPrecioCompra() +
            "}";
    }
}
