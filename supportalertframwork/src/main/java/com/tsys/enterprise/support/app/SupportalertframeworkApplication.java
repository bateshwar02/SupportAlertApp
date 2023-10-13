package com.tsys.enterprise.support.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.tsys.enterprise.support.exception.SupportSendException;
import com.tsys.enterprise.support.service.SupportService;
import com.tsys.enterprise.support.service.impl.SupportServiceImpl;

@SpringBootApplication
public class SupportalertframeworkApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(SupportalertframeworkApplication.class, args);
		SupportService supportService = new SupportServiceImpl();
		try {
			int a=10;
			int b=0;
			
			int result = a/b;
			System.out.println("Result is :"+result);
		}catch(ArithmeticException e) {
			
			try {
				supportService.sendSupportAlert("Application error alert.");
			} catch (SupportSendException ex) {
				ex.printStackTrace();
			}
		}
	}

}
