import { devTools } from '@constants';

const DevTools = () => {
    return (
    <section>
        <h2>Dev Tools</h2>
        <div>
            {devTools.map((tool) => (
                <img key={tool.id} src={tool.icon} alt={tool.name} />
            ))}
        </div>
    </section>
    )
}

export default DevTools;