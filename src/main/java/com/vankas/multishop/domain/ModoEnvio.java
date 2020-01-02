package com.vankas.multishop.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A ModoEnvio.
 */
@Entity
@Table(name = "modo_envio")
public class ModoEnvio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "modo_envio", nullable = false)
    private String modoEnvio;

    @OneToOne(mappedBy = "modoEnvio")
    @JsonIgnore
    private Pedido pedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModoEnvio() {
        return modoEnvio;
    }

    public ModoEnvio modoEnvio(String modoEnvio) {
        this.modoEnvio = modoEnvio;
        return this;
    }

    public void setModoEnvio(String modoEnvio) {
        this.modoEnvio = modoEnvio;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public ModoEnvio pedido(Pedido pedido) {
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
        if (!(o instanceof ModoEnvio)) {
            return false;
        }
        return id != null && id.equals(((ModoEnvio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ModoEnvio{" +
            "id=" + getId() +
            ", modoEnvio='" + getModoEnvio() + "'" +
            "}";
    }
}
