import { experiences } from "@constants/index";

const Experience = () => {
    return (
        <section>
            <h2>Experience</h2>
            
            <div>
                {experiences.map((experience) => (
                    <div>
                        <img src={experience.image} alt={experience.alt}></img>

                        <div key={experience.id}>
                            <div>
                                <h3>{experience.title}</h3>
                                <span>{experience.date}</span>
                            </div>
                            <p>{experience.status}</p>
                            <p>{experience.location}</p>
                            <ul>
                                {experience.description.map((item) => (
                                    <li>{item.text}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Experience;