package com.aakivaa.emss.services;

import com.aakivaa.emss.models.RatingsAndReviews;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;

import javax.transaction.Transactional;

public interface RatingAndReviewService {

    @Transactional
    Integer addRating(Venue venue, UserC user, Double rating);

    Double getAverageRating(Venue venue);

    RatingsAndReviews reviewOfVenue(Long vid, Long id, RatingsAndReviews reviews);

}
