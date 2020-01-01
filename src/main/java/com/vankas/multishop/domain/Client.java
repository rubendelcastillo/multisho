package com.vankas.multishop.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.vankas.multishop.domain.enumeration.DocumentType;

/**
 * The Employee entity.
 */
@Entity
@Table(name = "client")
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * The firstname attribute.
     */
    @Column(name = "id_client")
    private Long idClient;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "creation_date")
    private Instant creationDate;

    @Column(name = "end_date")
    private Long endDate;

    @Column(name = "document_id")
    private String documentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "document_type")
    private DocumentType documentType;

    @OneToMany(mappedBy = "client")
    private Set<Location> countries = new HashSet<>();

    @OneToMany(mappedBy = "client")
    private Set<Pedido> idClients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdClient() {
        return idClient;
    }

    public Client idClient(Long idClient) {
        this.idClient = idClient;
        return this;
    }

    public void setIdClient(Long idClient) {
        this.idClient = idClient;
    }

    public String getFirstName() {
        return firstName;
    }

    public Client firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Client lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public Client email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Client phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public Client creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Long getEndDate() {
        return endDate;
    }

    public Client endDate(Long endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Long endDate) {
        this.endDate = endDate;
    }

    public String getDocumentId() {
        return documentId;
    }

    public Client documentId(String documentId) {
        this.documentId = documentId;
        return this;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public Client documentType(DocumentType documentType) {
        this.documentType = documentType;
        return this;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public Set<Location> getCountries() {
        return countries;
    }

    public Client countries(Set<Location> locations) {
        this.countries = locations;
        return this;
    }

    public Client addCountry(Location location) {
        this.countries.add(location);
        location.setClient(this);
        return this;
    }

    public Client removeCountry(Location location) {
        this.countries.remove(location);
        location.setClient(null);
        return this;
    }

    public void setCountries(Set<Location> locations) {
        this.countries = locations;
    }

    public Set<Pedido> getIdClients() {
        return idClients;
    }

    public Client idClients(Set<Pedido> pedidos) {
        this.idClients = pedidos;
        return this;
    }

    public Client addIdClient(Pedido pedido) {
        this.idClients.add(pedido);
        pedido.setClient(this);
        return this;
    }

    public Client removeIdClient(Pedido pedido) {
        this.idClients.remove(pedido);
        pedido.setClient(null);
        return this;
    }

    public void setIdClients(Set<Pedido> pedidos) {
        this.idClients = pedidos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Client)) {
            return false;
        }
        return id != null && id.equals(((Client) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", idClient=" + getIdClient() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", endDate=" + getEndDate() +
            ", documentId='" + getDocumentId() + "'" +
            ", documentType='" + getDocumentType() + "'" +
            "}";
    }
}
