package com.aakivaa.emss.utils;
import com.aakivaa.emss.dto.EventsCostCalculation;
import com.aakivaa.emss.enums.EventType;
import com.aakivaa.emss.repo.VenueRepo;
import org.springframework.stereotype.Component;

@Component
public class BookingUtils {
   private final VenueRepo venueRepo;

    public BookingUtils(VenueRepo venueRepo) {
        this.venueRepo = venueRepo;
    }

    public EventType getEvent(String event) {
        EventType eventType = null;
        switch (event) {
            case "Marriage":
                eventType = EventType.MARRIAGE;
            break;

            case "Conclave":
                eventType = EventType.CONCLAVE;
            break;

            case "College Function":
               eventType = EventType.COLLEGE_EVENT;
            break;

            case "Annual Meet":
                eventType = EventType.ANNUAL_MEET;
            break;

            case "Family Party":
                eventType = EventType.FAMILY_PARTY;
            break;
        }
        return eventType;
    }


    public Double calculatePayment(Double rate , Double baseCost , Integer requiredCapacity) {


            if (requiredCapacity <= 100){
                return baseCost;
            }
            else if (requiredCapacity <= 150) {
                return (baseCost + (baseCost * rate / 100));
            }
            else if (requiredCapacity <= 200) {
                return (baseCost + (baseCost * (rate + 15) / 100));
            }
            else if (requiredCapacity <= 250) {
                return (baseCost + (baseCost * (rate + 30) / 100));
            }
            else if (requiredCapacity <= 300) {
                return (baseCost + (baseCost * (rate + 40) / 100));
            }
            else if (requiredCapacity <= 350) {
                return (baseCost + (baseCost * (rate + 50) / 100));
            }
            else if (requiredCapacity <= 400) {
                return (baseCost + (baseCost * (rate + 70) / 100));
            }
            else if (requiredCapacity <= 450) {
                return (baseCost + (baseCost * (rate + 90) / 100));
            }
            else if (requiredCapacity <= 500) {
                return (baseCost + (baseCost * (rate + 120) / 100));
            }
            else
                return (baseCost + (baseCost * (rate + 200) / 100));
        }

    public Double getCost(String event,String vEmail) {

        Double cost = null;
        EventsCostCalculation eventsCostAndRate = venueRepo.getRateCost(vEmail);
        switch (event) {
            case "Marriage":
               cost = eventsCostAndRate.getMarriage();
               break;
            case "Conclave":
                cost = eventsCostAndRate.getConclave();
                break;
            case "College Function":
                cost = eventsCostAndRate.getCollegeEvent();
                break;
            case "Annual Meet":
               cost = eventsCostAndRate.getAnnualMeet();
               break;
            case "Family Party":
                cost = eventsCostAndRate.getFamilyParty();
                break;
        }
        return cost;
    }
}
