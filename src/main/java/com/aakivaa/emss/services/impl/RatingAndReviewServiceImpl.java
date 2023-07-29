package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.models.VenueRatingsAndReviews;
import com.aakivaa.emss.repo.RatingAndReviewsRepo;
import com.aakivaa.emss.repo.UserCRepo;
import com.aakivaa.emss.repo.VenueRepo;
import com.aakivaa.emss.services.RatingAndReviewService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


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

    @Transactional
    @Override
    public void addRating(Venue venue, UserC user, Double rating) {
        VenueRatingsAndReviews newRating = new VenueRatingsAndReviews();
        newRating.setVenue(venue);
        newRating.setUserC(user);
        newRating.setRatings(rating);
        ratingAndReviewsRepo.save(newRating);
    }


    @Override
    public Double getAverageRating(Venue venue) {
        return ratingAndReviewsRepo.findAverageRatingByVenue(venue);
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
