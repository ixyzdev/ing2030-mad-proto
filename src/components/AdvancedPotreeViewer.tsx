"use client";

import React, { useEffect, useRef } from "react";

const AdvancedPotreeViewer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Función para cargar Potree
    const loadPotree = () => {
      // 1. Cargar CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/potree/libs/potree/potree.css";
      document.head.appendChild(link);

      // 2. Cargar scripts en orden
      const scripts = [
        "/potree/libs/jquery/jquery-3.1.1.min.js",
        "/potree/libs/three.js/build/three.min.js",
        "/potree/libs/other/BinaryHeap.js",
        "/potree/libs/tween/tween.min.js",
        "/potree/libs/d3/d3.js",
        "/potree/libs/proj4/proj4.js",
        "/potree/libs/openlayers3/ol.js",
        "/potree/libs/i18next/i18next.js",
        "/potree/libs/jstree/jstree.js",
        "/potree/libs/potree/potree.js",
      ];

      const loaded = 0;

      const loadScript = (src: any) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      // Cargar todos los scripts en orden
      const loadAllScripts = async () => {
        for (const src of scripts) {
          await loadScript(src);
        }
        initializeViewer();
      };

      loadAllScripts();
    };

    // 3. Inicializar el viewer
    const initializeViewer = () => {
      if (!window.Potree || !containerRef.current) return;

      const viewer = new window.Potree.Viewer(containerRef.current);

      // Configuración básica
      viewer.setEDLEnabled(true);
      viewer.setFOV(60);
      viewer.setPointBudget(2_000_000);
      viewer.setBackground("skybox");

      // Cargar nube de puntos
      const pointcloudUrl = "/pointclouds/cloud.js";

      window.Potree.loadPointCloud(pointcloudUrl, "Mi Nube de Puntos", (e) => {
        const pointcloud = e.pointcloud;
        viewer.scene.addPointCloud(pointcloud);
        viewer.fitToScreen();

        // Opcional: Configurar material
        pointcloud.material.size = 1;
        pointcloud.material.pointSizeType =
          window.Potree.PointSizeType.ADAPTIVE;
      });
    };

    loadPotree();

    // Cleanup
    return () => {
      // Limpiar si es necesario
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        background: "#2c3e50",
      }}
    />
  );
};

export default AdvancedPotreeViewer;
