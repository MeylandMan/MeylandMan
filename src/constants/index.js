
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

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.2 : isMobile ? 0.24 : 0.24,
    deskPosition: isSmall ? [0, -2.5, 0] : isMobile ? [0, -4.5, 0] : [0, -5.5, 0],  };
};

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