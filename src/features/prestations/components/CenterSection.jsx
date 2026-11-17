import { forwardRef } from 'react';
import { AccordionItem, BulletList, Paragraphs, SectionTag, subrubriqueId } from './common';

/** Identifiant (#subrubrique-N) d'un élément du centre « À propos ». */
export const centerItemId = (entry, index) => subrubriqueId(Number.isInteger(entry.navIndex) ? entry.navIndex : index + 1);

/** Onglet « À propos » : présentation + accordéon des sous-rubriques. */
const CenterSection = forwardRef(function CenterSection({ center, visible, tabActive, openIndex, onOpenChange, seeMoreLabel }, ref) {
  return (
    <section ref={ref} className={`section page-section-soft prestation-center-section${tabActive ? ' is-tab-active' : ''}`} id={subrubriqueId(0)} hidden={!visible}>
      <div className="container">
        <div className="prestation-section-head">
          <SectionTag icon={center.icon || 'fa-house-medical'}>{center.badge}</SectionTag>
          <h2>{center.title}</h2>
          <p>{center.intro}</p>
        </div>
        {center.items?.length > 0 && (
          <div className="prestation-accordion">
            {center.items.map((entry, index) => {
              const id = centerItemId(entry, index);
              const open = openIndex === index;
              return (
                <AccordionItem key={id} id={id} icon={entry.icon} title={entry.title} open={open} onToggle={() => onOpenChange(open ? -1 : index)}>
                  <Paragraphs value={entry.body} />
                  <BulletList items={entry.bullets} />
                  {entry.seeMore && (
                    <a className="prestation-see-more" href={`#${id}`}>{`${seeMoreLabel} `}<i className="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
                  )}
                </AccordionItem>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
});

export default CenterSection;
