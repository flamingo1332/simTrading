package com.project.simtrading.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.simtrading.entity.common.AuthProvider;
import com.project.simtrading.entity.common.Role;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

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


    @JsonIgnore
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @JsonIgnore
    private String providerId;



    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Account>  accounts;

    @CreationTimestamp
    private LocalDateTime dateCreated;

    @Enumerated(EnumType.STRING)
    private Role role;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Post> posts;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Like> likes;

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


//    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE) // user retireve 하자마자 role 다 fetch함
//    @JoinTable(name = "user_roles",
//            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
//    //usertable 에서 id는 pk 인데 jointable에선(user_roles) fk된다는 뜻.
//     Role enum으로 변경

}
