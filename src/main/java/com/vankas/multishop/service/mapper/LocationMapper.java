package com.vankas.multishop.service.mapper;

import com.vankas.multishop.domain.*;
import com.vankas.multishop.service.dto.LocationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Location} and its DTO {@link LocationDTO}.
 */
@Mapper(componentModel = "spring", uses = {RegionMapper.class, ClientMapper.class})
public interface LocationMapper extends EntityMapper<LocationDTO, Location> {

    @Mapping(source = "country.id", target = "countryId")
    @Mapping(source = "client.id", target = "clientId")
    LocationDTO toDto(Location location);

    @Mapping(source = "countryId", target = "country")
    @Mapping(source = "clientId", target = "client")
    Location toEntity(LocationDTO locationDTO);

    default Location fromId(Long id) {
        if (id == null) {
            return null;
        }
        Location location = new Location();
        location.setId(id);
        return location;
    }
}
