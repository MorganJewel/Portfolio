import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div style={{ padding: "4rem", color: "white" }}>
        <h1>Project not found</h1>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "2rem",
            background: "none",
            border: "none",
            color: "#8fa571",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "3rem",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          color: "#8fa571",
          cursor: "pointer",
          fontSize: "1rem",
          marginBottom: "2rem",
          alignSelf: "flex-start",
          padding: 0,
        }}
      >
        ← Back to Gallery
      </button>

      {/* Main Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          flex: 1,
          alignItems: "start",
        }}
      >
        {/* LEFT: TEXT */}
        <div>
          <h1 style={{ marginBottom: "2rem" }}>{project.title}</h1>

          <div style={{ fontSize: "1.05rem", opacity: 0.9 }}>
            {project.description
              ?.split("\n\n")
              .map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    lineHeight: "1.8",
                    marginBottom: "1.5rem",
                  }}
                >
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        {/* RIGHT: MEDIA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "2rem",
            minHeight: "300px",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          {/* SINGLE IMAGE */}
          {project.mediaType === "image" && (
            <img
              src={project.media}
              alt={project.title}
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                borderRadius: "8px",
              }}
            />
          )}

          {/* MULTIPLE IMAGES */}
          {project.mediaType === "images" && Array.isArray(project.media) && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                width: "100%",
              }}
            >
              {project.media.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>
          )}

          {/* VIDEO (.mov / .mp4) */}
          {project.mediaType === "video" && (
            <video
              src={project.media}
              controls
              autoPlay
              loop
              muted
              playsInline
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                borderRadius: "8px",
              }}
            />
          )}

          {/* EMBED (iframe) */}
          {project.mediaType === "embed" && (
            <iframe
              src={project.media}
              title={project.title}
              style={{
                width: "100%",
                height: "60vh",
                border: "none",
                borderRadius: "8px",
              }}
              allowFullScreen
            />
          )}

          {/* LINK / FULL EXPERIENCE */}
          {project.mediaType === "link" && project.media && (
            <a
              href={project.media}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#8fa571",
                fontSize: "1.1rem",
                textDecoration: "underline",
              }}
            >
              {project.launchLabel || "Open Project →"}
            </a>
          )}

          {/* FALLBACK */}
          {!project.mediaType && (
            <div style={{ opacity: 0.5 }}>
              Media coming soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
