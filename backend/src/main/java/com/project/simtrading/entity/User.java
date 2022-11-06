package com.project.simtrading.entity;

import com.project.simtrading.common.AuthProvider;
import com.project.simtrading.common.Role;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"username"}),
        @UniqueConstraint(columnNames = {"email"})
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column(unique = true)
//    private String oAuthId;

    @Column(name = "username")
    private String username;

    @Column(unique = true, name = "email")
    private String email;

    @Column(name = "image")
    private String image;

//    @Column(name = "password") OAuth2 소셜로그인 대체
//    private String password;

    @CreationTimestamp
    @Column(name = "date_created")
    private LocalDateTime dateCreated;
    @UpdateTimestamp
    @Column(name = "date_updated")
    private LocalDateTime dateUpdated;
//    @Column(name = "verification_code", length = 64) //emailVerification 안씀
//    private String verificationCode;
//    private boolean enabled;


//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private Set<Post> posts;

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private Set<Comment> comments;


//    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE) // user retireve 하자마자 role 다 fetch함
//    @JoinTable(name = "user_roles",
//            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
//    //usertable 에서 id는 pk 인데 jointable에선(user_roles) fk된다는 뜻.
//     Role enum으로 변경

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    private String refreshToken;
}
