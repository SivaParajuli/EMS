package com.aakivaa.emss.services;

import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.models.RatingsAndReviews;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;

import java.util.List;

public interface RatingAndReviewService {

    RatingsAndReviews addRating(UserC user,Venue venue, RatingsAndReviews rating);

    Double getAverageRating(Venue venue);

    List<RatingsAndReviews> getRatingAndReviewsById(Long id);

    RatingsAndReviews review(Long vid, Long id, RatingsAndReviews reviews);
}
