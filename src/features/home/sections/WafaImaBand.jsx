/** Bandeau « Contactez Wafa IMA ». */
export default function WafaImaBand({ t }) {
  return (
    <section className="wafa-ima-band" id="wafa-ima" aria-labelledby="wafa-ima-title">
      <div className="container wafa-ima-inner">
        <h2 className="wafa-ima-title" id="wafa-ima-title">{t('wafaIma.title')}</h2>
        <a className="wafa-ima-btn" href="tel:+212529075100" dir="ltr">+212 52 90 751 00</a>
      </div>
    </section>
  );
}
