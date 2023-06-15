package com.aakivaa.emss.services;

import com.aakivaa.emss.models.Admin;

public interface AdminService {

    Admin findAdminByEmail(String adminMail);
}
