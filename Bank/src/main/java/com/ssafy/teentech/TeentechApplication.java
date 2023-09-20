package com.ssafy.teentech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class TeentechApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeentechApplication.class, args);
	}

}
