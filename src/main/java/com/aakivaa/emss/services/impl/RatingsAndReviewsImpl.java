package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.models.RatingsAndReviews;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.repo.RatingAndReviewsRepo;
import com.aakivaa.emss.repo.usersRepo.UserCRepo;
import com.aakivaa.emss.repo.usersRepo.VenueRepo;
import com.aakivaa.emss.services.RatingAndReviewService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class RatingsAndReviewsImpl implements RatingAndReviewService {

    private final UserCRepo userCRepo;
    private final VenueRepo venueRepo;
    private final RatingAndReviewsRepo ratingAndReviewsRepo;

    public RatingsAndReviewsImpl(UserCRepo userCRepo, VenueRepo venueRepo, RatingAndReviewsRepo ratingAndReviewsRepo) {
        this.userCRepo = userCRepo;
        this.venueRepo = venueRepo;
        this.ratingAndReviewsRepo = ratingAndReviewsRepo;
    }

    @Transactional
    @Override
    public RatingsAndReviews addRating(UserC user ,Venue venue, RatingsAndReviews rating) {
        RatingsAndReviews newRating = RatingsAndReviews.builder()
                .userC(user)
                .venue(venue)
                .reviews(rating.getReviews())
                .ratings(rating.getRatings())
                .build();
        newRating = ratingAndReviewsRepo.save(newRating);
        return RatingsAndReviews.builder()
                .ratings(newRating.getRatings())
                .reviews(newRating.getReviews())
                .build();
    }

    public List<RatingsAndReviews> getRatingAndReviewsById(Long id){
        List<RatingsAndReviews> ratingsAndReviews = ratingAndReviewsRepo.getReviewsAndRatings(id);
        return ratingsAndReviews.stream().map(entity -> RatingsAndReviews.builder()
                .ratings(entity.getRatings())
                .reviews(entity.getReviews())
                .userC(entity.getUserC())
                .build()).collect(Collectors.toList());
    }


    @Override
    public Double getAverageRating(Venue venue) {
        return ratingAndReviewsRepo.findAverageRatingByVenue(venue);
    }

    @Override
    public com.aakivaa.emss.models.RatingsAndReviews review(Long vid, Long id, com.aakivaa.emss.models.RatingsAndReviews reviews) {
        UserC userC = userCRepo.getById(id);
        Venue venue = venueRepo.getById(vid);
        com.aakivaa.emss.models.RatingsAndReviews entity = com.aakivaa.emss.models.RatingsAndReviews.builder()
                .venue(venue)
                .userC(userC)
                .reviews(reviews.getReviews())
                .build();
        entity = ratingAndReviewsRepo.save(entity);
        return com.aakivaa.emss.models.RatingsAndReviews.builder()
                .reviews(entity.getReviews())
                .venue(entity.getVenue())
                .build();
    }
}
