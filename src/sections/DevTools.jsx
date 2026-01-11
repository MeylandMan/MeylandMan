import { useState, useEffect } from 'react';

const DevTools = () => {

    const [serverLinks, setServerLinks] = useState([]);
    const [loadingLinks, setLoadingLinks] = useState(true);
    const [linksError, setLinksError] = useState(null);

    useEffect(() => {
    fetch('/api/devTools')
        .then(res => {
        if (!res.ok) throw new Error('Network response not ok');
        console.debug(res);
        return res.json();
        })
        .then(data => {
        let links = [];
        if (Array.isArray(data) && data.length) {
            links = data;
        } else if (Array.isArray(data?.documents) && data.documents.length) {
            links = data.documents;
        } else if (data?.links && Array.isArray(data.links) && data.links.length) {
            links = data.links;
        }
        links = links.map((d, i) => ({
            id: (d._id && d._id.toString?.()) || d.id || String(i),
            name: d.name || '',
            icon: d.icon || ''
        }));

        if (links.length) setServerLinks(links);
        })
        .catch(err => {
        console.debug('Fetch /api/devTools failed:', err.message);
        setLinksError(err.message);
        })
        .finally(() => setLoadingLinks(false));
    }, [serverLinks]);
    return (
    <section className="c-space my-20" id="dev-tools">
        <p className="head-text">Dev Tools</p>
        <div className="carousel-slider tools-slider" aria-hidden="true" aria-label="Development Tools Icons">
            <div className="slide-track" aria-hidden="true">
                {[...serverLinks, ...serverLinks].map((tool, index) => (
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