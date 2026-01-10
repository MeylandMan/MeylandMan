import { projects } from "@constants/index";
import githubLogo from "@assets/projects/mark-github-16.svg";
import rssLogo from "@assets/projects/rss-16.svg";

const Projects = () => {
  return (
    <section className="c-space my-20" id="projects">
      <div className="w-full text-white">
        <p className="head-text">My Projects</p>

        <div className="grid gap-6 sm:grid-cols-2 mt-6">
          {projects.map((project) => (
            <article key={project.id} className="rounded-lg bg-zinc-950 border border-zinc-700 shadow-lg overflow-hidden group transition-transform hover:scale-[1.02]">
              <div className="h-full flex flex-col sm:flex-row">
                <div className="sm:w-1/3 bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-4">
                  {project.image ? (
                    <img
                      className="w-full h-36 sm:h-full object-cover rounded-t-lg sm:rounded-none sm:rounded-l-lg"
                      src={project.image.startsWith("/") ? project.image : `/assets/projects/${project.image}`}
                      alt={project.alt || project.title}
                    />
                  ) : (
                    <div className="w-full h-36 sm:h-full flex items-center justify-center text-zinc-300">
                      <div className="text-center">
                        <p className="text-lg font-bold">{project.title}</p>
                        <p className="text-sm text-zinc-400 mt-1">No preview available</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-bold text-xl">{project.title}</h3>
                    <p className="text-sm text-zinc-300 mt-2">{project.description}</p>

                    <ul className="flex flex-wrap gap-2 mt-4">
                      {project.stack.map((tech, idx) => (
                        <li key={idx} className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">{tech}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex gap-3">
                    {project.link && project.link.trim() !== "" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white text-sm font-medium"
                        aria-label={`Open live demo of ${project.title} in new tab`}
                      >
                        <img src={rssLogo} alt="RSS Logo" />
                        Live Demo
                      </a>
                    )}

                    {project.source && project.source.trim() !== "" && (
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium border border-zinc-700"
                        aria-label={`Open source code for ${project.title} in new tab`}
                      >
                        <img src={githubLogo} alt="GitHub Logo" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;