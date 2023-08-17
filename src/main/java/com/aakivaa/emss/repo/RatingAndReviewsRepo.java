package com.aakivaa.emss.repo;

import com.aakivaa.emss.enums.Status;
import com.aakivaa.emss.models.RatingsAndReviews;
import com.aakivaa.emss.models.users.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface RatingAndReviewsRepo extends JpaRepository<RatingsAndReviews,Long> {

    @Query(value="SELECT vr from RatingsAndReviews vr join vr.venue v where v.status= :s and vr.userC.id = :i ")
    List<RatingsAndReviews> findUserCById(@Param("i") Long userId, @Param("s") Status status);


    @Transactional
    @Query("SELECT AVG(r.ratings) FROM RatingsAndReviews r WHERE r.venue = :venue")
    Double findAverageRatingByVenue(@Param("venue") Venue venue);

   @Query("select r.reviews from RatingsAndReviews r WHERE r.venue= :v")
    List<String>getReviews(@Param("v") Venue venue);

    @Query(value="SELECT r from RatingsAndReviews r  where r.venue.id = :i ")
    List<RatingsAndReviews> getReviewsAndRatings(@Param("i") Long id);

}
