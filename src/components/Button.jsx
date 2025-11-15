const Button = ({ href, label, image, alt }) => {
  return (
    <a href={href}>
        <img src={image} alt={alt} aria-hidden="true"/>
        {label}
    </a>
  );
}

export default Button;