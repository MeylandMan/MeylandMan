export const leftNavLinks = [
    {
        id: 0,
        name: "About",
        href: "#about",
    },
    {
        id: 1,
        name: "Formation",
        href: "#formation",
    },
    {
        id: 2,
        name: "Experience",
        href: "#experience",
    },
    {
        id: 3,
        name: "Projects",
        href: "#projects",
    },
    {
        id: 4,
        name: "Dev Tools",
        href: "#devtools",
    },
    {
        id: 5,
        name: "Skills",
        href: "#devskills",
    }
];

export const rightNavLinks = [
    {
        id: 0,
        name: "Get CV",
        href: "TODO:ADD CV HERE",
    },
    {
        id: 1,
        name: "Contact",
        href: "#contact",
    }
];

export const formations = [
    {
        id: 0,
        title: "Lycée Marianne",
        diploma: "DNB - Diplome National du Brevet",
        date: "Sept. 2020 - Jul. 2021",

        image: "",
        alt: "Lycée Marianne Logo",
    },
    {
        id: 1,
        title: "Lycée Marianne",
        diploma: "Baccalauréat Scientifique",
        date: "Sept. 2023 - Jul. 2024",

        image: "",
        alt: "Lycée Marianne Logo",
    },
    {
        id: 2,
        title: "Collège de Paris",
        diploma: "Bachelor Degree",
        date: "Oct. 2025 - today",

        image: "",
        alt: "Collège de Paris Logo",
    }
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.2 : isMobile ? 0.24 : 0.24,
    deskPosition: isSmall ? [0, -2.5, 0] : isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
  };
};

export const experiences = [
    {
        id: 0,
        title: "EVA STUDIO - Freelance Fullstack Developer",
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
        id: 0,
        title: "Mabble",
        description: "A cross-platform GPU backend library for 2D/3D rendering, designed to provide a unified API for various graphics APIs such as DirectX, Vulkan, and Metal. ",
        stack: ["C++", "CMake", "OpenGL", "Vulkan", "DirectX 12", "Metal"],
        link:"",
        source:"https://github.com/MeylandMan/Mabble",

        image: "",
        alt: "Mabble Repository",
    },
    {
        id: 1,
        title: "Raytracing",
        description: "A raytracing engine built from scratch in C++, created with \"Raytracing in One Weekend\" book by Peter Shirley.",
        stack: ["C++", "Premake"],
        link:"",
        source:"https://github.com/MeylandMan/Raytracing",

        image: "",
        alt: "Raytracing Repository",
    }
];

export const devTools = [
    {
        id: 0,
        name: "Visual Studio Code",
        icon: "vs-code.png",

    },
    {
        id:1,
        name: "Visual Studio",
        icon: "visual-studio.png",

    },
    {
        id: 2,
        name: "IntelliJ IDEA",
        icon: "intellij.png",

    },
    {
        id: 3,
        name: "Git",
        icon: "git.png",

    },
    {
        id: 4,
        name: "Github",
        icon: "github.webp",

    },
    {
        id: 5,
        name: "Notion",
        icon: "notion.png",

    },
    {
        id: 6,
        name: "Gamemaker Studio 2",
        icon: "gamemaker-studio-2.png",

    },
    {
        id: 7,
        name: "Godot Engine",
        icon: "godot.png",
    },
];

export const devSkills = [
    {
        id: 0,
        name: "Java",
        icon: "java.png",

    },
    {
        id: 1,
        name: "C++",
        icon: "cpp.png",

    },
     {
        id: 2,
        name: "Premake",
        icon: "premake.png",

    },
    {
        id: 3,
        name: "CMake",
        icon: "cmake.png",

    },
    {
        id: 4,
        name: "OpenGL",
        icon: "opengl.png",

    },
    {
        id: 5,
        name: "C#",
        icon: "cs.png",

    },
    {
        id: 6,
        name: "HTML",
        icon: "html.png",

    },
    {
        id: 7,
        name: "CSS",
        icon: "css.png",

    },
    {
        id: 8,
        name: "JavaScript",
        icon: "javascript.png",

    },
    {
        id: 9,
        name: "Tailwind CSS",
        icon: "tailwindcss.png",

    },
    {
        id: 10,
        name: "React",
        icon: "react.png",

    },
    {
        id: 11,
        name: "Vite",
        icon: "vite.svg",

    },
    {
        id: 12,
        name: "NextJS",
        icon: "nextjs.svg",

    },
    {
        id: 13,
        name: "Vitest",
        icon: "vitest.svg",

    },
    {
        id: 14,
        name: "MySQL",
        icon: "mysql.png",
    },
    {
        id: 15,
        name: "MongoDB",
        icon: "mongodb.png",

    },
];

export const footerLinks = [
    {
        id: 0,
        name: "GitHub",
        link: "https://github.com/MeylandMan",
        icon: "",
    },
    {
        id: 1,
        name: "Mailto",
        link: "mailto:m.dunooman0@gmail.com",
        icon: "",
    },
    {
        id: 2,
        name: "LinkedIn",
        link: "https://linkedin.com/in/Dunno-man0",
        icon: "",
    },
    {
        id: 3,
        name: "Youtube",
        link: "https://youtube.com/@dunno_man0",
        icon: "",
    },
    {
        id: 4,
        name: "Twitter",
        link: "https://twitter.com/@Dunno_man0",
        icon: "",
    }
];