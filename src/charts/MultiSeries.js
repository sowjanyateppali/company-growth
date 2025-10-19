import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function MultiSeries({ data, width = 900, height = 500 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!data?.length) return;
    const margin = { top: 56, right: 24, bottom: 64, left: 72 };
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
      .domain([0, d3.max(data, (d) => Math.max(d.Revenue, d.Profit))])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // grid
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6).tickSize(-innerW).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "#2a3a66");

    // bars (Revenue)
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.Year))
      .attr("y", (d) => y(d.Revenue))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.Revenue))
      .attr("fill", "#5fa8ff");

    // line (Profit)
    const line = d3
      .line()
      .x((d) => x(d.Year) + x.bandwidth() / 2)
      .y((d) => y(d.Profit))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .attr("stroke", "#eea94b")
      .attr("stroke-width", 2.5)
      .attr("fill", "none");

    // points on line
    svg
      .selectAll(".pt")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.Year) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.Profit))
      .attr("r", 3.5)
      .attr("fill", "#ffd166")
      .attr("stroke", "#0b1020")
      .attr("stroke-width", 1);

    // axes
    const xAxis = svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

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

    // force axis tick text to white and axis lines to blue-gray
    xAxis.selectAll("text").attr("fill", "#ffffff");
    yAxis.selectAll("text").attr("fill", "#ffffff");
    xAxis.selectAll("path,line").attr("stroke", "#6f88b9");
    yAxis.selectAll("path,line").attr("stroke", "#6f88b9");

    // axis labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .text("Year");

    svg
      .append("text")
      .attr("transform", `translate(18, ${height / 2}) rotate(-90)`)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .text("Amount (Millions)");

    // legend (white text)
    const lg = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", "translate(110,16)");
    lg.append("rect")
      .attr("x", -12)
      .attr("y", -10)
      .attr("width", 230)
      .attr("height", 24)
      .attr("fill", "#0f1732")
      .attr("stroke", "#2a3a66");

    lg.append("rect")
      .attr("x", 0)
      .attr("y", -6)
      .attr("width", 14)
      .attr("height", 14)
      .attr("fill", "#5fa8ff");
    lg.append("text")
      .attr("x", 20)
      .attr("y", 6)
      .attr("fill", "#ffffff")
      .text("Revenue (bars)");

    lg.append("line")
      .attr("x1", 128)
      .attr("x2", 160)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "#eea94b")
      .attr("stroke-width", 3);
    lg.append("text")
      .attr("x", 166)
      .attr("y", 6)
      .attr("fill", "#ffffff")
      .text("Profit (line)");

    // title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 26)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("font-weight", "700")
      .attr("fill", "#ffffff")
      .text("Revenue (Bars) + Profit (Line)");
  }, [data, width, height]);

  return <svg ref={ref} />;
}
