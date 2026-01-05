import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { experiences } from "@constants/index";

const Experience = () => {

    const [animationName, setAnimationName] = useState('idle');

    return (
    <section className="c-space my-20" id="experience">
      <div className="w-full text-white">
        <p className="head-text">My Work Experience</p>

        <div className="col-span-2 rounded-lg bg-zinc-950 border border-zinc-700 shadow-lg shadow-black-900/50 overflow-hidden">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {experiences.map((item, index) => (
                <div key={index} className="grid grid-cols-[auto_1fr] items-start gap-5  transition-all ease-in-out duration-500 hover:bg-black-300 rounded-lg sm:px-5 px-2.5 group">
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="rounded-3xl w-16 h-16 p-2">
                      <img className="w-full h-full" src={item.icon} alt="" />
                    </div>

                    <div className="flex-1 w-0.5 mt-4 h-full bg-zinc-700 group-hover:bg-black-500 group-last:hidden" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5">
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-sm mb-5">
                      {item.position} -- <span>{item.duration}</span>
                      <br />
                        <span className="italic">{item.location}</span>

                    </p>
                    <p className="transition-all ease-in-out duration-500">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
    )
}

export default Experience;