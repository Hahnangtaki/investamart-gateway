package id.tech.cakra.investamart.service.mapper;

import id.tech.cakra.investamart.domain.*;
import id.tech.cakra.investamart.service.dto.InstrumentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Instrument} and its DTO {@link InstrumentDTO}.
 */
@Mapper(componentModel = "spring", uses = {CurrencyMapper.class})
public interface InstrumentMapper extends EntityMapper<InstrumentDTO, Instrument> {

    @Mapping(source = "currency.id", target = "currencyId")
    InstrumentDTO toDto(Instrument instrument);

    @Mapping(source = "currencyId", target = "currency")
    Instrument toEntity(InstrumentDTO instrumentDTO);

    default Instrument fromId(Long id) {
        if (id == null) {
            return null;
        }
        Instrument instrument = new Instrument();
        instrument.setId(id);
        return instrument;
    }
}
