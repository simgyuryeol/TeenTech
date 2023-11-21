package com.ssafy.teentech.alba.dto.response;

import com.ssafy.teentech.alba.domain.Alba;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class AlbaResponseDto {

    private Long albaId;

    private Long childId;

    private String title;

    private String content;

    private Integer reward;

    private LocalDate startDate;

    private LocalDate closeDate;

    private String status;


    public AlbaResponseDto(Alba alba) {
        this.albaId = alba.getAlbaId();
        this.childId = alba.getUser().getUserId();
        this.title = alba.getTitle();
        this.content = alba.getContent();
        this.reward = alba.getReward();
        this.startDate = alba.getStartDate();
        this.closeDate = alba.getCloseDate();
        this.status = alba.getStatus().getDescription();
    }
}
