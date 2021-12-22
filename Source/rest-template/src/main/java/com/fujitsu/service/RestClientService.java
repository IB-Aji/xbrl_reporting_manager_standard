package com.fujitsu.service;

import java.util.List;
import java.util.Map;

import com.fujitsu.model.JwtRequest;
import com.fujitsu.model.PageableObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RestClientService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${api.url}")
    String apiUrl;

    public ResponseEntity<?> testAuthenticate(JwtRequest authRequest) {
        ResponseEntity<?> response = restTemplate.postForEntity(apiUrl + "/authenticate2",
                authRequest, String.class);

        return response;
    }

    public PageableObject<List<String>> getListOfStaticReportBySample(Map<String, String> header,
            String payLoad) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAll(header);

        HttpEntity<?> request = new HttpEntity<>(payLoad, headers);

        @SuppressWarnings("unchecked")
        PageableObject<List<String>> response = restTemplate.postForEntity(
                apiUrl + "/static-report-setup/all-headers",
                request, PageableObject.class).getBody();

        // System.out.println(response.toString());

        return response;
    }

}
