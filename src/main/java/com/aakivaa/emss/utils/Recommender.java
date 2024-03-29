package com.aakivaa.emss.utils;

import com.aakivaa.emss.models.RatingsAndReviews;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.models.users.Venue;
import com.aakivaa.emss.repo.RatingAndReviewsRepo;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Recommender {
    private final RatingAndReviewsRepo ratingAndReviewsRepo;

    public Recommender(RatingAndReviewsRepo ratingAndReviewsRepo) {
        this.ratingAndReviewsRepo = ratingAndReviewsRepo;
    }

    public List<Long> getRecommendation(UserC targetUser) {


        List<RatingsAndReviews> ratingsAndReviewsList = ratingAndReviewsRepo.findAll();


        // Step 1: Identify unique users and venues
        Map<UserC, Integer> userIndexMap = new HashMap<>();
        Map<Venue, Integer> venueIndexMap = new HashMap<>();
        int userIndex = -1;
        int venueIndex = -1;

        for (RatingsAndReviews rating : ratingsAndReviewsList) {
            UserC user = rating.getUserC();
            Venue venue = rating.getVenue();

            if (!userIndexMap.containsKey(user)) {
                // If the user is not in the map, add them with an index
                userIndexMap.putIfAbsent(user, ++userIndex);
            }
            if (!venueIndexMap.containsKey(venue)) {
                // If the venue is not in the map, add it with an index
                venueIndexMap.putIfAbsent(venue, ++venueIndex);
            }
        }

        // Step 2: Create a matrix with users as rows and venues as columns
        int numUsers = userIndexMap.size();

        int numVenues = venueIndexMap.size();

//        // Check if there are not enough ratings or venues
//        if (numVenues < 1) {
//            return new Recommender.MatrixFactorizationResult(new double[0], new Matrix(0, 0), new HashMap<>());
//        }

        double[][] userItemMatrix = new double[numUsers][numVenues];


        // Step 3: Fill in the matrix with the corresponding ratings
        for (RatingsAndReviews rating : ratingsAndReviewsList) {
            UserC user = rating.getUserC();
            Venue venue = rating.getVenue();


            double userRating = rating.getRatings();
            int rowIndex = userIndexMap.get(user);
            int colIndex = venueIndexMap.get(venue);
            userItemMatrix[rowIndex][colIndex] = userRating;
        }

        // Step 4: Calculate average ratings for all users excluding venues not rated by the target user
        int targetUserIndex = userIndexMap.get(targetUser);
        double[] averageRatings = new double[numUsers];

        // Map to store venues rated by the target user
        Map<Venue, Integer> targetUserRatedVenues = new HashMap<>();

        for (int j = 0; j < numVenues; j++) {
            if (userItemMatrix[targetUserIndex][j] > 0) {
                int finalJ = j;
                targetUserRatedVenues.put(venueIndexMap.entrySet().stream()
                        .filter(entry -> entry.getValue() == finalJ)
                        .findFirst()
                        .map(Map.Entry::getKey)
                        .orElse(null), j);
            }
        }
        //calculating the total rating and the number of venues that have been rated by both the target user and the current user.
        for (int i = 0; i < numUsers; i++) {
            if (i != targetUserIndex) {
                int numRatedVenues = 0;
                double totalRating = 0.0;

                for (int j = 0; j < numVenues; j++) {
                    int finalJ = j;
                    if (targetUserRatedVenues.containsKey(venueIndexMap.entrySet().stream()
                            .filter(entry -> entry.getValue() == finalJ)
                            .findFirst()
                            .map(Map.Entry::getKey)
                            .orElse(null))) {

                        if (userItemMatrix[i][j] > 0) {
                            numRatedVenues++;
                            totalRating += userItemMatrix[i][j];
                        }
                    }
                }

                if (numRatedVenues > 0) {
                    averageRatings[i] = totalRating / numRatedVenues;
                }
            }
        }

        // Step 5: Create a new matrix with adjusted ratings (rating - averageRating)
        double[][] adjustedUserItemMatrix = new double[numUsers][targetUserRatedVenues.size()];

        for (int i = 0; i < numUsers; i++) {
            int adjustedColIndex = 0;

            for (int j = 0; j < numVenues; j++) {
                int finalJ = j;
                if (targetUserRatedVenues.containsKey(venueIndexMap.entrySet().stream()
                        .filter(entry -> entry.getValue() == finalJ)
                        .findFirst()
                        .map(Map.Entry::getKey)
                        .orElse(null))) {

                    if (userItemMatrix[i][j] > 0) {
                        adjustedUserItemMatrix[i][adjustedColIndex++] = userItemMatrix[i][j] - averageRatings[i];
                    }
                }
            }
        }

        // Step 6: Calculate cosine similarity between targetUser and all other users
        double[] targetUserVector = adjustedUserItemMatrix[targetUserIndex];
        double[] similarities = new double[numUsers];

        for (int i = 0; i < numUsers; i++) {
            if (i != targetUserIndex) {
                double[] userVector = adjustedUserItemMatrix[i];

                // Calculate cosine similarity
                double dotProduct = 0.0;
                double normTargetUser = 0.0;
                double normUser = 0.0;

                for (int j = 0; j < targetUserVector.length; j++) {
                    dotProduct += targetUserVector[j] * userVector[j];
                    normTargetUser += Math.pow(targetUserVector[j], 2);
                    normUser += Math.pow(userVector[j], 2);
                }

                double similarity = dotProduct / (Math.sqrt(normTargetUser) * Math.sqrt(normUser));
                similarities[i] = similarity;
            }
        }

        List<VenueRating> allVenueRatings = new ArrayList<>();

        // Include actual ratings for venues already rated by the target user

         targetUserIndex = userIndexMap.get(targetUser);

        for (int j = 0; j < numVenues; j++) {
            if (userItemMatrix[targetUserIndex][j] > 0) {
                int finalJ = j;
                Venue venue = venueIndexMap.entrySet().stream()
                        .filter(entry -> entry.getValue() == finalJ)
                        .findFirst()
                        .map(Map.Entry::getKey)
                        .orElse(null);

                double actualRating = userItemMatrix[targetUserIndex][j];
                allVenueRatings.add(new VenueRating(venue, actualRating));
                targetUserRatedVenues.put(venue, j);
            }
        }

        // Step 7: Predict ratings for venues not rated by targetUser
        for (int j = 0; j < numVenues; j++) {
            int finalJ = j;
            if (!targetUserRatedVenues.containsKey(venueIndexMap.entrySet().stream()
                    .filter(entry -> entry.getValue() == finalJ)
                    .findFirst()
                    .map(Map.Entry::getKey)
                    .orElse(null))) {

                double prediction = averageRatings[targetUserIndex];

                for (int i = 0; i < numUsers; i++) {
                    if (i != targetUserIndex) {
                        double cosineSimilarity = similarities[i];

                        if (cosineSimilarity > 0) {
                            double ratingUser = userItemMatrix[i][j];
                            double averageRatingUser = averageRatings[i];

                            if (ratingUser > 0) {
                                prediction += Math.abs(cosineSimilarity) * (ratingUser - averageRatingUser);
                            }
                        }
                    }
                }

                int finalJ1 = j;
                Venue venue = venueIndexMap.entrySet().stream()
                        .filter(entry -> entry.getValue() == finalJ1)
                        .findFirst()
                        .map(Map.Entry::getKey)
                        .orElse(null);

                allVenueRatings.add(new VenueRating(venue, prediction));
                System.out.println("Predicted Venue: " + venue.getId());
                System.out.println("Predicted rating  :" +prediction);
            }
        }


        System.out.println( " venues and rating before sorting :");
        for (VenueRating allVenueRating : allVenueRatings) {
            System.out.println("Venue : " + allVenueRating.getVenue().getId());
            System.out.println("Rating : " + allVenueRating.getRating());
        }

        // Sort allVenueRatings according to ratings (actual and predicted) in descending order
        allVenueRatings.sort(Comparator.comparingDouble(VenueRating::getRating).reversed());

        System.out.println( " venues and rating after sorting :");
        for (VenueRating allVenueRating : allVenueRatings) {
            System.out.println("Venue : " + allVenueRating.getVenue().getId());
            System.out.println("Rating : " + allVenueRating.getRating());
        }


        List<Long> venueIdList = new ArrayList<>();

        for(VenueRating venueRating:allVenueRatings){
            venueIdList.add(venueRating.getVenue().getId());
            System.out.println("Venue Id :" +venueIdList);
        }
        System.out.println(" Venue Id in returning " + venueIdList);
        return venueIdList;
    }
}