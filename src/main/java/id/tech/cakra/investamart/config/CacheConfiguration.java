package id.tech.cakra.investamart.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, id.tech.cakra.investamart.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, id.tech.cakra.investamart.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, id.tech.cakra.investamart.domain.User.class.getName());
            createCache(cm, id.tech.cakra.investamart.domain.Authority.class.getName());
            createCache(cm, id.tech.cakra.investamart.domain.User.class.getName() + ".authorities");
            createCache(cm, id.tech.cakra.investamart.domain.GlobalParameter.class.getName());
            createCache(cm, id.tech.cakra.investamart.domain.Currency.class.getName());
            createCache(cm, id.tech.cakra.investamart.domain.Currency.class.getName() + ".instruments");
            createCache(cm, id.tech.cakra.investamart.domain.Instrument.class.getName());
            createCache(cm, id.tech.cakra.investamart.domain.City.class.getName());
            createCache(cm, id.tech.cakra.investamart.domain.Country.class.getName());
            createCache(cm, id.tech.cakra.investamart.domain.Country.class.getName() + ".provinces");
            createCache(cm, id.tech.cakra.investamart.domain.Province.class.getName());
            createCache(cm, id.tech.cakra.investamart.domain.Province.class.getName() + ".cities");
            createCache(cm, id.tech.cakra.investamart.domain.Tax.class.getName());
            createCache(cm, id.tech.cakra.investamart.domain.Bank.class.getName());
            createCache(cm, id.tech.cakra.investamart.domain.Custody.class.getName());
            createCache(cm, id.tech.cakra.investamart.domain.ManagerInvestasi.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }

}
