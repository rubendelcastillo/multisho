package com.vankas.multishop.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link com.vankas.multishop.domain.Pedido} entity.
 */
public class PedidoDTO implements Serializable {

    private Long id;

    private BigDecimal idPedido;

    private Long idClient;

    private Long idTienda;

    private LocalDate fechaPedido;

    private LocalDate fechaNotificacion;

    private Integer idModoPago;

    private Double cargoPorCoste;

    private Double gastosEnvio;

    private Long idModoEnvio;

    private String jobTitle;

    private Integer idEstado;

    private LocalDate fechaConfirmacion;


    private Long modoPagoId;

    private Long estadoPedidoId;

    private Long clientId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(BigDecimal idPedido) {
        this.idPedido = idPedido;
    }

    public Long getIdClient() {
        return idClient;
    }

    public void setIdClient(Long idClient) {
        this.idClient = idClient;
    }

    public Long getIdTienda() {
        return idTienda;
    }

    public void setIdTienda(Long idTienda) {
        this.idTienda = idTienda;
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

    public Integer getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(Integer idEstado) {
        this.idEstado = idEstado;
    }

    public LocalDate getFechaConfirmacion() {
        return fechaConfirmacion;
    }

    public void setFechaConfirmacion(LocalDate fechaConfirmacion) {
        this.fechaConfirmacion = fechaConfirmacion;
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
            ", idPedido=" + getIdPedido() +
            ", idClient=" + getIdClient() +
            ", idTienda=" + getIdTienda() +
            ", fechaPedido='" + getFechaPedido() + "'" +
            ", fechaNotificacion='" + getFechaNotificacion() + "'" +
            ", idModoPago=" + getIdModoPago() +
            ", cargoPorCoste=" + getCargoPorCoste() +
            ", gastosEnvio=" + getGastosEnvio() +
            ", idModoEnvio=" + getIdModoEnvio() +
            ", jobTitle='" + getJobTitle() + "'" +
            ", idEstado=" + getIdEstado() +
            ", fechaConfirmacion='" + getFechaConfirmacion() + "'" +
            ", modoPagoId=" + getModoPagoId() +
            ", estadoPedidoId=" + getEstadoPedidoId() +
            ", clientId=" + getClientId() +
            "}";
    }
}
