
package com.aakivaa.emss.utils;

import Jama.Matrix;
import Jama.SingularValueDecomposition;
import com.aakivaa.emss.models.RatingsAndReviews;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.repo.RatingAndReviewsRepo;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class RecommenderOptional {
    private final RatingAndReviewsRepo ratingAndReviewsRepo;

    public RecommenderOptional(RatingAndReviewsRepo ratingAndReviewsRepo) {
        this.ratingAndReviewsRepo = ratingAndReviewsRepo;
    }

    // Helper class to store the result of matrix factorization
    private static class MatrixFactorizationResult {
        private final double[] userFactors;
        private final Matrix venueMatrix;
        private final Map<Long, Integer> venueIndexMap;

        public MatrixFactorizationResult(double[] userFactors, Matrix venueMatrix, Map<Long, Integer> venueIndexMap) {
            this.userFactors = userFactors;
            this.venueMatrix = venueMatrix;
            this.venueIndexMap = venueIndexMap;
        }

        public double[] getUserFactors() {
            return userFactors;
        }

        public Matrix getVenueMatrix() {
            return venueMatrix;
        }

        public Map<Long, Integer> getVenueIndexMap() {
            return venueIndexMap;
        }
    }

    // Perform matrix factorization
    private MatrixFactorizationResult matrixFactorization(Long userId) {
        List<RatingsAndReviews> userRatings = ratingAndReviewsRepo.findAll();

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

        // Check if there are not enough ratings or venues
        if (numVenues < 1) {
            return new MatrixFactorizationResult(new double[0], new Matrix(0, 0), new HashMap<>());
        }


        // Initialize the ratings matrix
        double[][] ratingsMatrix = new double[numUsers][numVenues];

        // Populate the ratings matrix
        for (RatingsAndReviews rating : userRatings) {
            long uId = rating.getUserC().getId();
            long vId = rating.getVenue().getId();

            int userIndex = userIndexMap.get(uId);
            int venueIndex = venueIndexMap.get(vId);

            ratingsMatrix[userIndex][venueIndex] = rating.getRatings();
        }

        // Perform Singular Value Decomposition
        Matrix matrix = new Matrix(ratingsMatrix);
        SingularValueDecomposition svd = matrix.svd();

        // Threshold for considering singular values
        double threshold = 1;

        // Matrices from SVD
        Matrix userMatrix = svd.getU();
        Matrix singularValues = svd.getS();
        Matrix venueMatrix = svd.getV();


// Ensure that singular values array length matches the number of factors
        int validSingularValues = Math.min(singularValues.getRowDimension(), singularValues.getColumnDimension());

// Debugging information
        System.out.println("Number of valid singular values: " + validSingularValues);

// Initialize the reconstructed matrix
        Matrix reconstructedMatrix = new Matrix(numUsers, numVenues);

// Debugging information
        System.out.println("Reconstructed matrix dimensions: " +
                reconstructedMatrix.getRowDimension() + " x " + reconstructedMatrix.getColumnDimension());

// Reconstruct the matrix using valid singular values and vectors
        for (int i = 0; i < validSingularValues; i++) {
            double value = singularValues.get(i, i);
            if (value >= threshold) {
                Matrix userPart = userMatrix.getMatrix(0, userMatrix.getRowDimension() - 1, i, i);
                Matrix singularPart = new Matrix(1, 1);
                singularPart.set(0, 0, value);
                Matrix venuePart = venueMatrix.getMatrix(0, venueMatrix.getRowDimension() - 1, i, i);

                // Perform matrix multiplication
                Matrix product = userPart.times(singularPart).times(venuePart.transpose());  // Transpose venuePart

                // Add the product to the reconstructed matrix
                reconstructedMatrix.plusEquals(product);
            }
        }

// Debugging information
        System.out.println("Reconstructed matrix after SVD: ");
        reconstructedMatrix.print(5, 5);


        int userIndex = userIndexMap.get(userId);
        double[] userFactors = reconstructedMatrix.getArray()[userIndex];

        return new MatrixFactorizationResult(userFactors, venueMatrix, venueIndexMap);
    }

    // Get venue recommendations for a user
    public List<Long> getRecommendation(UserC user) {
        MatrixFactorizationResult factorizationResult = matrixFactorization(user.getId());

        Map<Long, Double> venueScores = new HashMap<>();
        Matrix venueMatrix = factorizationResult.getVenueMatrix();

        // Calculate scores for each venue based on user factors and venue matrix
        for (long venueId : factorizationResult.getVenueIndexMap().keySet()) {
            int venueIndex = factorizationResult.getVenueIndexMap().get(venueId);
            double score = 0.0;

            for (int i = 0; i < factorizationResult.getUserFactors().length; i++) {
                double factor = factorizationResult.getUserFactors()[i];
                score += factor * venueMatrix.get(venueIndex, i);
            }

            venueScores.put(venueId, score);
        }

        // Sort venues by score in descending order
        List<Map.Entry<Long, Double>> sortedVenues = new ArrayList<>(venueScores.entrySet());
        sortedVenues.sort((v1, v2) -> Double.compare(v2.getValue(), v1.getValue()));

        // Select top venues as recommendations
        List<Long> recommendations = new ArrayList<>();
        for (int i = 0; i < Math.min(10, sortedVenues.size()); i++) {
            recommendations.add(sortedVenues.get(i).getKey());
        }

        return recommendations;
    }
}

