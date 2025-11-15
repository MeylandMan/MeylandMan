import { footerLinks } from '@constants';

const Footer = () => {
    return (
    <footer>
        <p>©Copyright 2025 MeylandMan</p>
        <ul>
            {footerLinks.map((footer) => (
                <li>
                    <a key={footer.id} href={footer.link} target="_blank" rel="noreferrer">
                    <img src={footer.icon} alt={footer.name} />
                </a>
                </li>
            ))}
        </ul>
        <p><a href="">Term of Service</a></p>
    </footer>
    )
}

export default Footer;