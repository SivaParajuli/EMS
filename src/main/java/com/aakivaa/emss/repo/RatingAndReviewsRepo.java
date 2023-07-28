package com.aakivaa.emss.repo;

import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.VenueRatingsAndReviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingAndReviewsRepo extends JpaRepository<VenueRatingsAndReviews,Long> {

    @Query(value="SELECT vr.userC  from VenueRatingsAndReviews vr join vr.venue v where v.venueStatus= :s and vr.userC.id = :i ")
    List<VenueRatingsAndReviews> findUserCById(@Param("i") Long userId, @Param("s") VenueStatus venueStatus);
}
