import { forwardRef } from 'react';
import { banquesLogementConsommation, banquesLogementImmobilier } from '@/data/banquesLogement';
import { assetUrl } from '@/lib/paths';
import { cultureLabels } from '../data/prestations.content';
import { Accordion, AccordionItem, BulletList, KeyRows, MiniCards, Paragraphs, PartnerLogo, SectionTag, subrubriqueId } from './common';
import MedicalPartnersSection from './MedicalPartnersSection';

/** Enveloppe commune des onglets complémentaires (#subrubrique-N). */
const ExtraPanel = forwardRef(function ExtraPanel({ navIndex, className = '', visible, tabActive, ownContainer = false, children }, ref) {
  return (
    <section ref={ref} className={`section page-section-soft prestation-extra-section${className ? ` ${className}` : ''}${tabActive ? ' is-tab-active' : ''}`} id={subrubriqueId(navIndex)} hidden={!visible}>
      {ownContainer ? children : <div className="container">{children}</div>}
    </section>
  );
});

function ExtraIntroCard({ icon, badge, title, intro }) {
  return (
    <article className="prestation-extra-card">
      <SectionTag icon={icon}>{badge}</SectionTag>
      <h2>{title}</h2>
      <Paragraphs value={intro} />
    </article>
  );
}

function Beneficiaries({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className="prestation-extra-block">
      <div className="prestation-amc-block-head">
        <SectionTag icon="fa-people-roof">{title}</SectionTag>
      </div>
      <MiniCards items={items} />
    </div>
  );
}

/** Bloc de contenu : cartes de montants ou accordéon (premier élément ouvert). */
function ExtraBlock({ block }) {
  const entries = block.items || [];
  return (
    <div className="prestation-extra-block">
      {(block.title || block.intro) && (
        <div className="prestation-amc-block-head">
          {block.title && <SectionTag icon={block.icon || 'fa-list-check'}>{block.title}</SectionTag>}
          {block.intro && <p>{block.intro}</p>}
        </div>
      )}
      {block.mode === 'cards' ? (
        <div className="prestation-extra-contribution-grid">
          {entries.map((entry, index) => (
            <article key={index} className="prestation-extra-contribution-card">
              <strong>{entry.amount || entry.title}</strong>
              <span>{entry.label || entry.text || ''}</span>
            </article>
          ))}
        </div>
      ) : (
        <Accordion
          className="prestation-accordion prestation-extra-accordion"
          items={entries}
          initialOpen={0}
          render={(entry, index, { open, toggle }) => (
            <AccordionItem key={index} className="prestation-extra-accordion-item" icon={entry.icon || 'fa-circle-info'} title={entry.title} open={open} onToggle={toggle}>
              <Paragraphs value={entry.body} />
              <BulletList items={entry.bullets} />
              <KeyRows rows={entry.rows} />
            </AccordionItem>
          )}
        />
      )}
    </div>
  );
}

/** Offres bancaires (crédits immobiliers ou à la consommation). */
function BankOffers({ section, copy }) {
  const banks = section.category === 'consommation' ? banquesLogementConsommation : banquesLogementImmobilier;
  return (
    <>
      <ExtraIntroCard icon={section.icon || 'fa-building-columns'} badge={section.badge || copy.title} title={section.title || copy.title} intro={section.intro || copy.intro} />
      <div className="bank-offers-grid">
        {banks.map((bank) => (
          <article key={bank.slug} className="bank-card bank-offer-card">
            <PartnerLogo src={assetUrl(`assets/images/banks/${bank.logo || `${bank.slug}.png`}`)} name={bank.name} />
            <h3 className="bank-card-name">{bank.name}</h3>
            {bank.ageLimit && <p className="bank-card-age"><span>{copy.ageLabel}</span><strong>{bank.ageLimit}</strong></p>}
            <a className="bank-card-download" href={assetUrl(bank.pdf)} download>
              <i className="fa-solid fa-download" aria-hidden="true"></i>{` ${copy.download}`}
            </a>
          </article>
        ))}
      </div>
    </>
  );
}

function CultureBlock({ label, children }) {
  return <div className="culture-block"><h3>{label}</h3>{children}</div>;
}

/** Rubrique culture (aperçu, bénéficiaires, inscription, pièces, destinations, célébrations). */
function CultureRubrique({ section, lang }) {
  const labels = section.labels || cultureLabels(lang);
  const blocks = [
    section.apercu?.length > 0 && <CultureBlock key="apercu" label={labels.apercu}><Paragraphs value={section.apercu} /></CultureBlock>,
    section.beneficiaires && <CultureBlock key="beneficiaires" label={labels.beneficiaires}><p>{section.beneficiaires}</p></CultureBlock>,
    section.inscription?.length > 0 && <CultureBlock key="inscription" label={labels.inscription}><BulletList items={section.inscription} /></CultureBlock>,
    section.pieces?.length > 0 && <CultureBlock key="pieces" label={labels.pieces}><BulletList items={section.pieces} /></CultureBlock>,
    section.destinations?.length > 0 && <CultureBlock key="destinations" label={labels.destinations}><BulletList items={section.destinations} /></CultureBlock>
  ].filter(Boolean);
  return (
    <>
      <article className="prestation-extra-card">
        <SectionTag icon={section.icon || 'fa-circle-check'}>{section.badge}</SectionTag>
        <h2>{section.title}</h2>
        {section.intro?.length > 0 && <Paragraphs value={section.intro} />}
      </article>
      {blocks.length > 0 && <div className="culture-blocks">{blocks}</div>}
      {section.celebrations?.length > 0 && (
        <Accordion
          className="prestation-accordion culture-accordion"
          items={section.celebrations}
          render={(celebration, index, { open, toggle }) => (
            <AccordionItem key={index} icon="fa-star" title={celebration.title} open={open} onToggle={toggle}>
              <Paragraphs value={celebration.body} />
            </AccordionItem>
          )}
        />
      )}
    </>
  );
}

/** Partenaires (logos + téléchargements), groupés. */
function CulturePartners({ section, lang }) {
  const labels = section.labels || cultureLabels(lang);
  return (
    <>
      <article className="prestation-extra-card">
        <SectionTag icon={section.icon || 'fa-handshake'}>{section.badge}</SectionTag>
        <h2>{section.title}</h2>
        {section.intro?.length > 0 && <Paragraphs value={section.intro} />}
      </article>
      <Beneficiaries title={section.beneficiariesTitle || labels.beneficiaires} items={section.beneficiaries} />
      {(section.groups || []).map((group, groupIndex) => (
        <div key={groupIndex} className="culture-partner-group">
          <h3 className="culture-partner-group-title"><i className="fa-solid fa-layer-group" aria-hidden="true"></i>{` ${group.title}`}</h3>
          {!group.items.length && <p className="culture-partner-empty">{labels.partnersSoon || ''}</p>}
          <div className="bank-offers-grid culture-partner-grid" hidden={!group.items.length}>
            {group.items.map((item, index) => (
              <article key={index} className="bank-offer-card culture-partner-card">
                <PartnerLogo className="bank-card-logo culture-partner-logo" src={item.logo ? assetUrl(item.logo) : ''} name={item.name} loading="eager" />
                <h4 className="bank-card-name">{item.name}</h4>
                {item.statut && <span className="culture-partner-status"><i className="fa-solid fa-circle-check" aria-hidden="true"></i>{` ${item.statut}`}</span>}
                {Array.isArray(item.pdfs) ? (
                  <div className="bank-card-downloads">
                    {item.pdfs.map((pdf, pdfIndex) => (
                      <a key={pdfIndex} className="bank-card-download" href={assetUrl(pdf.pdf)} download><i className="fa-solid fa-download" aria-hidden="true"></i>{` ${pdf.label || labels.download}`}</a>
                    ))}
                  </div>
                ) : (
                  <a className="bank-card-download" href={assetUrl(item.pdf)} download><i className="fa-solid fa-download" aria-hidden="true"></i>{` ${labels.download}`}</a>
                )}
              </article>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/** Onglet complémentaire générique (intro, bénéficiaires, blocs). */
function GenericExtra({ section, navIndex, subIcons }) {
  return (
    <>
      <ExtraIntroCard icon={section.icon || subIcons.prevoyance?.[navIndex] || 'fa-circle-check'} badge={section.badge} title={section.title} intro={section.intro} />
      <Beneficiaries title={section.beneficiariesTitle} items={section.beneficiaries} />
      {section.blocks?.map((block, index) => <ExtraBlock key={index} block={block} />)}
    </>
  );
}

const PANEL_CLASS = {
  medicalPartners: 'medical-partners-section',
  bankOffers: 'bank-offers-section',
  cultureRubrique: 'culture-section',
  culturePartners: 'culture-section'
};

/** Un onglet complémentaire, selon son type. */
export const ExtraSection = forwardRef(function ExtraSection({ section, navIndex, visible, labels, lang, subIcons }, ref) {
  let content;
  if (section.type === 'medicalPartners') content = <MedicalPartnersSection section={section} copy={labels.medicalPartners} lang={lang} />;
  else if (section.type === 'bankOffers') content = <BankOffers section={section} copy={labels.bankOffers} />;
  else if (section.type === 'cultureRubrique') content = <CultureRubrique section={section} lang={lang} />;
  else if (section.type === 'culturePartners') content = <CulturePartners section={section} lang={lang} />;
  else content = <GenericExtra section={section} navIndex={navIndex} subIcons={subIcons} />;
  return (
    <ExtraPanel ref={ref} navIndex={navIndex} className={PANEL_CLASS[section.type]} visible={visible} tabActive={visible} ownContainer={section.type === 'medicalPartners'}>
      {content}
    </ExtraPanel>
  );
});
