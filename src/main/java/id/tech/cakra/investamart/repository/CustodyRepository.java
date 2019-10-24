package id.tech.cakra.investamart.repository;
import id.tech.cakra.investamart.domain.Custody;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Custody entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustodyRepository extends JpaRepository<Custody, Long> {

}
