package com.aakivaa.emss.repo;

import com.aakivaa.emss.enums.Status;
import com.aakivaa.emss.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepo extends JpaRepository<Event,Long> {

    @Query("select e from Event e where e.status = :s")
    List<Event> getEventContaining(@Param("s") Status status);

    @Modifying
    @Query("update Event  e set e.status = :s where e.id =:i")
    Integer updateStatus(@Param("s") Status status, @Param("i") Long id);
}
