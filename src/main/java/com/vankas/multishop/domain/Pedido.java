package com.vankas.multishop.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Pedido.
 */
@Entity
@Table(name = "pedido")
public class Pedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha_pedido")
    private LocalDate fechaPedido;

    @Column(name = "fecha_notificacion")
    private LocalDate fechaNotificacion;

    @Column(name = "id_modo_pago")
    private Integer idModoPago;

    @Column(name = "cargo_por_coste")
    private Double cargoPorCoste;

    @Column(name = "gastos_envio")
    private Double gastosEnvio;

    @Column(name = "id_modo_envio")
    private Long idModoEnvio;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "fecha_confirmacion")
    private LocalDate fechaConfirmacion;

    @ManyToOne
    @JsonIgnoreProperties("pedidos")
    private Client client;

    @OneToOne
    @JoinColumn(unique = true)
    private ModoEnvio modoEnvio;

    @OneToOne
    @JoinColumn(unique = true)
    private ModoPago modoPago;

    @OneToOne
    @JoinColumn(unique = true)
    private EstadoPedido estadoPedido;

    @OneToMany(mappedBy = "pedido")
    private Set<DetallePedido> idPedidos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaPedido() {
        return fechaPedido;
    }

    public Pedido fechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
        return this;
    }

    public void setFechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public LocalDate getFechaNotificacion() {
        return fechaNotificacion;
    }

    public Pedido fechaNotificacion(LocalDate fechaNotificacion) {
        this.fechaNotificacion = fechaNotificacion;
        return this;
    }

    public void setFechaNotificacion(LocalDate fechaNotificacion) {
        this.fechaNotificacion = fechaNotificacion;
    }

    public Integer getIdModoPago() {
        return idModoPago;
    }

    public Pedido idModoPago(Integer idModoPago) {
        this.idModoPago = idModoPago;
        return this;
    }

    public void setIdModoPago(Integer idModoPago) {
        this.idModoPago = idModoPago;
    }

    public Double getCargoPorCoste() {
        return cargoPorCoste;
    }

    public Pedido cargoPorCoste(Double cargoPorCoste) {
        this.cargoPorCoste = cargoPorCoste;
        return this;
    }

    public void setCargoPorCoste(Double cargoPorCoste) {
        this.cargoPorCoste = cargoPorCoste;
    }

    public Double getGastosEnvio() {
        return gastosEnvio;
    }

    public Pedido gastosEnvio(Double gastosEnvio) {
        this.gastosEnvio = gastosEnvio;
        return this;
    }

    public void setGastosEnvio(Double gastosEnvio) {
        this.gastosEnvio = gastosEnvio;
    }

    public Long getIdModoEnvio() {
        return idModoEnvio;
    }

    public Pedido idModoEnvio(Long idModoEnvio) {
        this.idModoEnvio = idModoEnvio;
        return this;
    }

    public void setIdModoEnvio(Long idModoEnvio) {
        this.idModoEnvio = idModoEnvio;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public Pedido jobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
        return this;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public LocalDate getFechaConfirmacion() {
        return fechaConfirmacion;
    }

    public Pedido fechaConfirmacion(LocalDate fechaConfirmacion) {
        this.fechaConfirmacion = fechaConfirmacion;
        return this;
    }

    public void setFechaConfirmacion(LocalDate fechaConfirmacion) {
        this.fechaConfirmacion = fechaConfirmacion;
    }

    public Client getClient() {
        return client;
    }

    public Pedido client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public ModoEnvio getModoEnvio() {
        return modoEnvio;
    }

    public Pedido modoEnvio(ModoEnvio modoEnvio) {
        this.modoEnvio = modoEnvio;
        return this;
    }

    public void setModoEnvio(ModoEnvio modoEnvio) {
        this.modoEnvio = modoEnvio;
    }

    public ModoPago getModoPago() {
        return modoPago;
    }

    public Pedido modoPago(ModoPago modoPago) {
        this.modoPago = modoPago;
        return this;
    }

    public void setModoPago(ModoPago modoPago) {
        this.modoPago = modoPago;
    }

    public EstadoPedido getEstadoPedido() {
        return estadoPedido;
    }

    public Pedido estadoPedido(EstadoPedido estadoPedido) {
        this.estadoPedido = estadoPedido;
        return this;
    }

    public void setEstadoPedido(EstadoPedido estadoPedido) {
        this.estadoPedido = estadoPedido;
    }

    public Set<DetallePedido> getIdPedidos() {
        return idPedidos;
    }

    public Pedido idPedidos(Set<DetallePedido> detallePedidos) {
        this.idPedidos = detallePedidos;
        return this;
    }

    public Pedido addIdPedido(DetallePedido detallePedido) {
        this.idPedidos.add(detallePedido);
        detallePedido.setPedido(this);
        return this;
    }

    public Pedido removeIdPedido(DetallePedido detallePedido) {
        this.idPedidos.remove(detallePedido);
        detallePedido.setPedido(null);
        return this;
    }

    public void setIdPedidos(Set<DetallePedido> detallePedidos) {
        this.idPedidos = detallePedidos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pedido)) {
            return false;
        }
        return id != null && id.equals(((Pedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Pedido{" +
            "id=" + getId() +
            ", fechaPedido='" + getFechaPedido() + "'" +
            ", fechaNotificacion='" + getFechaNotificacion() + "'" +
            ", idModoPago=" + getIdModoPago() +
            ", cargoPorCoste=" + getCargoPorCoste() +
            ", gastosEnvio=" + getGastosEnvio() +
            ", idModoEnvio=" + getIdModoEnvio() +
            ", jobTitle='" + getJobTitle() + "'" +
            ", fechaConfirmacion='" + getFechaConfirmacion() + "'" +
            "}";
    }
}
