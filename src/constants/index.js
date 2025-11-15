import { describe } from "vitest";

export const formations = [
    {
        title: "Lycée Marianne",
        diploma: "DNB - Diplome National du Brevet",
        date: "Sept. 2020 - Jul. 2021",

        image: "",
        alt: "Lycée Marianne Logo",
    },
    {
        title: "Lycée Marianne",
        diploma: "Baccalauréat Scientifique",
        date: "Sept. 2023 - Jul. 2024",

        image: "",
        alt: "Lycée Marianne Logo",
    },
    {
        title: "Collège de Paris",
        diploma: "Bachelor Degree",
        date: "Oct. 2025 - today",

        image: "",
        alt: "Collège de Paris Logo",
    }
];

export const experiences = [
    {
        title: "Freelance Fullstack Developer",
        status: "Ongoing",
        date: "Aug. 2025 - today",
        location: "Île-de-France, France · Remote",
        description: [
            {
                text: "Developing web applications for various clients using modern technologies such as React, Node.js, and Tailwind CSS.",
            },
            {
                text: "Collaborating with clients to gather requirements, provide updates, and ensure satisfaction with the final product.",
            },
            {
                text: "maintaining and updating existing applications to improve performance, fix bugs, and add new features.",
            },
            {
                text: "lead development projects from conception to deployment, ensuring timely delivery and adherence to client specifications.",
            }
        ]
    }
];

export const projects = [
    {
        title: "Mabble",
        description: "A cross-platform GPU backend library for 2D/3D rendering, designed to provide a unified API for various graphics APIs such as DirectX, Vulkan, and Metal. ",
        stack: ["C++", "CMake", "OpenGL", "Vulkan", "DirectX 12", "Metal"],
        link:"",
        source:"https://github.com/MeylandMan/Mabble",

        image: "",
        alt: "Mabble Repository",
    },
    {
        title: "Raytracing",
        description: "A raytracing engine built from scratch in C++, created with \"Raytracing in One Weekend\" book by Peter Shirley.",
        stack: ["C++", "Premake"],
        link:"",
        source:"https://github.com/MeylandMan/Raytracing",

        image: "",
        alt: "Raytracing Repository",
    }
];