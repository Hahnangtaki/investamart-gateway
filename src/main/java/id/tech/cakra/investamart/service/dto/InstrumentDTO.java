package id.tech.cakra.investamart.service.dto;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link id.tech.cakra.investamart.domain.Instrument} entity.
 */
public class InstrumentDTO implements Serializable {

    private Long id;

    @Size(max = 20)
    private String instrumentCode;

    @Size(max = 1)
    private String instrumentType;

    @Size(max = 20)
    private String instrumentShortCode;

    @Size(max = 50)
    private String instrumentName;

    private Double price;

    private LocalDate priceDate;

    private Long haircut;

    private LocalDate haricutDate;

    private LocalDate createSystemDate;

    private ZonedDateTime createDate;

    private Long createUserId;

    private LocalDate lastModificationSystemDate;

    private ZonedDateTime lastModificationDate;

    private Long lastModificationUserId;


    private Long currencyId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInstrumentCode() {
        return instrumentCode;
    }

    public void setInstrumentCode(String instrumentCode) {
        this.instrumentCode = instrumentCode;
    }

    public String getInstrumentType() {
        return instrumentType;
    }

    public void setInstrumentType(String instrumentType) {
        this.instrumentType = instrumentType;
    }

    public String getInstrumentShortCode() {
        return instrumentShortCode;
    }

    public void setInstrumentShortCode(String instrumentShortCode) {
        this.instrumentShortCode = instrumentShortCode;
    }

    public String getInstrumentName() {
        return instrumentName;
    }

    public void setInstrumentName(String instrumentName) {
        this.instrumentName = instrumentName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDate getPriceDate() {
        return priceDate;
    }

    public void setPriceDate(LocalDate priceDate) {
        this.priceDate = priceDate;
    }

    public Long getHaircut() {
        return haircut;
    }

    public void setHaircut(Long haircut) {
        this.haircut = haircut;
    }

    public LocalDate getHaricutDate() {
        return haricutDate;
    }

    public void setHaricutDate(LocalDate haricutDate) {
        this.haricutDate = haricutDate;
    }

    public LocalDate getCreateSystemDate() {
        return createSystemDate;
    }

    public void setCreateSystemDate(LocalDate createSystemDate) {
        this.createSystemDate = createSystemDate;
    }

    public ZonedDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(ZonedDateTime createDate) {
        this.createDate = createDate;
    }

    public Long getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(Long createUserId) {
        this.createUserId = createUserId;
    }

    public LocalDate getLastModificationSystemDate() {
        return lastModificationSystemDate;
    }

    public void setLastModificationSystemDate(LocalDate lastModificationSystemDate) {
        this.lastModificationSystemDate = lastModificationSystemDate;
    }

    public ZonedDateTime getLastModificationDate() {
        return lastModificationDate;
    }

    public void setLastModificationDate(ZonedDateTime lastModificationDate) {
        this.lastModificationDate = lastModificationDate;
    }

    public Long getLastModificationUserId() {
        return lastModificationUserId;
    }

    public void setLastModificationUserId(Long lastModificationUserId) {
        this.lastModificationUserId = lastModificationUserId;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        InstrumentDTO instrumentDTO = (InstrumentDTO) o;
        if (instrumentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), instrumentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InstrumentDTO{" +
            "id=" + getId() +
            ", instrumentCode='" + getInstrumentCode() + "'" +
            ", instrumentType='" + getInstrumentType() + "'" +
            ", instrumentShortCode='" + getInstrumentShortCode() + "'" +
            ", instrumentName='" + getInstrumentName() + "'" +
            ", price=" + getPrice() +
            ", priceDate='" + getPriceDate() + "'" +
            ", haircut=" + getHaircut() +
            ", haricutDate='" + getHaricutDate() + "'" +
            ", createSystemDate='" + getCreateSystemDate() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", createUserId=" + getCreateUserId() +
            ", lastModificationSystemDate='" + getLastModificationSystemDate() + "'" +
            ", lastModificationDate='" + getLastModificationDate() + "'" +
            ", lastModificationUserId=" + getLastModificationUserId() +
            ", currency=" + getCurrencyId() +
            "}";
    }
}
