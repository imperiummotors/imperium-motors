export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}) {
  const classes = `im-button ${variant} ${size} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}