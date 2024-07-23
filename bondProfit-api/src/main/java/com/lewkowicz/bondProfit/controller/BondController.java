package com.lewkowicz.bondProfit.controller;

import com.lewkowicz.bondProfit.dto.BondRequest;
import com.lewkowicz.bondProfit.dto.BondResponse;
import com.lewkowicz.bondProfit.service.BondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bonds")
public class BondController {

    @Autowired
    private BondService bondService;

    @PostMapping("/create")
    public ResponseEntity<BondResponse> createBonds(@RequestBody BondRequest bondRequest) {
        BondResponse response = bondService.createBonds(bondRequest.getMonthlyInvestment(), bondRequest.getInvestmentYears(), bondRequest.isReinvest());
        return ResponseEntity.ok(response);
    }

}
