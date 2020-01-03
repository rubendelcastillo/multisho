package com.vankas.multishop.service.dto;
import io.swagger.annotations.ApiModel;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.vankas.multishop.domain.Location} entity.
 */
@ApiModel(description = "not an ignored comment")
public class LocationDTO implements Serializable {

    private Long id;

    private String streetAddress;

    private String complementaryInfo;

    private String number;

    private String mainDoor;

    private String flatDoor;

    private String level;

    private String stair;

    private String postalCode;

    private String city;

    private String stateProvince;


    private Long countryId;

    private Long clientId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getComplementaryInfo() {
        return complementaryInfo;
    }

    public void setComplementaryInfo(String complementaryInfo) {
        this.complementaryInfo = complementaryInfo;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getMainDoor() {
        return mainDoor;
    }

    public void setMainDoor(String mainDoor) {
        this.mainDoor = mainDoor;
    }

    public String getFlatDoor() {
        return flatDoor;
    }

    public void setFlatDoor(String flatDoor) {
        this.flatDoor = flatDoor;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getStair() {
        return stair;
    }

    public void setStair(String stair) {
        this.stair = stair;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long regionId) {
        this.countryId = regionId;
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

        LocationDTO locationDTO = (LocationDTO) o;
        if (locationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), locationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LocationDTO{" +
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
            ", country=" + getCountryId() +
            ", client=" + getClientId() +
            "}";
    }
}
