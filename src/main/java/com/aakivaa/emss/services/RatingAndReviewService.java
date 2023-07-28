package com.aakivaa.emss.services;

import com.aakivaa.emss.models.VenueRatingsAndReviews;

import java.io.IOException;

public interface RatingAndReviewService {

    VenueRatingsAndReviews rateVenue(int rating, Long vid, Long id) throws IOException;

    VenueRatingsAndReviews reviewOfVenue(Long vid, Long id, VenueRatingsAndReviews reviews);

}
