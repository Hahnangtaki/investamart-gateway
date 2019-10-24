package id.tech.cakra.investamart.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;

/**
 * A Instrument.
 */
@Entity
@Table(name = "instrument")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Instrument implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 20)
    @Column(name = "instrument_code", length = 20)
    private String instrumentCode;

    @Size(max = 1)
    @Column(name = "instrument_type", length = 1)
    private String instrumentType;

    @Size(max = 20)
    @Column(name = "instrument_short_code", length = 20)
    private String instrumentShortCode;

    @Size(max = 50)
    @Column(name = "instrument_name", length = 50)
    private String instrumentName;

    @Column(name = "price")
    private Double price;

    @Column(name = "price_date")
    private LocalDate priceDate;

    @Column(name = "haircut")
    private Long haircut;

    @Column(name = "haricut_date")
    private LocalDate haricutDate;

    @Column(name = "create_system_date")
    private LocalDate createSystemDate;

    @Column(name = "create_date")
    private ZonedDateTime createDate;

    @Column(name = "create_user_id")
    private Long createUserId;

    @Column(name = "last_modification_system_date")
    private LocalDate lastModificationSystemDate;

    @Column(name = "last_modification_date")
    private ZonedDateTime lastModificationDate;

    @Column(name = "last_modification_user_id")
    private Long lastModificationUserId;

    @ManyToOne
    @JsonIgnoreProperties("instruments")
    private Currency currency;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInstrumentCode() {
        return instrumentCode;
    }

    public Instrument instrumentCode(String instrumentCode) {
        this.instrumentCode = instrumentCode;
        return this;
    }

    public void setInstrumentCode(String instrumentCode) {
        this.instrumentCode = instrumentCode;
    }

    public String getInstrumentType() {
        return instrumentType;
    }

    public Instrument instrumentType(String instrumentType) {
        this.instrumentType = instrumentType;
        return this;
    }

    public void setInstrumentType(String instrumentType) {
        this.instrumentType = instrumentType;
    }

    public String getInstrumentShortCode() {
        return instrumentShortCode;
    }

    public Instrument instrumentShortCode(String instrumentShortCode) {
        this.instrumentShortCode = instrumentShortCode;
        return this;
    }

    public void setInstrumentShortCode(String instrumentShortCode) {
        this.instrumentShortCode = instrumentShortCode;
    }

    public String getInstrumentName() {
        return instrumentName;
    }

    public Instrument instrumentName(String instrumentName) {
        this.instrumentName = instrumentName;
        return this;
    }

    public void setInstrumentName(String instrumentName) {
        this.instrumentName = instrumentName;
    }

    public Double getPrice() {
        return price;
    }

    public Instrument price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDate getPriceDate() {
        return priceDate;
    }

    public Instrument priceDate(LocalDate priceDate) {
        this.priceDate = priceDate;
        return this;
    }

    public void setPriceDate(LocalDate priceDate) {
        this.priceDate = priceDate;
    }

    public Long getHaircut() {
        return haircut;
    }

    public Instrument haircut(Long haircut) {
        this.haircut = haircut;
        return this;
    }

    public void setHaircut(Long haircut) {
        this.haircut = haircut;
    }

    public LocalDate getHaricutDate() {
        return haricutDate;
    }

    public Instrument haricutDate(LocalDate haricutDate) {
        this.haricutDate = haricutDate;
        return this;
    }

    public void setHaricutDate(LocalDate haricutDate) {
        this.haricutDate = haricutDate;
    }

    public LocalDate getCreateSystemDate() {
        return createSystemDate;
    }

    public Instrument createSystemDate(LocalDate createSystemDate) {
        this.createSystemDate = createSystemDate;
        return this;
    }

    public void setCreateSystemDate(LocalDate createSystemDate) {
        this.createSystemDate = createSystemDate;
    }

    public ZonedDateTime getCreateDate() {
        return createDate;
    }

    public Instrument createDate(ZonedDateTime createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(ZonedDateTime createDate) {
        this.createDate = createDate;
    }

    public Long getCreateUserId() {
        return createUserId;
    }

    public Instrument createUserId(Long createUserId) {
        this.createUserId = createUserId;
        return this;
    }

    public void setCreateUserId(Long createUserId) {
        this.createUserId = createUserId;
    }

    public LocalDate getLastModificationSystemDate() {
        return lastModificationSystemDate;
    }

    public Instrument lastModificationSystemDate(LocalDate lastModificationSystemDate) {
        this.lastModificationSystemDate = lastModificationSystemDate;
        return this;
    }

    public void setLastModificationSystemDate(LocalDate lastModificationSystemDate) {
        this.lastModificationSystemDate = lastModificationSystemDate;
    }

    public ZonedDateTime getLastModificationDate() {
        return lastModificationDate;
    }

    public Instrument lastModificationDate(ZonedDateTime lastModificationDate) {
        this.lastModificationDate = lastModificationDate;
        return this;
    }

    public void setLastModificationDate(ZonedDateTime lastModificationDate) {
        this.lastModificationDate = lastModificationDate;
    }

    public Long getLastModificationUserId() {
        return lastModificationUserId;
    }

    public Instrument lastModificationUserId(Long lastModificationUserId) {
        this.lastModificationUserId = lastModificationUserId;
        return this;
    }

    public void setLastModificationUserId(Long lastModificationUserId) {
        this.lastModificationUserId = lastModificationUserId;
    }

    public Currency getCurrency() {
        return currency;
    }

    public Instrument currency(Currency currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Instrument)) {
            return false;
        }
        return id != null && id.equals(((Instrument) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Instrument{" +
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
            "}";
    }
}
