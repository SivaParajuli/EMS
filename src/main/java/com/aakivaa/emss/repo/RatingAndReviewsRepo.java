package com.aakivaa.emss.repo;

import com.aakivaa.emss.enums.VenueStatus;
import com.aakivaa.emss.models.RatingsAndReviews;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface RatingAndReviewsRepo extends JpaRepository<RatingsAndReviews,Long> {

    @Query(value="SELECT vr from RatingsAndReviews vr join vr.venue v where v.venueStatus= :s and vr.userC.id = :i ")
    List<RatingsAndReviews> findUserCById(@Param("i") Long userId, @Param("s") VenueStatus venueStatus);


    @Transactional
    @Query("SELECT AVG(r.ratings) FROM RatingsAndReviews r WHERE r.venue = :venue")
    Double findAverageRatingByVenue(@Param("venue") Venue venue);

    @Transactional
    @Query("SELECT r.ratings FROM RatingsAndReviews r WHERE r.venue = :venue AND r.userC = :user")
    Integer findUserRatingByVenueAndUser(@Param("venue") Venue venue, @Param("user") UserC user);

}
