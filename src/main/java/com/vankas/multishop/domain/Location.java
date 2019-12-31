package com.vankas.multishop.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * not an ignored comment
 */
@Entity
@Table(name = "location")
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "complementary_info")
    private String complementaryInfo;

    @Column(name = "number")
    private String number;

    @Column(name = "main_door")
    private String mainDoor;

    @Column(name = "flat_door")
    private String flatDoor;

    @Column(name = "level")
    private String level;

    @Column(name = "stair")
    private String stair;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "state_province")
    private String stateProvince;

    @OneToOne
    @JoinColumn(unique = true)
    private Region country;

    @ManyToOne
    @JsonIgnoreProperties("countries")
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public Location streetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
        return this;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getComplementaryInfo() {
        return complementaryInfo;
    }

    public Location complementaryInfo(String complementaryInfo) {
        this.complementaryInfo = complementaryInfo;
        return this;
    }

    public void setComplementaryInfo(String complementaryInfo) {
        this.complementaryInfo = complementaryInfo;
    }

    public String getNumber() {
        return number;
    }

    public Location number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getMainDoor() {
        return mainDoor;
    }

    public Location mainDoor(String mainDoor) {
        this.mainDoor = mainDoor;
        return this;
    }

    public void setMainDoor(String mainDoor) {
        this.mainDoor = mainDoor;
    }

    public String getFlatDoor() {
        return flatDoor;
    }

    public Location flatDoor(String flatDoor) {
        this.flatDoor = flatDoor;
        return this;
    }

    public void setFlatDoor(String flatDoor) {
        this.flatDoor = flatDoor;
    }

    public String getLevel() {
        return level;
    }

    public Location level(String level) {
        this.level = level;
        return this;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getStair() {
        return stair;
    }

    public Location stair(String stair) {
        this.stair = stair;
        return this;
    }

    public void setStair(String stair) {
        this.stair = stair;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Location postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public Location city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public Location stateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
        return this;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public Region getCountry() {
        return country;
    }

    public Location country(Region region) {
        this.country = region;
        return this;
    }

    public void setCountry(Region region) {
        this.country = region;
    }

    public Client getClient() {
        return client;
    }

    public Location client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Location)) {
            return false;
        }
        return id != null && id.equals(((Location) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Location{" +
            "id=" + getId() +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", complementaryInfo='" + getComplementaryInfo() + "'" +
            ", number='" + getNumber() + "'" +
            ", mainDoor='" + getMainDoor() + "'" +
            ", flatDoor='" + getFlatDoor() + "'" +
            ", level='" + getLevel() + "'" +
            ", stair='" + getStair() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", city='" + getCity() + "'" +
            ", stateProvince='" + getStateProvince() + "'" +
            "}";
    }
}
