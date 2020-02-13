package com.kvr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import com.kvr.soap.currency.GetCountryRequest;
import com.kvr.soap.currency.GetCountryResponse;

@Endpoint
public class CurrencyEndpoint {
	private static final String NAMESPACE_URI = "http://spring.io/guides/gs-producing-web-service";

	private CurrencyRepository currencyRepository;

	@Autowired
	public CurrencyEndpoint(CurrencyRepository currencyRepository) {
		this.currencyRepository = currencyRepository;
	}	

	@PayloadRoot(namespace = NAMESPACE_URI, localPart = "getCountryRequest")
	@ResponsePayload
	public GetCountryResponse getCountry(@RequestPayload GetCountryRequest request) {
		GetCountryResponse response = new GetCountryResponse();
		response.setCountry(currencyRepository.findCountry(request.getName()));

		return response;
	}
}