// src/components/PotreeViewer.jsx
import React, { useState } from "react";

export const PotreeViewerIframe = () => {
  const [selectedModel, setSelectedModel] = useState(
    "/pointclouds/lion_takanawa/cloud.js"
  );

  const models = [
    { path: "/pointclouds/lion_takanawa/cloud.js", name: "León" },
    { path: "/pointclouds/proyecto1/cloud.js", name: "Proyecto 1" },
    { path: "/pointclouds/urban/cloud.js", name: "Urban" },
  ];

  const iframeUrl = `/vendor/potree/examples/viewer.html?model=${encodeURIComponent(
    selectedModel
  )}&name=${encodeURIComponent(
    models.find((m) => m.path === selectedModel)?.name || "Modelo"
  )}`;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Selector mínimo */}
      <div style={{ padding: "10px", background: "#2c3e50" }}>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        >
          {models.map((model) => (
            <option key={model.path} value={model.path}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      {/* Iframe */}
      <iframe
        src={iframeUrl}
        style={{ flex: 1, border: "none" }}
        title="Potree Viewer"
      />
    </div>
  );
};
