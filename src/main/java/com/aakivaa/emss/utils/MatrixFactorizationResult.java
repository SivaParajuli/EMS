package com.aakivaa.emss.utils;

import Jama.Matrix;
import java.util.Map;

public class MatrixFactorizationResult {

        private double[] userFactors;
        private Matrix venueMatrix;
        private Map<Long, Integer> venueIndexMap;

        public MatrixFactorizationResult(double[] userFactors, Matrix venueMatrix, Map<Long, Integer> venueIndexMap) {
            this.userFactors = userFactors;
            this.venueMatrix = venueMatrix;
            this.venueIndexMap = venueIndexMap;
        }

        public double[] getUserFactors() {
            return userFactors;
        }

        public void setUserFactors(double[] userFactors) {
            this.userFactors = userFactors;
        }

        public Matrix getVenueMatrix() {
            return venueMatrix;
        }

        public void setVenueMatrix(Matrix venueMatrix) {
            this.venueMatrix = venueMatrix;
        }

        public Map<Long, Integer> getVenueIndexMap() {
            return venueIndexMap;
        }

        public void setVenueIndexMap(Map<Long, Integer> venueIndexMap) {
            this.venueIndexMap = venueIndexMap;
        }
}

