import React, { useEffect, useState } from "react";
import { loadCompanyData } from "./hooks/useCompanyData";
import BarChart from "./charts/BarChart";
import ScatterPlot from "./charts/ScatterPlot";
import MultiSeries from "./charts/MultiSeries";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("bar");
  const [data, setData] = useState([]);

  useEffect(() => {
    loadCompanyData()
      .then(setData)
      .catch((err) => {
        console.error("CSV load failed:", err);
      });
  }, []);

  return (
    <div className="container">
      <div className="tabs">
        <button
          className={`tab ${tab === "bar" ? "active" : ""}`}
          onClick={() => setTab("bar")}
        >
          Bar
        </button>
        <button
          className={`tab ${tab === "scatter" ? "active" : ""}`}
          onClick={() => setTab("scatter")}
        >
          Scatter
        </button>
        <button
          className={`tab ${tab === "multi" ? "active" : ""}`}
          onClick={() => setTab("multi")}
        >
          Multi‑series
        </button>
      </div>

      <div className="card">
        <div className="header">
          {tab === "bar" && "Bar chart"}
          {tab === "scatter" && "Scatter plot"}
          {tab === "multi" && "Multi‑series chart"}
        </div>
        <div className="canvas">
          {tab === "bar" && <BarChart data={data} />}
          {tab === "scatter" && <ScatterPlot data={data} />}
          {tab === "multi" && <MultiSeries data={data} />}
        </div>
      </div>
    </div>
  );
}
