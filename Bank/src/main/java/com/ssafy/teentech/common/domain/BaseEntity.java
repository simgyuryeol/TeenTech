package com.ssafy.teentech.common.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @CreatedDate
    @Column(name = "CREATED_DATE_TIME", updatable = false)
    private LocalDateTime createdDateTime;

    @LastModifiedDate
    @Column(name = "UPDATED_DATE_TIME")
    private LocalDateTime updatedDateTime;
}
