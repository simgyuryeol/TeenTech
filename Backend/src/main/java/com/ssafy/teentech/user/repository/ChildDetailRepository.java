package com.ssafy.teentech.user.repository;

import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.dto.response.CreditAndInterestResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChildDetailRepository extends JpaRepository<ChildDetail,Long> {
    Optional<ChildDetail> findByUser(User user);

    @Query("select new com.ssafy.teentech.user.dto.response.CreditAndInterestResponseDto(cd.albaSuccessStreak, cd.creditRating, cd.depositInterestRate, cd.loanInterestRate) from ChildDetail cd where cd.user = :user")
    CreditAndInterestResponseDto findCreditAndInterestByUser(@Param("user") User user);
}
