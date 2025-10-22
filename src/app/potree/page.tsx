import PotreeViewer from "@/components/PotreeViewer";

export default function Page() {
  return (
    // de momento SIN cloudUrl, solo para verificar que carga el visor
    <div>
      <header style={{ padding: "10px", background: "#333", color: "white" }}>
        <h1>Mi Visualizador de Nubes de Puntos</h1>
      </header>
      <PotreeViewer />
    </div>
  );
}
