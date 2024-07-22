package com.lewkowicz.bondProfit.controller;

import com.lewkowicz.bondProfit.dto.Bond;
import com.lewkowicz.bondProfit.dto.BondRequest;
import com.lewkowicz.bondProfit.dto.BondResponse;
import com.lewkowicz.bondProfit.service.BondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

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

    public ResponseEntity<Void> reinvestMaturedBonds(@RequestBody List<Bond> bonds, @RequestParam int investmentYears) {
        LocalDate endDate = LocalDate.now().plusYears(investmentYears);
        bondService.reinvestMaturedBonds(bonds, endDate);
        return ResponseEntity.ok().build();
    }

}
