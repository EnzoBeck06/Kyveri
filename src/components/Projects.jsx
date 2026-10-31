import { useRef, useState } from "react";
import { projectAssets } from "../assets.js";
import { Icon } from "./Icon.jsx";

const projects = [
  {
    key: "property",
    title: "Landing Page Imobiliária",
    description:
      "Design sofisticado e focado em conversão para o mercado imobiliário.",
    alt: "Conceito visual de Landing Page Imobiliária apresentado em notebook e smartphone.",
  },
  {
    key: "barber",
    title: "Landing Page Barbearia",
    description:
      "Identidade moderna e experiência premium para apresentar o negócio.",
    alt: "Conceito visual de Landing Page Barbearia apresentado em notebook e smartphone.",
  },
  {
    key: "fitness",
    title: "Landing Page Academia",
    description: "Design imersivo para apresentar modalidades e planos.",
    alt: "Conceito visual de Landing Page Academia apresentado em notebook e smartphone.",
  },
  {
    key: "tech",
    title: "Landing Page Tecnologia",
    description:
      "Visual moderno e direto, ideal para apresentar produtos e soluções.",
    alt: "Conceito visual de Landing Page Tecnologia apresentado em notebook e smartphone.",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogRef = useRef(null);

  function openProject(project) {
    setSelectedProject(project);
    dialogRef.current?.showModal();
  }

  function closeProject() {
    dialogRef.current?.close();
    setSelectedProject(null);
  }

  return (
    <section
      id="projetos"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Projetos</p>
            <h2 id="projects-title">
              Conceitos digitais<br />para diferentes negócios.
            </h2>
            <p className="section-description">
              Estudos visuais que mostram possibilidades de apresentação em uma
              Landing Page.
            </p>
          </div>
          <a className="button button-outline" href="#project-grid">
            Ver todos os projetos
            <Icon name="arrow" />
          </a>
        </div>
        <div id="project-grid" className="project-grid">
          {projects.map((project) => {
            const artwork = projectAssets[project.key];
            return (
              <article className="project-card" data-reveal key={project.key}>
                <div className="project-art">
                  <picture>
                    <source srcSet={artwork.webp} type="image/webp" />
                    <img
                      src={artwork.fallback}
                      width="1536"
                      height="1024"
                      loading="lazy"
                      alt={project.alt}
                    />
                  </picture>
                </div>
                <div className="project-info">
                  <div className="project-tags">
                    <span>Landing Page</span>
                    <small>Projeto demonstrativo</small>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <button
                    className="project-open"
                    type="button"
                    aria-label={`Ampliar demonstração: ${project.title}`}
                    onClick={() => openProject(project)}
                  >
                    <Icon name="diagonal" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="demo-note">
          Conceitos visuais criados para demonstrar possibilidades de design.
          Não representam clientes reais ou resultados comprovados.
        </p>
      </div>
      <dialog
        className="project-dialog"
        aria-labelledby="dialog-title"
        ref={dialogRef}
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeProject();
        }}
      >
        <button
          className="dialog-close"
          type="button"
          aria-label="Fechar demonstração"
          onClick={closeProject}
        >
          ×
        </button>
        {selectedProject && (
          <>
            <img
              src={projectAssets[selectedProject.key].webp}
              alt={selectedProject.alt}
            />
            <div>
              <p className="eyebrow">Projeto demonstrativo</p>
              <h2 id="dialog-title">{selectedProject.title}</h2>
              <p>
                Prévia conceitual de design. Este exemplo não representa um
                cliente real nem um site publicado.
              </p>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
