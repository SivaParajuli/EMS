package com.aakivaa.emss.security.user;

import com.aakivaa.emss.enums.ApplicationUserRole;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tbl_user")
public class User implements Serializable {
    @Id
    @SequenceGenerator(name = "user_id_sequence", sequenceName = "user_id_sequence")
    @GeneratedValue(generator = "user_id_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "name", length = 100)
    private String uname;

    @Column(name = "password", length = 200)
    private String password;

    @Enumerated(EnumType.STRING)
    private ApplicationUserRole applicationUserRole;

    @Transient
    private String token;
}
