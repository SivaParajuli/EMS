package com.aakivaa.emss.utils;

import Jama.Matrix;
import Jama.SingularValueDecomposition;
import com.aakivaa.emss.enums.Status;
import com.aakivaa.emss.models.RatingsAndReviews;
import com.aakivaa.emss.repo.RatingAndReviewsRepo;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Recommender {
    private final RatingAndReviewsRepo ratingAndReviewsRepo;

    public Recommender(RatingAndReviewsRepo ratingAndReviewsRepo) {
        this.ratingAndReviewsRepo = ratingAndReviewsRepo;
    }

    private MatrixFactorizationResult matrixFactorization(Long userId) {
        List<RatingsAndReviews> userRatings = ratingAndReviewsRepo.findUserCById(userId, Status.VERIFIED);

        // Build the user-item rating matrix
        int numUsers = 0;
        int numVenues = 0;
        Map<Long, Integer> userIndexMap = new HashMap<>();
        Map<Long, Integer> venueIndexMap = new HashMap<>();

        for (RatingsAndReviews rating : userRatings) {
            long uId = rating.getUserC().getId();
            long vId = rating.getVenue().getId();

            if (!userIndexMap.containsKey(uId)) {
                userIndexMap.put(uId, numUsers++);
            }
            if (!venueIndexMap.containsKey(vId)) {
                venueIndexMap.put(vId, numVenues++);
            }
        }

        if (numUsers == 0 || numVenues == 0) {
            // Return default result or handle the case when there are no ratings or venues
            return new MatrixFactorizationResult(new double[0], new Matrix(0, 0), new HashMap<>());
        }

        double[][] ratingsMatrix = new double[numUsers][numVenues];

        for (RatingsAndReviews rating : userRatings) {
            long uId = rating.getUserC().getId();
            long vId = rating.getVenue().getId();

            int userIndex = userIndexMap.get(uId);
            int venueIndex = venueIndexMap.get(vId);

            ratingsMatrix[userIndex][venueIndex] = rating.getRatings();
        }

        Matrix matrix = new Matrix(ratingsMatrix);
        SingularValueDecomposition svd = matrix.svd();

        // Adjust this threshold value based on the dataset
        double threshold = 1;
        Matrix userMatrix = svd.getU();
        Matrix singularValues = svd.getS();
        Matrix venueMatrix = svd.getV();

        for (int i = 0; i < Math.min(singularValues.getRowDimension(), singularValues.getColumnDimension()); i++) {
            double value = singularValues.get(i, i);
            if (value < threshold) {
                singularValues.set(i, i, 0.0);
            }
        }

        Matrix reconstructedMatrix = userMatrix.times(singularValues).times(venueMatrix.transpose());

        int userIndex = userIndexMap.get(userId);
        int numFactors = Math.min(numUsers, numVenues);
        double[] userFactors = new double[numFactors];
        for (int i = 0; i < numFactors; i++) {
            userFactors[i] = reconstructedMatrix.get(userIndex, i);
        }

        return new MatrixFactorizationResult(userFactors, venueMatrix, venueIndexMap);
    }

    public List<Long> getVenueRecommendations(Long userId, int numRecommendations) {
        MatrixFactorizationResult factorizationResult = matrixFactorization(userId);

        Map<Long, Double> venueScores = new HashMap<>();
        Matrix venueMatrix = factorizationResult.getVenueMatrix();

        for (long venueId : factorizationResult.getVenueIndexMap().keySet()) {
            int venueIndex = factorizationResult.getVenueIndexMap().get(venueId);
            double score = 0.0;

            for (int i = 0; i < factorizationResult.getUserFactors().length; i++) {
                double factor = factorizationResult.getUserFactors()[i];
                score += factor * venueMatrix.get(venueIndex, i);
            }

            venueScores.put(venueId, score);
        }

        List<Map.Entry<Long, Double>> sortedVenues = new ArrayList<>(venueScores.entrySet());
        sortedVenues.sort((v1, v2) -> Double.compare(v2.getValue(), v1.getValue()));

        List<Long> recommendations = new ArrayList<>();
        for (int i = 0; i < Math.min(numRecommendations, sortedVenues.size()); i++) {
            recommendations.add(sortedVenues.get(i).getKey());
        }

        return recommendations;
    }
}
