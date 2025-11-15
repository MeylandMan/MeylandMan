import { devSkills } from '@constants';

const DevSkills = () => {
    return (
    <section>
        <h2>Dev skills</h2>
        <div>
            {devSkills.map((skill) => (
                <img key={skill.id} src={skill.icon} alt={skill.name} />
            ))}
        </div>
    </section>
    )
}

export default DevSkills;