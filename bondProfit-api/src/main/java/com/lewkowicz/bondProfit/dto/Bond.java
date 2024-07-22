package com.lewkowicz.bondProfit.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class Bond {

    private LocalDate purchaseDate;
    private LocalDate maturityDate;
    private double netProfit;
    private boolean reinvested;

}
