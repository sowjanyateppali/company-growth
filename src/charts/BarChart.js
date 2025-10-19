import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { fmtM, fmtInt } from "../utils/formatters";

export default function BarChart({ data, width = 900, height = 480 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!data?.length) return;
    const margin = { top: 50, right: 24, bottom: 64, left: 72 };
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("*").remove();

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.Year))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.Revenue)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // grid
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6).tickSize(-innerW).tickFormat(""));

    // bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.Year))
      .attr("y", (d) => y(d.Revenue))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.Revenue));

    // value labels
    svg
      .selectAll(".val")
      .data(data)
      .join("text")
      .attr("class", "val")
      .attr("x", (d) => x(d.Year) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.Revenue) - 6)
      .attr("text-anchor", "middle")
      .attr("fill", "#cfe3ff")
      .text((d) => fmtM(d.Revenue));

    // axes
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(fmtInt));

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .ticks(6)
          .tickFormat((d) => `${d3.format(".0f")(d)} M`)
      );

    // labels
    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("x", width / 2)
      .attr("y", height - 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .text("Year");

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("transform", `translate(18, ${height / 2}) rotate(-90)`)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .text("Revenue (Millions)");

    svg
      .append("text")
      .attr("class", "title-text")
      .attr("x", width / 2)
      .attr("y", 28)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("font-weight", "700")
      .attr("fill", "#ffffff")
      .text("Company Revenue by Year");
  }, [data, width, height]);

  return <svg ref={ref} />;
}
