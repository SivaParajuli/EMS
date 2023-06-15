package com.aakivaa.emss.services.impl;

import com.aakivaa.emss.models.Admin;
import com.aakivaa.emss.repo.AdminRepo;
import com.aakivaa.emss.services.AdminService;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {
    private final AdminRepo adminRepo;

    public AdminServiceImpl(AdminRepo adminRepo) {
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

