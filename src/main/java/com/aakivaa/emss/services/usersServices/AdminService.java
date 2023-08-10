package com.aakivaa.emss.services.usersServices;

import com.aakivaa.emss.models.users.Admin;

public interface AdminService {

    Admin findAdminByEmail(String adminMail);
}
