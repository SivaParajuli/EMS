package com.aakivaa.emss.repo;

import com.aakivaa.emss.models.PricingForBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PricingForBookingRepo extends JpaRepository<PricingForBooking,Long> {
}
