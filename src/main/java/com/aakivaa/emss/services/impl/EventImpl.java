package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.enums.Status;
import com.aakivaa.emss.models.Event;
import com.aakivaa.emss.models.users.UserC;
import com.aakivaa.emss.repo.EventRepo;
import com.aakivaa.emss.services.EventService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventImpl implements EventService {

    private final EventRepo eventRepo;

    public EventImpl(EventRepo eventRepo) {
        this.eventRepo = eventRepo;
    }

    @Override
    public Event addEvent(UserC user, Event evt) {
        Event entity = Event.builder()
                .eventType(evt.getEventType())
                .centerOfAttractions(evt.getCenterOfAttractions())
                .location(evt.getLocation())
                .dateTime(evt.getDateTime())
                .mainGuest(evt.getMainGuest())
                .sponsored(evt.getSponsored())
                .status(Status.PENDING)
                .user(user)
                .build();
        entity = eventRepo.save(entity);
        return Event.builder()
                .eventType(entity.getEventType())
                .mainGuest(entity.getMainGuest())
                .build();
    }

    @Override
    public List<Event> getEvents() {
        return eventRepo.getEventContaining(Status.PENDING);
        }

        @Override
        public Integer updateVenueStatus(Integer status, Long id) {
            Optional<Event> event = eventRepo.findById(id);
            if (status == 0) {
                if (event.isPresent())
                    return eventRepo.updateStatus(Status.VERIFIED, id);
            }
            if(status == 1)
                return eventRepo.updateStatus(Status.DELETED, id);
            return null;
        }
}
