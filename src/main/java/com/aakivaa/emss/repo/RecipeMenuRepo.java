package com.aakivaa.emss.repo;

import com.aakivaa.emss.models.functionsAndServices.RecipeMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeMenuRepo extends JpaRepository<RecipeMenu,Long> {
}
