package com.ssafy.teentech.bank.service;

import com.ssafy.teentech.bank.dto.request.AutoTransactionRequestDto;
import com.ssafy.teentech.bank.dto.request.TransactionListRequestDto;
import com.ssafy.teentech.bank.dto.request.TransactionRequestDto;
import com.ssafy.teentech.bank.dto.response.AccountResponseDto;
import com.ssafy.teentech.bank.dto.response.TransactionListResponseDto;
import com.ssafy.teentech.common.error.exception.BankException;
import com.ssafy.teentech.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@Transactional
@RequiredArgsConstructor
public class BankService {

    @Value("${bank.server.uri}")
    private String bankServerUri;

    public ApiResponse transfer(TransactionRequestDto transactionRequestDto) {
        WebClient webClient = WebClient
            .builder()
            .baseUrl(bankServerUri)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        ApiResponse result = webClient.post()
            .uri("/api/v1/transaction")
            .body(Mono.just(transactionRequestDto), TransactionRequestDto.class)
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError,
                response -> {
                    throw new BankException(400, "400에러");
                })
            .onStatus(HttpStatus::is5xxServerError, response -> {
                throw new BankException(500, "500에러");
            })
            .bodyToMono(ApiResponse.class)
            .block();

        return result;
    }

    public ApiResponse autoTransfer(AutoTransactionRequestDto autoTransactionRequestDto) {
        WebClient webClient = WebClient
            .builder()
            .baseUrl(bankServerUri)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        ApiResponse result = webClient.post()
            .uri("/api/v1/transaction")
            .body(Mono.just(autoTransactionRequestDto), AutoTransactionRequestDto.class)
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError,
                response -> {
                    throw new BankException(400, "400에러");
                })
            .onStatus(HttpStatus::is5xxServerError, response -> {
                throw new BankException(500, "500에러");
            })
            .bodyToMono(ApiResponse.class)
            .block();

        return result;
    }

    public AccountResponseDto getAccountInformation(Long userId) {
        WebClient webClient = WebClient
            .builder()
            .baseUrl(bankServerUri)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        AccountResponseDto apiResponse = webClient.get()
            .uri(uriBuilder -> uriBuilder.path("/api/v1/account/information")
                .queryParam("userId", userId).build())
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError,
                response -> {
                    throw new BankException(400, "400에러");
                })
            .onStatus(HttpStatus::is5xxServerError, response -> {
                throw new BankException(500, "500에러");
            })
            .bodyToMono(AccountResponseDto.class)
            .block();

        return apiResponse;
    }

    public TransactionListResponseDto getTransactions(
        TransactionListRequestDto transactionListRequestDto) {

        WebClient webClient = WebClient
            .builder()
            .baseUrl(bankServerUri)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        TransactionListResponseDto apiResponse = webClient.post()
            .uri("/api/v1/transaction/list")
            .body(Mono.just(transactionListRequestDto), TransactionListRequestDto.class)
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError,
                response -> {
                    throw new BankException(400, "400에러");
                })
            .onStatus(HttpStatus::is5xxServerError, response -> {
                throw new BankException(500, "500에러");
            })
            .bodyToMono(new ParameterizedTypeReference<TransactionListResponseDto>() {
            })
            .block();

        return apiResponse;
    }
}
