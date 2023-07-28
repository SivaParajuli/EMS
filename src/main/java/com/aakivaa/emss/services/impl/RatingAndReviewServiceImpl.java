package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.models.VenueRatingsAndReviews;
import com.aakivaa.emss.repo.RatingAndReviewsRepo;
import com.aakivaa.emss.repo.UserCRepo;
import com.aakivaa.emss.repo.VenueRepo;
import com.aakivaa.emss.services.RatingAndReviewService;
import org.springframework.stereotype.Service;


@Service
public class RatingAndReviewServiceImpl implements RatingAndReviewService {

    private final UserCRepo userCRepo;
    private final VenueRepo venueRepo;
    private final RatingAndReviewsRepo ratingAndReviewsRepo;

    public RatingAndReviewServiceImpl(UserCRepo userCRepo, VenueRepo venueRepo, RatingAndReviewsRepo ratingAndReviewsRepo) {
        this.userCRepo = userCRepo;
        this.venueRepo = venueRepo;
        this.ratingAndReviewsRepo = ratingAndReviewsRepo;
    }

    @Override
    public VenueRatingsAndReviews rateVenue(int rating, Long vid, Long id)  {
        venueRepo.updateTotalRatings(rating + venueRepo.getTotalRatings(vid),vid);
        venueRepo.updateNumberOfRatedClients(1+venueRepo.getNumberOfRatedClients(vid),vid);

        UserC userC = userCRepo.getById(id);
        Venue venue = venueRepo.getById(vid);

        VenueRatingsAndReviews entity = VenueRatingsAndReviews.builder()
                .venue(venue)
                .userC(userC)
                .ratings(rating)
                .build();
        entity = ratingAndReviewsRepo.save(entity);
       return VenueRatingsAndReviews.builder()
               .ratings(entity.getRatings())
               .venue(entity.getVenue())
               .build();
    }

    @Override
    public VenueRatingsAndReviews reviewOfVenue(Long vid, Long id,  VenueRatingsAndReviews reviews) {
        UserC userC = userCRepo.getById(id);
        Venue venue = venueRepo.getById(vid);
        VenueRatingsAndReviews entity = VenueRatingsAndReviews.builder()
                .venue(venue)
                .userC(userC)
                .reviews(reviews.getReviews())
                .build();
        entity = ratingAndReviewsRepo.save(entity);
        return VenueRatingsAndReviews.builder()
                .reviews(entity.getReviews())
                .venue(entity.getVenue())
                .build();
    }
}
