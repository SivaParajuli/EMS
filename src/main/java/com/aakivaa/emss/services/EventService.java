package com.aakivaa.emss.services;

import com.aakivaa.emss.models.Event;
import com.aakivaa.emss.models.users.UserC;

import java.util.List;

public interface EventService {

    Event addEvent(UserC user, Event evt);

    List<Event> getEvents();

    Integer updateVenueStatus(Integer status, Long id);
}
