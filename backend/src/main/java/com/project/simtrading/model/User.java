package com.project.simtrading.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.simtrading.model.common.AuthProvider;
import com.project.simtrading.model.common.Role;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false)
    private String email;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @JsonIgnore
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;


    @CreationTimestamp
    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @Enumerated(EnumType.STRING)
    private Role role;


//    public Boolean getEmailVerified() {
//        return emailVerified;
//    }
//
//    public void setEmailVerified(Boolean emailVerified) {
//        this.emailVerified = emailVerified;
//    }

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

}
