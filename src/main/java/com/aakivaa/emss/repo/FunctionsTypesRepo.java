package com.aakivaa.emss.repo;

import com.aakivaa.emss.models.functionsAndServices.FunctionTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FunctionsTypesRepo extends JpaRepository<FunctionTypes,Long> {
}
