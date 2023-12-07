package com.aakivaa.emss.utils;

import com.aakivaa.emss.models.users.Venue;

public class VenueRating {

        private final Venue venue;
        private final double rating;

        public VenueRating(Venue venue, double rating) {
            this.venue = venue;
            this.rating = rating;
        }

        public Venue getVenue() {
            return venue;
        }

        public double getRating() {
            return rating;
        }
}
