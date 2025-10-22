// src/components/PotreeViewer.jsx
import React from "react";

const PotreeViewer = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/vendor/potree/examples/viewer.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          background: "#f0f0f0",
        }}
        title="Visualizador de Nube de Puntos"
        allowFullScreen
      />
    </div>
  );
};

export default PotreeViewer;
