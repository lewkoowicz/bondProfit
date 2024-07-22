package com.lewkowicz.bondProfit.service;

import com.lewkowicz.bondProfit.dto.Bond;
import com.lewkowicz.bondProfit.dto.BondResponse;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BondService {

    private static final double ANNUAL_INTEREST_RATE = 6.4 / 100;
    private static final int BOND_LENGTH_YEARS = 3;
    private static final double TAX_RATE = 19.0 / 100;

    public BondResponse createBonds(double monthlyInvestment, int investmentYears, boolean reinvest) {
        List<Bond> bonds = new ArrayList<>();
        double totalSavings = 0;
        LocalDate endDate = LocalDate.now().plusYears(investmentYears);

        for (int i = 0; i < investmentYears * 12; i++) {
            LocalDate purchaseDate = LocalDate.now().plusMonths(i);
            LocalDate maturityDate = purchaseDate.plusYears(BOND_LENGTH_YEARS);

            double futureValue = monthlyInvestment * Math.pow(1 + ANNUAL_INTEREST_RATE, BOND_LENGTH_YEARS);
            double profit = futureValue - monthlyInvestment;
            double tax = profit * TAX_RATE;
            double netProfit = profit - tax;

            bonds.add(new Bond(purchaseDate, maturityDate, netProfit, false));
        }

        if (reinvest) {
            reinvestMaturedBonds(bonds, endDate);
        }

        totalSavings = bonds.stream().mapToDouble(bond -> bond.getNetProfit() + monthlyInvestment).sum();

        DecimalFormat df = new DecimalFormat("#,###.00");

        double totalSavingsWithoutBonds = monthlyInvestment * 12 * investmentYears;
        double difference = totalSavings - totalSavingsWithoutBonds;

        BondResponse response = new BondResponse();
        response.setBondDetails(bonds.stream()
                .map(bond -> String.format("Bond purchased on %s will mature on %s with a net profit of %s zł. Reinvested: %s",
                        bond.getPurchaseDate(), bond.getMaturityDate(), df.format(bond.getNetProfit()), bond.isReinvested() ? "Yes" : "No"))
                .collect(Collectors.toList()));
        response.setTotalSavings(df.format(totalSavings) + " zł");
        response.setTotalSavingsWithoutBonds(df.format(totalSavingsWithoutBonds) + " zł");
        response.setDifference(df.format(difference) + " zł");

        return response;
    }

    public void reinvestMaturedBonds(List<Bond> bonds, LocalDate endDate) {
        double leftover = 0;

        for (Bond bond : bonds) {
            if (bond.getMaturityDate().isBefore(endDate)) {
                double totalAvailable = bond.getNetProfit() + leftover;
                int numberOfBonds = (int) (totalAvailable / 100);
                double investedAmount = numberOfBonds * 100;
                leftover = totalAvailable - investedAmount;

                double futureValue = investedAmount * Math.pow(1 + ANNUAL_INTEREST_RATE, BOND_LENGTH_YEARS);
                double profit = futureValue - investedAmount;
                double tax = profit * TAX_RATE;
                double netProfit = profit - tax;

                bond.setMaturityDate(bond.getMaturityDate().plusYears(BOND_LENGTH_YEARS));
                bond.setNetProfit(bond.getNetProfit() + netProfit);
                bond.setReinvested(true);
            }
        }
    }
}
