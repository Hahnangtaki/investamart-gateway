package id.tech.cakra.investamart.service.mapper;

import id.tech.cakra.investamart.domain.*;
import id.tech.cakra.investamart.service.dto.ManagerInvestasiDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ManagerInvestasi} and its DTO {@link ManagerInvestasiDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ManagerInvestasiMapper extends EntityMapper<ManagerInvestasiDTO, ManagerInvestasi> {



    default ManagerInvestasi fromId(Long id) {
        if (id == null) {
            return null;
        }
        ManagerInvestasi managerInvestasi = new ManagerInvestasi();
        managerInvestasi.setId(id);
        return managerInvestasi;
    }
}
