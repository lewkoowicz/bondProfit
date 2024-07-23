# Bond Profit Calculator 📈

## Overview 📋

The application allows users to calculate the potential profit from the purchase of 3-year TOS treasury bonds, available in Poland. The app provides detailed insights into interest earnings and capital gains based on user inputs. It is deployed on AWS EC2 instance using Docker containers and can be accessed at: [https://bondprofit.eu](https://bondprofit.eu)

## Formulas 📐

### Future Value of a Bond 💵

The future value (FV) of a bond after a certain period is calculated using the formula:

    FV = P * (1 + (r / n)) ^ (n * t)

- **P** = Investment amount every month
- **r** = Annual interest rate
- **n** = Number of capitalization periods per year
- **t** = Bond length in years

The 3-year TOS treasury bonds have a fixed interest rate of 6.4% with annual capitalization of interest.

### Tax Calculation 💰

Tax on the profit from a bond is calculated as:

    Tax = (FV - P) * Tax Rate

- **FV** = Future value of the bond
- **P** = Investment amount
- **Tax Rate** = Rate at which taxes are applied (19% in Poland)

### Net Profit 📈

Net profit from a bond after tax is:

    Net Profit = FV - Tax

- **FV** = Future value of the bond
- **Tax** = Tax on the profit

### Reinvestment of Matured Bonds 🔄

When a bond matures, if it is reinvested, its future value is recalculated based on the net profit and the same bond length:

    FV_reinvested = Net Profit * (1 + (r / n)) ^ (n * t)

- **Net Profit** = Profit after tax from the previous bond
- **r** = Annual interest rate
- **n** = Number of capitalization periods per year
- **t** = Bond length in years

The tax and net profit calculations for the reinvested bond are the same as those for the original bond.
