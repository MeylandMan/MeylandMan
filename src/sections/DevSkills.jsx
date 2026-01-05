import { devSkills } from '@constants';

const DevSkills = () => {
    return (
    <section className="c-space my-20" id="dev-skills">
        <p className="head-text">Dev skills</p>
        <div className="carousel-slider skills-slider" aria-hidden="true" aria-label="Development Skills Icons">
            <div className="slide-track" aria-hidden="true">
                {[...devSkills, ...devSkills].map((skill, index) => (
                    <div className="slide" key={`${skill.id}-${index}`}>
                        <img src={`/assets/skills/${skill.icon}`} alt={skill.name} width={64} height={64} />
                    </div>
                ))}
            </div>
        </div>
    </section>
    )
}

export default DevSkills;