package com.ssafy.teentech.user.domain;

import com.ssafy.teentech.common.entity.BaseEntity;
import com.ssafy.teentech.common.util.Role;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER")
public class User extends BaseEntity {

    @Id
    @Column(name = "USER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "PARENT_ID")
    @Setter
    private Long parentId;

    @Column(name = "OAUTH_ID", unique = true)
    @NotNull
    private String oauthId;

    @Column(name = "USERNAME", length = 100)
    @Size(max = 100)
    private String username;

    @Column(name = "NICKNAME")
    @NotNull
    @Size(max = 100)
    private String nickname;

    @Column(name = "EMAIL", length = 512)
    @NotNull
    @Size(max = 512)
    private String email;

    @Column(name = "BALANCE")
    private Integer balance;

    @Column(name = "INVITE_CODE")
    private String inviteCode;

    @Column(name = "PROFILE_IMAGE_URL", length = 512)
    @Size(max = 512)
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User(
        @NotNull String oauthId,
        @NotNull @Size(max = 100) String nickname,
        @NotNull @Size(max = 512) String email,
        @Size(max = 512) String profileImageUrl,
        Role role
    ) {
        this.oauthId = oauthId;
        this.nickname = nickname;
        this.email = email != null ? email : "NO_EMAIL";
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.role = role;
    }

}
