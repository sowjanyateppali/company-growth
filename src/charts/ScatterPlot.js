import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function ScatterPlot({ data, width = 900, height = 480 }) {
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
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Revenue))
      .nice()
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Expenses))
      .nice()
      .range([height - margin.bottom, margin.top]);

    // grid
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(6).tickSize(-innerH).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "#2a3a66");

    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6).tickSize(-innerW).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "#2a3a66");

    // tooltip
    const tip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "#111827")
      .style("color", "#F9FAFB")
      .style("padding", "6px 8px")
      .style("border-radius", "8px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // points
    svg
      .selectAll(".dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.Revenue))
      .attr("cy", (d) => y(d.Expenses))
      .attr("r", 5)
      .attr("fill", "#ffd166")
      .attr("stroke", "#0b1020")
      .attr("stroke-width", 1)
      .on("mouseenter", (event, d) => {
        tip
          .html(
            `Year: ${d.Year}<br/>Revenue: ${d3.format(".1f")(
              d.Revenue
            )} M<br/>Expenses: ${d3.format(".1f")(d.Expenses)} M`
          )
          .style("opacity", 1);
      })
      .on("mousemove", (event) => {
        tip
          .style("left", event.pageX + 12 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseleave", () => tip.style("opacity", 0));

    // axes
    const xAxis = svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(6)
          .tickFormat((d) => `${d3.format(".0f")(d)} M`)
      );

    const yAxis = svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(y)
          .ticks(6)
          .tickFormat((d) => `${d3.format(".0f")(d)} M`)
      );

    // force axis tick text to white
    xAxis.selectAll("text").attr("fill", "#ffffff");
    yAxis.selectAll("text").attr("fill", "#ffffff");
    xAxis.selectAll("path,line").attr("stroke", "#6f88b9");
    yAxis.selectAll("path,line").attr("stroke", "#6f88b9");

    // labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .text("Revenue (Millions)");

    svg
      .append("text")
      .attr("transform", `translate(18, ${height / 2}) rotate(-90)`)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .text("Expenses (Millions)");

    // title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 26)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("font-weight", "700")
      .attr("fill", "#ffffff")
      .text("Revenue vs Expenses (Scatter)");
  }, [data, width, height]);

  return <svg ref={ref} />;
}
