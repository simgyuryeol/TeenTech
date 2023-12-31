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
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CHILD_DETAIL")
@DynamicUpdate
public class ChildDetail {

    @Id
    @Column(name = "CHILD_DETAIL_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userDetailId;

    @OneToOne
    @JoinColumn(name = "userId")
    private User user;

    @Setter
    @Column(name = "CREDIT_RATING")
    @NotNull
    @Min(1)
    @Max(10)
    @ColumnDefault("5")
    private Integer creditRating;

    @Setter
    @Column(name = "LOTTERY_COUPON")
    @ColumnDefault("0")
    private Integer lotteryCoupon;

    @Setter
    @Column(name = "QUIZ_POINT")
    @ColumnDefault("0")
    private Integer quizPoint;

    @Setter
    @Column(name = "POCKET_MONEY")
    private Integer pocketMoney;

    @Setter
    @Column(name = "POCKET_MONEY_CYCLE", columnDefinition = "TINYINT")
    private Cycle pocketMoneyCycle;

    @Setter
    @Column(name = "ALBA_SUCCESS_STREAK")
    private Integer albaSuccessStreak;

    @Setter
    @Column(name = "TOTAL_LOTTERY_PRIZE")
    private Integer totalLotteryPrize;

    @Setter
    @Column(name = "AVATAR_IMAGE_URL", length = 512)
    @Size(max = 512)
    private String avatarImageUrl;

    @Setter
    @Column(name = "DEPOSIT_INTEREST_RATE")
    private float depositInterestRate;

    @Setter
    private float loanInterestRate;

    @Setter
    @Column(name = "INDEX_NUMBER")
    private Integer index;
}
