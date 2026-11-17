/**
 * Bandeau d'en-tête des pages secondaires.
 * `kicker` : { icon, text } — petit libellé au-dessus du titre (optionnel).
 */
export default function PageHero({ className = '', kicker, title, body, children }) {
  return (
    <section className={`page-hero-secondary${className ? ` ${className}` : ''}`}>
      <div className="container">
        {kicker && (
          <span className="page-kicker"><i className={kicker.icon}></i> <span>{kicker.text}</span></span>
        )}
        <h1>{title}</h1>
        {body !== undefined && <p>{body}</p>}
        {children}
      </div>
    </section>
  );
}
