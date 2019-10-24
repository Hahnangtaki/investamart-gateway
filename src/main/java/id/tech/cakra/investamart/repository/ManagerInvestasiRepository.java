package id.tech.cakra.investamart.repository;
import id.tech.cakra.investamart.domain.ManagerInvestasi;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ManagerInvestasi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ManagerInvestasiRepository extends JpaRepository<ManagerInvestasi, Long> {

}
