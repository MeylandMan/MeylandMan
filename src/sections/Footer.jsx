import { useState, useEffect } from 'react';

import fetchData from '@apis/server';

const Footer = () => {

    const [serverLinks, setServerLinks] = useState([]);
    const [loadingLinks, setLoadingLinks] = useState(true);
    const [linksError, setLinksError] = useState(null);

    useEffect(() => {
        fetchData('footerLinks')
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
                link: d.link || '',
                icon: d.icon || ''
            }));

            if (links.length) setServerLinks(links);
            })
            .catch(err => {
            console.debug('Fetch /api/footerLinks failed:', err.message);
            setLinksError(err.message);
            })
            .finally(() => setLoadingLinks(false));
    }, [serverLinks]);

    return (
    <footer className="w-full bg-gray-900 py-8 px-5">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
            <p className="text-gray-gradient text-lg font-medium">©Copyright 2025 - Allan Meyland</p>
            <ul className="flex gap-6">
                {serverLinks.map((item, index) => (
                    <li key={index} className="transition-transform hover:scale-110">
                        <a href={item.link} target="_blank" rel="noreferrer" className="block">
                            <img src={item.icon} alt={item.name} className="w-8 h-8 filter brightness-75 hover:brightness-100 transition-all" />
                        </a>
                    </li>
                ))}
            </ul>
            <p className="text-neutral-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </p>
        </div>
    </footer>
    )
}

export default Footer;