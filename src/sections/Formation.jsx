import { useState, useEffect } from 'react';
import fetchData from '@apis/server';

const Formation = () => {
    const [serverLinks, setServerLinks] = useState([]);
    const [loadingLinks, setLoadingLinks] = useState(true);
    const [linksError, setLinksError] = useState(null);

    useEffect(() => {
        fetchData('formations')
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
                    title: d.title || '',
                    diploma: d.diploma || '',
                    date: d.date || '',
                    image: d.image || '',
                    alt: d.alt || ''
                }));

                if (links.length) setServerLinks(links);
            })
            .catch(err => {
                console.debug('Fetch /api/formations failed:', err.message);
                setLinksError(err.message);
            })
            .finally(() => setLoadingLinks(false));
    }, [serverLinks]);

    return (
    <section className="c-space my-20" id="formation">
      <div className="w-full text-white">
        <p className="head-text">My Formation</p>

        <div className="col-span-2 rounded-lg bg-zinc-950 border border-zinc-700 shadow-lg shadow-black-900/50 overflow-hidden">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {serverLinks.map((item, index) => (
                <div key={index} className="grid grid-cols-[auto_1fr] items-start gap-5  transition-all ease-in-out duration-500 hover:bg-black-300 rounded-lg sm:px-5 px-2.5 group">
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="rounded-3xl w-16 h-16 p-2">
                      <img className="w-full h-full" src={`/assets/formations/${item.image}`} alt={item.alt} />
                    </div>

                    <div className="flex-1 w-0.5 mt-4 h-full bg-zinc-700 group-hover:bg-black-500 group-last:hidden" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5">
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-sm mb-5">
                      {item.diploma} -- <span>{item.date}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
    )
}

export default Formation;