import { useState, useEffect } from 'react';

const DevSkills = () => {

    const [serverLinks, setServerLinks] = useState([]);
    const [loadingLinks, setLoadingLinks] = useState(true);
    const [linksError, setLinksError] = useState(null);

    useEffect(() => {
    fetch('/api/devSkills')
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
        console.debug('Fetch /api/devSkills failed:', err.message);
        setLinksError(err.message);
        })
        .finally(() => setLoadingLinks(false));
    }, [serverLinks]);
    return (
    <section className="c-space my-20" id="dev-skills">
        <p className="head-text">Dev skills</p>
        <div className="carousel-slider skills-slider" aria-hidden="true" aria-label="Development Skills Icons">
            <div className="slide-track" aria-hidden="true">
                {[...serverLinks, ...serverLinks].map((skill, index) => (
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