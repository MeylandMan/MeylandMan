const Button = ({ href, width, height, label, image, alt }) => {
  return (
    <a href={href}>
        <img src={image} alt={alt} aria-hidden="true" width={width} height={height}/>
        {label}
    </a>
  );
}

export default Button;