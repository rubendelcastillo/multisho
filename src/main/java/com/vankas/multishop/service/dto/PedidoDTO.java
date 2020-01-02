package com.vankas.multishop.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.vankas.multishop.domain.Pedido} entity.
 */
public class PedidoDTO implements Serializable {

    private Long id;

    private LocalDate fechaPedido;

    private LocalDate fechaNotificacion;

    private Integer idModoPago;

    private Double cargoPorCoste;

    private Double gastosEnvio;

    private Long idModoEnvio;

    private String jobTitle;

    private LocalDate fechaConfirmacion;


    private Long modoEnvioId;

    private Long modoPagoId;

    private Long estadoPedidoId;

    private Long clientId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public LocalDate getFechaNotificacion() {
        return fechaNotificacion;
    }

    public void setFechaNotificacion(LocalDate fechaNotificacion) {
        this.fechaNotificacion = fechaNotificacion;
    }

    public Integer getIdModoPago() {
        return idModoPago;
    }

    public void setIdModoPago(Integer idModoPago) {
        this.idModoPago = idModoPago;
    }

    public Double getCargoPorCoste() {
        return cargoPorCoste;
    }

    public void setCargoPorCoste(Double cargoPorCoste) {
        this.cargoPorCoste = cargoPorCoste;
    }

    public Double getGastosEnvio() {
        return gastosEnvio;
    }

    public void setGastosEnvio(Double gastosEnvio) {
        this.gastosEnvio = gastosEnvio;
    }

    public Long getIdModoEnvio() {
        return idModoEnvio;
    }

    public void setIdModoEnvio(Long idModoEnvio) {
        this.idModoEnvio = idModoEnvio;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public LocalDate getFechaConfirmacion() {
        return fechaConfirmacion;
    }

    public void setFechaConfirmacion(LocalDate fechaConfirmacion) {
        this.fechaConfirmacion = fechaConfirmacion;
    }

    public Long getModoEnvioId() {
        return modoEnvioId;
    }

    public void setModoEnvioId(Long modoEnvioId) {
        this.modoEnvioId = modoEnvioId;
    }

    public Long getModoPagoId() {
        return modoPagoId;
    }

    public void setModoPagoId(Long modoPagoId) {
        this.modoPagoId = modoPagoId;
    }

    public Long getEstadoPedidoId() {
        return estadoPedidoId;
    }

    public void setEstadoPedidoId(Long estadoPedidoId) {
        this.estadoPedidoId = estadoPedidoId;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PedidoDTO pedidoDTO = (PedidoDTO) o;
        if (pedidoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pedidoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PedidoDTO{" +
            "id=" + getId() +
            ", fechaPedido='" + getFechaPedido() + "'" +
            ", fechaNotificacion='" + getFechaNotificacion() + "'" +
            ", idModoPago=" + getIdModoPago() +
            ", cargoPorCoste=" + getCargoPorCoste() +
            ", gastosEnvio=" + getGastosEnvio() +
            ", idModoEnvio=" + getIdModoEnvio() +
            ", jobTitle='" + getJobTitle() + "'" +
            ", fechaConfirmacion='" + getFechaConfirmacion() + "'" +
            ", modoEnvioId=" + getModoEnvioId() +
            ", modoPagoId=" + getModoPagoId() +
            ", estadoPedidoId=" + getEstadoPedidoId() +
            ", clientId=" + getClientId() +
            "}";
    }
}
