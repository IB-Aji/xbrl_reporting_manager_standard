package com.fujitsu.controller;

import java.util.Map;

import com.fujitsu.model.JwtRequest;
import com.fujitsu.service.RestClientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RestClientController {

    @Autowired
    private RestClientService restClientService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> testAuthenticate(@RequestBody JwtRequest authRequest) {
        return restClientService.testAuthenticate(authRequest);
    }

    @RequestMapping(value = "/all-headers", method = RequestMethod.POST)
    public ResponseEntity<?> getListOfStaticReport(@RequestHeader Map<String, String> header,
            @RequestBody String payload) {
        return restClientService.getListOfStaticReport(header, payload);
    }

}
