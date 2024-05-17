package com.lewkowicz.savings.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BondRequest {

    private double monthlyInvestment;
    private int investmentYears;
    private boolean reinvest;

}
