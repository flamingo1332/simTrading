package com.project.simtrading;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import springfox.documentation.swagger2.mappers.ModelSpecificationMapper;
import springfox.documentation.swagger2.mappers.ModelSpecificationMapperImpl;

@SpringBootApplication
public class SimtradingApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimtradingApplication.class, args);
	}


	@Bean
	public ModelMapper modelMapper(){ // convert one object into another
		return new ModelMapper();
	}
}
