package com.tsys.enterprise.support.service;

import com.tsys.enterprise.support.exception.SupportSendException;

public interface SupportService {

	void sendSupportAlert(String message) throws SupportSendException;
}
