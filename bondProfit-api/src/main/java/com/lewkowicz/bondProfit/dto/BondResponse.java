package com.lewkowicz.bondProfit.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BondResponse {

    private List<String> bondDetails;
    private String totalSavings;
    private String totalSavingsWithoutBonds;
    private String difference;

}
