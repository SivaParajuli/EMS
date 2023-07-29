package com.aakivaa.emss.services;

import com.aakivaa.emss.models.VenueRatingsAndReviews;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;

import javax.transaction.Transactional;
import java.io.IOException;

public interface RatingAndReviewService {

    @Transactional
    void addRating(Venue venue, UserC user, Double rating);

    Double getAverageRating(Venue venue);

    VenueRatingsAndReviews reviewOfVenue(Long vid, Long id, VenueRatingsAndReviews reviews);

}
