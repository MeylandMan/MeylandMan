import { formations } from "@constants/index";

const Formation = () => {
    return(
        <section>
            <h2>Formation</h2>
           
            <div>
                {formations.map((formation) => (
                    <div>
                        <img src={formation.image} alt={formation.alt}></img>

                        <div key={formation.id}>
                            <h3>{formation.title}</h3>
                            <p>{formation.diploma}</p>
                            <span>{formation.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Formation;