package com.aakivaa.emss.services.impl.usersImpl;

import com.aakivaa.emss.models.users.Admin;
import com.aakivaa.emss.repo.usersRepo.AdminRepo;
import com.aakivaa.emss.services.usersServices.AdminService;
import org.springframework.stereotype.Service;

@Service
public class AdminImpl implements AdminService {
    private final AdminRepo adminRepo;

    public AdminImpl(AdminRepo adminRepo) {
            this.adminRepo = adminRepo;
        }

        @Override
        public Admin findAdminByEmail(String adminMail) {
            Admin admin= adminRepo.findAdminByEmail(adminMail);
            if (admin != null){
                return Admin.builder()
                        .name(admin.getName())
                        .email(admin.getEmail())
                        .build();
            }
            return null;
        }

}

