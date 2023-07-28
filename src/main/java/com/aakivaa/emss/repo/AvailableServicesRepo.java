package com.aakivaa.emss.repo;

import com.aakivaa.emss.models.Events;
import com.aakivaa.emss.models.functionsAndServices.AvailableServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvailableServicesRepo extends JpaRepository<AvailableServices,Long> {
}
