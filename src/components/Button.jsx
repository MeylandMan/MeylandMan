const Button = ({ name, isBeam = false, containerClass, type = "button", ...props }) => {
  return (
    <button type={type} {...props} className={`btn ${containerClass}`}>
      {isBeam && (
        <span className="relative flex h-3 w-3">
          <span className="btn-ping"></span>
          <span className="btn-ping-dot"></span>
        </span>
      )}
      {name}
    </button>
  );
};

export default Button;