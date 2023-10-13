package com.tsys.enterprise.support.service.impl;

import java.util.Properties;
import java.util.concurrent.ExecutionException;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.tsys.enterprise.support.exception.SupportSendException;
import com.tsys.enterprise.support.service.SupportService;
import com.tsys.enterprise.support.util.Constants;

@Component
public class SupportServiceImpl implements SupportService{
	
	@Value("${kafka.support.brokers.list}")
	private String brokers;
	
	@Value("${kafka.support.topicname}")
	private String topicName;

	@Override
	public void sendSupportAlert(String message) throws SupportSendException {
		Properties props = new Properties();
		props.put(ProducerConfig.CLIENT_ID_CONFIG, "SupportAlertApp");
		props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
		props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, Constants.STRING_SERIALIZER);
		props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, Constants.STRING_SERIALIZER);
		
		KafkaProducer<String,String> producer = new KafkaProducer<>(props);
		ProducerRecord<String,String> producerRecord = new ProducerRecord<>("alertmessage",message);
		try {
			producer.send(producerRecord).get();
			System.out.println("Kafka send successful:::");
		}catch(InterruptedException | ExecutionException e) {
			throw new SupportSendException(e.getMessage());
		}finally {
			producer.close();
		}
		
	}
	
	

}
