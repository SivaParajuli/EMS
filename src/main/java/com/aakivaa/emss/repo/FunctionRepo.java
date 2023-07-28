package com.aakivaa.emss.repo;

import com.aakivaa.emss.models.EventsCostRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FunctionRepo extends JpaRepository<EventsCostRate, Long> {

}
