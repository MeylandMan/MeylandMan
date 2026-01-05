import { devTools } from '@constants';

const DevTools = () => {
    return (
    <section>
        <h2>Dev Tools</h2>
        <div>
            {devTools.map((tool) => (
                <img key={tool.id} src={`/assets/tools/${tool.icon}`} alt={tool.name} width={64} height={64} />
            ))}
        </div>
    </section>
    )
}

export default DevTools;