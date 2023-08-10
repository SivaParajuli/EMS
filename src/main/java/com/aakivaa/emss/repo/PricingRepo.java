package com.aakivaa.emss.repo;

import com.aakivaa.emss.models.Pricing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PricingRepo extends JpaRepository<Pricing,Long> {

    @Query(value = "SELECT p from Pricing p where p.venue.id= :i")
    List<Pricing> getAllPricing(@Param("i") Long id);
}
