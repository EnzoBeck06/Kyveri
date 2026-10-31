export function Icon({ name, className = "" }) {
  const classes = ["icon", name === "arrow" && "arrow", className]
    .filter(Boolean)
    .join(" ");

  return (
    <svg className={classes} aria-hidden="true" focusable="false">
      <use href={`#${name}`} />
    </svg>
  );
}

export function IconLibrary() {
  return (
    <svg
      className="icon-library"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <symbol id="whatsapp" viewBox="0 0 24 24">
          <path d="M20.5 11.6a8.6 8.6 0 0 1-12.8 7.5L3 20.5l1.4-4.6A8.6 8.6 0 1 1 20.5 11.6Z" />
          <path d="M8.1 7.3c.3-.3.7-.2.9.2l1 2c.1.3 0 .5-.5 1 .7 1.6 1.7 2.6 3.3 3.3.5-.5.8-1 1.2-.8l1.9.9c.4.2.4.6.2 1-.5 1-1.3 1.4-2.5 1.1-3.4-.8-6-3.5-6.6-6.4-.2-1 .3-1.8 1.1-2.3Z" />
        </symbol>
        <symbol id="arrow" viewBox="0 0 24 24">
          <path d="M4 12h16m-6-6 6 6-6 6" />
        </symbol>
        <symbol id="diagonal" viewBox="0 0 24 24">
          <path d="M6 18 18 6M6 6h12v12" />
        </symbol>
        <symbol id="devices" viewBox="0 0 24 24">
          <path d="M13 17H3V5h16v5M6 20h7M9 17v3" />
          <rect x="15" y="10" width="6" height="11" rx="1" />
          <path d="M17 18h2" />
        </symbol>
        <symbol id="phone" viewBox="0 0 24 24">
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <path d="M10 5h4M11 19h2" />
        </symbol>
        <symbol id="bolt" viewBox="0 0 24 24">
          <path d="m13 2-8 12h6l-1 8 9-13h-6l1-7Z" />
        </symbol>
        <symbol id="monitor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="1" />
          <path d="M2 13h20M9 17l-2 4h10l-2-4" />
        </symbol>
        <symbol id="pen" viewBox="0 0 24 24">
          <path d="m4 16 12-12a2.8 2.8 0 0 1 4 4L8 20l-6 2 2-6Zm10-10 4 4M4 16l4 4" />
        </symbol>
        <symbol id="pages" viewBox="0 0 24 24">
          <rect x="3" y="4" width="8" height="18" rx="1" />
          <path d="M11 10h6v12h-6M17 14h5v8h-5M6 7h2" />
        </symbol>
        <symbol id="diamond" viewBox="0 0 24 24">
          <path d="m2 8 5-5h10l5 5-10 14L2 8Zm0 0h20M7 3l5 19 5-19" />
        </symbol>
        <symbol id="layers" viewBox="0 0 24 24">
          <path d="m2 7 10-5 10 5-10 5L2 7Zm0 5 10 5 10-5M2 17l10 5 10-5" />
        </symbol>
      </defs>
    </svg>
  );
}
