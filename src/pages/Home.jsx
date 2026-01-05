import { useState } from "react";
import FaultyTerminal from "../component/FaultyTerminal";
import Squares from "../component/Squares";
import DecryptedText from "../component/DecryptedText";
import CircularGallery from "../component/CircularGallery";
import { projects } from "../data/projects";


export default function Home() {
  const [entered, setEntered] = useState(false);

  // 🔑 MAP projects → gallery items
  const galleryItems = projects.map(project => ({
    image: project.image,
    text: project.title,
    id: project.id,
  }));

  /* ===============================
     ENTER / LANDING STATE
     =============================== */
  if (!entered) {
    return (
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          background: "#0b0b0b",
          overflow: "hidden",
        }}
      >
        {/* Faulty Terminal Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        >
          <FaultyTerminal />
        </div>

        {/* Decrypted Text Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ pointerEvents: "auto" }}>
            <DecryptedText animateOn="both" />
          </div>
        </div>

        {/* Enter Button */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "15vh",
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setEntered(true)}
            style={{
              padding: "1rem 2.5rem",
              fontSize: "1rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "white",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.4)",
              backdropFilter: "blur(6px)",
              cursor: "pointer",
            }}
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  /* ===============================
     PORTFOLIO STATE
     =============================== */
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#0b0b0b",
        overflow: "hidden",
      }}
    >
      {/* Squares Background */}
      <Squares />

      {/* Circular Gallery (driven by projects.js) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          pointerEvents: "auto",
        }}
      >
        <CircularGallery items={projects} />
      </div>
    </div>
  );
}