import { devTools } from '@constants';

const DevTools = () => {
    return (
    <section className="c-space my-20" id="dev-tools">
        <p className="head-text">Dev Tools</p>
        <div className="carousel-slider tools-slider" aria-hidden="true" aria-label="Development Tools Icons">
            <div className="slide-track" aria-hidden="true">
                {[...devTools, ...devTools].map((tool, index) => (
                    <div className="slide" key={`${tool.id}-${index}`}>
                        <img src={`/assets/tools/${tool.icon}`} alt={tool.name} width={64} height={64} />
                    </div>
                ))}
            </div>
        </div>
    </section>
    )
}

export default DevTools;