import * as d3 from "d3";

export async function loadCompanyData() {
  const CSV_URL = "/company_growth.csv"; // file is in public/
  const data = await d3.csv(CSV_URL, (d) => ({
    Year: +d.Year,
    Revenue: +d.Revenue,
    Expenses: +d.Expenses,
    Profit: +d.Profit,
    Employees: +d.Employees,
  }));
  return data;
}
