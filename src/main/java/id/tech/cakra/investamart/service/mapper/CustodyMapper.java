package id.tech.cakra.investamart.service.mapper;

import id.tech.cakra.investamart.domain.*;
import id.tech.cakra.investamart.service.dto.CustodyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Custody} and its DTO {@link CustodyDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CustodyMapper extends EntityMapper<CustodyDTO, Custody> {



    default Custody fromId(Long id) {
        if (id == null) {
            return null;
        }
        Custody custody = new Custody();
        custody.setId(id);
        return custody;
    }
}
