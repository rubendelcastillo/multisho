package com.vankas.multishop.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.vankas.multishop.domain.ModoEnvio} entity.
 */
public class ModoEnvioDTO implements Serializable {

    private Long id;

    @NotNull
    private String modoEnvio;


    private Long pedidoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModoEnvio() {
        return modoEnvio;
    }

    public void setModoEnvio(String modoEnvio) {
        this.modoEnvio = modoEnvio;
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

        ModoEnvioDTO modoEnvioDTO = (ModoEnvioDTO) o;
        if (modoEnvioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), modoEnvioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ModoEnvioDTO{" +
            "id=" + getId() +
            ", modoEnvio='" + getModoEnvio() + "'" +
            ", pedidoId=" + getPedidoId() +
            "}";
    }
}
