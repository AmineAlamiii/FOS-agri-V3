import { forwardRef } from 'react';
import { Accordion, AccordionItem, BulletList, Paragraphs, SectionTag } from './common';

/** Onglet « Assistance médicale et transport sanitaire ». */
const AmtsSection = forwardRef(function AmtsSection({ detail, visible }, ref) {
  return (
    <section ref={ref} className={`section page-section-soft prestation-amts-section${visible ? ' is-tab-active' : ''}`} id="assistance-medicale-transport-sanitaire" hidden={!visible}>
      <div className="container">
        <div className="prestation-amc-hero prestation-amts-hero">
          <SectionTag icon="fa-truck-medical">{detail.badge}</SectionTag>
          <h2>{detail.title}</h2>
          <Paragraphs value={detail.subtitle} />
        </div>

        <div className="prestation-amts-beneficiaries">
          <div className="prestation-amc-block-head">
            <SectionTag icon="fa-people-roof">{detail.beneficiariesTitle}</SectionTag>
          </div>
          <div className="prestation-amts-beneficiary-grid">
            {detail.beneficiaries.map(([number, text], index) => (
              <article key={index} className="prestation-amts-beneficiary-card">
                <strong>{number}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="prestation-amc-block">
          <div className="prestation-amc-block-head">
            <SectionTag icon="fa-list-check">{detail.prestationsTitle}</SectionTag>
          </div>
          <div className="prestation-amts-group-list">
            {detail.groups.map((group, groupIndex) => (
              <article key={groupIndex} className="prestation-amts-group">
                <div className="prestation-amts-group-head">
                  <span><i className={`fa-solid ${group.icon}`} aria-hidden="true"></i></span>
                  <h3>{group.title}</h3>
                </div>
                <Accordion
                  className="prestation-accordion prestation-amts-accordion"
                  items={group.services}
                  initialOpen={0}
                  render={([title, content], index, { open, toggle }) => (
                    <AccordionItem key={index} className="prestation-amts-service" icon="fa-circle-plus" title={title} open={open} onToggle={toggle}>
                      {Array.isArray(content) ? <BulletList items={content} /> : <Paragraphs value={content} />}
                    </AccordionItem>
                  )}
                />
              </article>
            ))}
          </div>
        </div>

        <div className="prestation-amc-block">
          <div className="prestation-amc-block-head">
            <SectionTag icon="fa-file-signature">{detail.funeralTitle}</SectionTag>
          </div>
          {detail.funeralSubtitle && <h3 className="prestation-amts-funeral-subtitle">{detail.funeralSubtitle}</h3>}
          <div className="prestation-amts-funeral-grid">
            {detail.funeralCards.map(([title, bullets], index) => (
              <article key={index} className="prestation-amts-funeral-card">
                <h3>{title}</h3>
                <BulletList items={bullets} />
              </article>
            ))}
          </div>
        </div>

        <aside className="prestation-amts-contact">
          <span><i className="fa-solid fa-headset" aria-hidden="true"></i></span>
          <div>
            <h3>{detail.contactTitle}</h3>
            <p>{detail.contactIntro}</p>
            <p>{detail.contactInstruction}</p>
            <a href="tel:+212529075100">{detail.phone}</a>
          </div>
        </aside>
      </div>
    </section>
  );
});

export default AmtsSection;
