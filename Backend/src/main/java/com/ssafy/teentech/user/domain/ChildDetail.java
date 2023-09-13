package com.ssafy.teentech.user.domain;

import com.ssafy.teentech.common.util.Cycle;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CHILD_DETAIL")
public class ChildDetail {

    @Id
    @Column(name = "CHILD_DETAIL_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userDetailId;

    @OneToOne
    @JoinColumn(name = "userId")
    private User user;

    @Column(name = "CREDIT_RATING")
    @NotNull
    @Min(1)
    @Max(10)
    @ColumnDefault("1")
    private Integer creditRating;

    @Column(name = "LOTTERY_COUPON")
    @ColumnDefault("0")
    private Integer lotteryCoupon;

    @Column(name = "QUIZ_POINT")
    @ColumnDefault("0")
    private Integer quizPoint;

    @Column(name = "POCKET_MONEY")
    private Integer pocketMoney;

    @Column(name = "POCKET_MONEY_CYCLE", columnDefinition = "TINYINT")
    private Cycle pocketMoneyCycle;

    @Column(name = "ALBA_SUCCESS_STREAK")
    private Integer albaSuccessStreak;

    @Column(name = "TOTAL_LOTTERY_PRIZE")
    private Integer totalLotteryPrize;

    @Column(name = "AVATAR_IMAGE_URL", length = 512)
    @Size(max = 512)
    private String avatarImageUrl;
}
