package com.ssafy.teentech.bank.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.ssafy.teentech.bank.dto.request.TransactionListRequestDto;
import com.ssafy.teentech.bank.dto.request.TransactionRequestDto;
import com.ssafy.teentech.bank.dto.response.AccountResponseDto;
import com.ssafy.teentech.common.error.exception.BankException;
import com.ssafy.teentech.common.response.ApiResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BankServiceTest {

    @Autowired
    private BankService bankService;

    /**
     * 은행 서버의 DB에 저장된 계좌 정보에 따라 테스트 결과가 달라짐 어떻게 하면 항상 같은 결과를 내도록 할 수 있을까
     */

    @Test
    void test() {
        TransactionListRequestDto transactionListRequestDto = new TransactionListRequestDto(1L,
            "123456789000", "1234");
        ApiResponse apiResponse = bankService.getTransactions(
            transactionListRequestDto);
        assertThat(apiResponse).isExactlyInstanceOf(
            ApiResponse.class);
    }

    @DisplayName("이체 4XX 에러")
    @Test
    void transferExceptionTest() {
        TransactionRequestDto transactionRequestDto = new TransactionRequestDto(1L, "123456789000",
            "1234", "123456789001", 100L, "test");

        assertThatThrownBy(() -> {
            bankService.transfer(transactionRequestDto);
        }).isInstanceOf(BankException.class);
    }

    @DisplayName("이체 정상 처리")
    @Test
    void transferTest() {
        TransactionRequestDto transactionRequestDto = new TransactionRequestDto(1L, "123456789000",
            "1234", "123456789001", 100L, "test");

        assertThat(bankService.transfer(transactionRequestDto).getMessage()).isEqualTo("이체 완료");
    }

    @DisplayName("계좌 정보 조회")
    @Test
    void accountInformationTest() {
        AccountResponseDto accountResponseDto = new AccountResponseDto("심규렬", "123456789000", 0L);
        ApiResponse<AccountResponseDto> apiResponse = bankService.getAccountInformation(1L);

        assertThat(apiResponse.getData().getUserName()).isEqualTo(accountResponseDto.getUserName());
        assertThat(apiResponse.getData().getAccountNumber()).isEqualTo(
            accountResponseDto.getAccountNumber());
        assertThat(apiResponse.getData().getBalance()).isEqualTo(accountResponseDto.getBalance());
    }
}
