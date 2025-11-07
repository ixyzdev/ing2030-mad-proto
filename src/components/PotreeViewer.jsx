"use client";

import React, { useEffect, useRef } from "react";

const PotreeViewer = ({
  modelPath = "/pointclouds/lion_takanawa/cloud.js",
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // * Cargar CSS de Potree
    const potreeCSS = document.createElement("link");
    potreeCSS.rel = "stylesheet";
    potreeCSS.href = "/vendor/potree/build/potree/potree.css";
    document.head.appendChild(potreeCSS);

    // * Lista de scripts con rutas absolutas en el orden EXACTO del HTML original
    const scripts = [
      "/vendor/potree/libs/jquery/jquery-3.1.1.min.js",
      "/vendor/potree/libs/spectrum/spectrum.js",
      "/vendor/potree/libs/jquery-ui/jquery-ui.min.js",
      "/vendor/potree/libs/other/BinaryHeap.js",
      "/vendor/potree/libs/tween/tween.min.js",
      "/vendor/potree/libs/d3/d3.js",
      "/vendor/potree/libs/proj4/proj4.js",
      "/vendor/potree/libs/openlayers3/ol.js",
      "/vendor/potree/libs/i18next/i18next.js",
      "/vendor/potree/libs/jstree/jstree.js",
      "/vendor/potree/build/potree/potree.js",
      "/vendor/potree/libs/plasio/js/laslaz.js",
    ];

    let loadedScripts = 0;

    // * Todos los scripts cargados - inicializar Potree
    const loadNextScript = () => {
      if (loadedScripts >= scripts.length) {
        initializePotree();
        return;
      }

      const script = document.createElement("script");
      script.src = scripts[loadedScripts];
      script.onload = () => {
        loadedScripts++;
        loadNextScript();
      };
      document.body.appendChild(script);
    };

    // Iniciar carga de scripts
    loadNextScript();

    const initializePotree = () => {
      if (!window.Potree || !containerRef.current) return;

      // Crear la estructura HTML que espera Potree
      containerRef.current.innerHTML = `
        <div class="potree_container" style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px;">
          <div id="potree_render_area" style="background-image: url('/vendor/potree/build/potree/resources/images/background.jpg');"></div>
          <div id="potree_sidebar_container"></div>
        </div>
      `;

      const renderArea = document.getElementById("potree_render_area");

      // * Inicializar viewer (COPIADO DEL HTML ORIGINAL)
      window.viewer = new Potree.Viewer(renderArea);

      window.viewer.setEDLEnabled(false);
      window.viewer.setFOV(60);
      window.viewer.setPointBudget(1_000_000);
      window.viewer.loadSettingsFromURL();
      window.viewer.setBackground("skybox");

      //   window.viewer.setDescription("Mi visualizador de nubes de puntos");

      window.viewer.loadGUI(() => {
        window.viewer.setLanguage("en");
        $("#menu_tools").next().show();
        $("#menu_clipping").next().show();
        window.viewer.toggleSidebar();
      });

      const absoluteModelPath = modelPath.startsWith("/")
        ? modelPath
        : `/${modelPath}`;
      console.log("Cargando modelo desde:", absoluteModelPath);

      // * Cargar el modelo especificado
      Potree.loadPointCloud(absoluteModelPath, "Mi Modelo", (e) => {
        let scene = window.viewer.scene;
        let pointcloud = e.pointcloud;

        let material = pointcloud.material;
        material.size = 1;
        material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
        material.shape = Potree.PointShape.SQUARE;

        scene.addPointCloud(pointcloud);
        window.viewer.fitToScreen();
      });
    };
  }, [modelPath]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default PotreeViewer;
