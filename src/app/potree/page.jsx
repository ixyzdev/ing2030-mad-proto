"use client";

import React from "react";

import PotreeViewer from "@/components/PotreeViewer";
import { PotreeViewerIframe } from "@/components/PotreeViewerIframe";

<PotreeViewer modelPath="/pointclouds/otro_modelo/cloud.js" />;

export default function Page() {
  const [selectedModel, setSelectedModel] = React.useState(
    "/vendor/pointclouds/vol_total/cloud.js"
  );

  return (
    <div>
      {/* <PotreeViewer modelPath={selectedModel} /> */}
      <PotreeViewerIframe />
    </div>
  );
}
