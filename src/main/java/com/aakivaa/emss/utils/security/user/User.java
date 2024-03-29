package com.aakivaa.emss.utils.security.user;

import com.aakivaa.emss.enums.Role;
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
    private Role role;

    @Transient
    private String token;
}
