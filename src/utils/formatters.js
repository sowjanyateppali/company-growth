import * as d3 from "d3";
export const fmtM = (x) => `${d3.format(".1f")(x)} M`;
export const fmtInt = d3.format("d");
