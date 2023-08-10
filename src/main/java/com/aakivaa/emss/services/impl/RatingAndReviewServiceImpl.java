package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.models.RatingsAndReviews;
import com.aakivaa.emss.repo.RatingAndReviewsRepo;
import com.aakivaa.emss.repo.usersRepo.UserCRepo;
import com.aakivaa.emss.repo.usersRepo.VenueRepo;
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
    public Integer addRating(Venue venue, UserC user, Double rating) {
        RatingsAndReviews newRating = new RatingsAndReviews();
        newRating.setVenue(venue);
        newRating.setUserC(user);
        newRating.setRatings(rating);
        ratingAndReviewsRepo.save(newRating);
        return 1;
    }


    @Override
    public Double getAverageRating(Venue venue) {
        return ratingAndReviewsRepo.findAverageRatingByVenue(venue);
    }

    @Override
    public RatingsAndReviews reviewOfVenue(Long vid, Long id, RatingsAndReviews reviews) {
        UserC userC = userCRepo.getById(id);
        Venue venue = venueRepo.getById(vid);
        RatingsAndReviews entity = RatingsAndReviews.builder()
                .venue(venue)
                .userC(userC)
                .reviews(reviews.getReviews())
                .build();
        entity = ratingAndReviewsRepo.save(entity);
        return RatingsAndReviews.builder()
                .reviews(entity.getReviews())
                .venue(entity.getVenue())
                .build();
    }
}
