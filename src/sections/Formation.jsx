import { formations } from "@constants/index";

const FormationCards = ({ title, year, description }) => {
    return (
        <div>
            {formations.map((formation) => (
                <div>
                    <img src={formation.image} alt={formation.alt}></img>

                    <div key={formation.id} className="formation-card">
                        <h3>{formation.title}</h3>
                        <p>{formation.diploma}</p>
                        <span>{formation.date}</span>
                    </div>
                </div>
            ))}
        </div>
    )
};

const Formation = () => {
    return(
        <section>
            <h2>Formation</h2>
            <FormationCards />
        </section>
    )
}

export default Formation;