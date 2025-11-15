import { projects } from "@constants/index";

const Projects = () => {
    return (
    <section>
        <h2>Projects</h2>
        {projects.map((project) => (
            <>
            <div>
                <img src={project.image} alt={project.alt} />
                <div>
                    <div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                    <div>
                        <ul>
                            {project.stack.map((tech) => (
                                <li>{tech}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <img src="" alt="Live Demo" aria-hidden="true" />
                        Live Demo
                    </a>
                )}
                {project.source && (
                    <a href={project.source} target="_blank" rel="noopener noreferrer">
                        <img src="" alt="Source code" aria-hidden="true" />
                        Source Code
                    </a>
                )}
            </div>
            </>
        ))}
    </section>
    )
}

export default Projects;