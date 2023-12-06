package com.aakivaa.emss.utils;

import com.aakivaa.emss.repo.RatingAndReviewsRepo;
import org.apache.mahout.cf.taste.impl.neighborhood.ThresholdUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.CityBlockSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.UserBasedRecommender;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class RecommenderOptional {

    private final RatingAndReviewsRepo ratingAndReviewsRepo;

    public RecommenderOptional(RatingAndReviewsRepo ratingAndReviewsRepo) {
        this.ratingAndReviewsRepo = ratingAndReviewsRepo;
    }


        public List<RecommendedItem> getRecommendations (Long id) {
        DataModel userRatings = (DataModel) ratingAndReviewsRepo.findAll();
        try{
        CityBlockSimilarity similarity = new CityBlockSimilarity(userRatings);
        UserNeighborhood neighborhood = new ThresholdUserNeighborhood(0.1, similarity, userRatings);
        UserBasedRecommender recommender = new GenericUserBasedRecommender(userRatings, neighborhood, similarity);

        // UserID and number of items to be recommended
        List<RecommendedItem> recommended_items = recommender.recommend(id, 5);

        for (RecommendedItem r : recommended_items) {
            System.out.println(r);
        }
        return recommended_items;
    }catch(Exception e){
            System.out.println("Some error occured..."+ e);
            return new ArrayList<>();
        }

    }
}



