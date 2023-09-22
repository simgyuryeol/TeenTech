package com.ssafy.teentech.deposit.service;

import com.ssafy.teentech.deposit.domain.Deposit;
import com.ssafy.teentech.deposit.domain.InterestType;
import com.ssafy.teentech.deposit.dto.request.DepositCreateRequestDto;
import com.ssafy.teentech.deposit.dto.response.DepositCreateResponseDto;
import com.ssafy.teentech.deposit.dto.response.DepositInquiryResponseDto;
import com.ssafy.teentech.deposit.repository.DepositRepository;
import com.ssafy.teentech.user.domain.ChildDetail;
import com.ssafy.teentech.user.domain.User;
import com.ssafy.teentech.user.repository.ChildDetailRepository;
import com.ssafy.teentech.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DepositService {

    private final UserRepository userRepository;
    private final ChildDetailRepository childDetailRepository;
    private final DepositRepository depositRepository;


    /**
     * 신용등급 3등급 이상이면 선택이 가능  그 아래는  단리
     * 1. 단리, 복리 검증
     * 2. 만기지급액 계산
     * 3. 가입 저장
     */
    public DepositCreateResponseDto depositCreate(DepositCreateRequestDto depositCreateRequestDto, Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        ChildDetail childDetail = childDetailRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException());

        // 1. 복리라면 사용 가능해도 되는지 확인
        // 복리이면서 3등급 이상이면 실패
        if (depositCreateRequestDto.getInterestType()== InterestType.COMPOUNDINTEREST && childDetail.getCreditRating()>3){
            return null;
        }

        //2. 만기지급액 계산
        int maturityPaymentAmount = 0;
        // 단리면
        if (depositCreateRequestDto.getInterestType()== InterestType.SIMPLEINTEREST){
            maturityPaymentAmount = (int)(depositCreateRequestDto.getMoney() + depositCreateRequestDto.getMoney() * (childDetail.getDepositInterestRate()/100) * depositCreateRequestDto.getWeeks());
        }
        else{ //복리면
            maturityPaymentAmount = (int)(depositCreateRequestDto.getMoney() * Math.pow(1+(childDetail.getDepositInterestRate()/100),depositCreateRequestDto.getWeeks()));
        }

        // 3. 가입 저장
        DepositCreateResponseDto depositCreateResponseDto = DepositCreateResponseDto.builder()
                .depositName(depositCreateRequestDto.getDepositName())
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(depositCreateRequestDto.getWeeks()*7))
                .money(depositCreateRequestDto.getMoney())
                .interestType(depositCreateRequestDto.getInterestType())
                .interest(childDetail.getDepositInterestRate())
                .maturityPaymentAmount(maturityPaymentAmount)
                .build();

        depositRepository.save(depositCreateResponseDto.toEntity(user));

        return depositCreateResponseDto;
    }

    public List<DepositInquiryResponseDto> depositInquiry(Long childId) {
        User user = userRepository.findById(childId).orElseThrow(() -> new IllegalArgumentException());
        List<Deposit> depositList = depositRepository.findAllByUser(user).orElseThrow(() -> new IllegalArgumentException());

        List<DepositInquiryResponseDto> depositInquiryResponseDtoList = new ArrayList<>();
        for (Deposit deposit : depositList) {
            DepositInquiryResponseDto  depositInquiryResponseDto = DepositInquiryResponseDto.builder()
                    .depositName(deposit.getDepositName())
                    .endDate(deposit.getEndDate())
                    .interest(deposit.getInterest())
                    .interestType(deposit.getInterestType())
                    .maturityPaymentAmount(deposit.getMaturityPaymentAmount())
                    .money(deposit.getMoney())
                    .startDate(deposit.getStartDate())
                    .build();

            depositInquiryResponseDtoList.add(depositInquiryResponseDto);
        }

        return depositInquiryResponseDtoList;
    }

    public DepositInquiryResponseDto depositSingleInquiry(Integer depositId) {
        Deposit deposit = depositRepository.findById(depositId).orElseThrow(() -> new IllegalArgumentException());

        DepositInquiryResponseDto  depositInquiryResponseDto = DepositInquiryResponseDto.builder()
                .depositName(deposit.getDepositName())
                .endDate(deposit.getEndDate())
                .interest(deposit.getInterest())
                .interestType(deposit.getInterestType())
                .maturityPaymentAmount(deposit.getMaturityPaymentAmount())
                .money(deposit.getMoney())
                .startDate(deposit.getStartDate())
                .build();

        return depositInquiryResponseDto;
    }

    public void depositExpiration(Integer depositId) {
        Deposit deposit = depositRepository.findById(depositId).orElseThrow(() -> new IllegalArgumentException());

        // 만료 금액 이체 로직 추가



        depositRepository.delete(deposit);
    }
}
