package com.aakivaa.emss.models;

import com.aakivaa.emss.enums.ApplicationUserRole;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="tbl_admin",uniqueConstraints = {
        @UniqueConstraint(name="unique_admin_email",columnNames = "email")
})
public class Admin implements Serializable {

    @Id
    private Integer id;

    @Column(name = "username", length = 200,nullable = false)
    private String name;

    @Column(name = "email", length = 100,nullable = false)
    private String email;

    @Column(name = "password", length = 100 ,nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private ApplicationUserRole applicationUserRole;

}

