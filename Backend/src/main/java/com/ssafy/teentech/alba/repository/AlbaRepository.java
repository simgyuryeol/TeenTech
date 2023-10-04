package com.ssafy.teentech.alba.repository;

import com.ssafy.teentech.alba.domain.Alba;
import com.ssafy.teentech.alba.domain.Status;
import com.ssafy.teentech.alba.dto.response.AlbaDoneResponseDto;
import com.ssafy.teentech.user.domain.User;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AlbaRepository extends JpaRepository<Alba, Long> {

    List<Alba> getAllByUserAndStatusAndCloseDateIsAfter(User user, Status status, LocalDate now);

    List<Alba> getAllByUserAndCloseDateBefore(User user, LocalDate now);

    List<Alba> getAllByUserAndStatusIsNot(User user, Status status);

    List<Alba> getAllByUserAndStatus(User user, Status status);

    @Query("select new com.ssafy.teentech.alba.dto.response.AlbaDoneResponseDto(a.title, a.content, a.reward, a.startDate, a.closeDate, a.status) from Alba a where a.user = :user and (a.status = :giveUp or a.status = :reject or a.status = :complete or a.status = :expired)")
    List<AlbaDoneResponseDto> findAllByUserAndGiveUpOrRejectOrCompleteOrExpired(
        @Param("user") User user, @Param("giveUp") Status giveUp, @Param("reject") Status reject,
        @Param("complete") Status complete, @Param("expired") Status expired);

    @Query("select a from Alba a where a.closeDate < :now and (a.status = :post or a.status = :inProgress)")
    List<Alba> findAllByCloseDateIsBeforeAndPostOrInProgress(@Param("now") LocalDate now,
        @Param("post") Status post, @Param("inProgress") Status inProgress);
}
