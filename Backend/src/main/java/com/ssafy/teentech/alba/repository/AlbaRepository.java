package com.ssafy.teentech.alba.repository;

import com.ssafy.teentech.alba.domain.Alba;
import com.ssafy.teentech.alba.domain.Status;
import com.ssafy.teentech.alba.dto.response.AlbaCompletedResponseDto;
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

    @Query("select new com.ssafy.teentech.alba.dto.response.AlbaCompletedResponseDto(a.title, a.reward, a.startDate, a.closeDate, a.content) from Alba a where a.user = :user and a.closeDate < :now and a.status = :status")
    List<AlbaCompletedResponseDto> findAllByUserAndCloseDateBeforeAndStatusOrderByStatus(
        @Param("user") User user, @Param("now") LocalDate now, @Param("status") Status status);
}
