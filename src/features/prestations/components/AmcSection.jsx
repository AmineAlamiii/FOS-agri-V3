import { forwardRef, useEffect, useRef, useState } from 'react';
import { BulletList, Paragraphs, SectionTag } from './common';

/** Carte « disposition » repliable du carrousel AMC. */
function DispositionCard({ card, index, detail }) {
  const [expanded, setExpanded] = useState(false);
  const copyId = `amc-disposition-copy-${index}`;
  return (
    <article className={`prestation-amc-card${expanded ? ' is-expanded' : ''}`} data-amc-card>
      <div className="prestation-amc-card-head">
        <span className="prestation-amc-card-icon"><i className={`fa-solid ${card.icon || 'fa-shield-heart'}`} aria-hidden="true"></i></span>
        <h3>{card.title}</h3>
      </div>
      <div className="prestation-amc-card-copy" id={copyId}>
        <Paragraphs value={card.body} />
        <BulletList items={card.bullets} />
        <Paragraphs value={card.bodyAfter} />
      </div>
      <button className="prestation-amc-card-toggle" type="button" aria-expanded={expanded ? 'true' : 'false'} aria-controls={copyId} aria-label={`${expanded ? detail.collapseLabel : detail.expandLabel} : ${card.title}`} onClick={() => setExpanded(!expanded)}>
        <i className={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true"></i>
      </button>
    </article>
  );
}

/** Carrousel des dispositions (points de pagination + glisser sur mobile). */
function DispositionCarousel({ detail }) {
  const carouselRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;
    const cards = () => Array.from(carousel.querySelectorAll('[data-amc-card]'));
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    const updateDots = () => {
      const list = cards();
      if (!list.length) return;
      setActiveDot(list.reduce((best, card, index) => (
        Math.abs(card.offsetLeft - carousel.scrollLeft) < Math.abs(list[best].offsetLeft - carousel.scrollLeft) ? index : best
      ), 0));
    };
    const onScroll = () => window.requestAnimationFrame(updateDots);
    const onDown = (event) => {
      if (!window.matchMedia('(max-width: 680px)').matches) return;
      dragging = true;
      startX = event.clientX;
      startScroll = carousel.scrollLeft;
      carousel.classList.add('is-dragging');
    };
    const onMove = (event) => {
      if (dragging) carousel.scrollLeft = startScroll - (event.clientX - startX);
    };
    const onUp = () => {
      dragging = false;
      carousel.classList.remove('is-dragging');
      updateDots();
    };
    carousel.addEventListener('scroll', onScroll, { passive: true });
    carousel.addEventListener('pointerdown', onDown);
    carousel.addEventListener('pointermove', onMove);
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((name) => carousel.addEventListener(name, onUp));
    updateDots();
    return () => {
      carousel.removeEventListener('scroll', onScroll);
      carousel.removeEventListener('pointerdown', onDown);
      carousel.removeEventListener('pointermove', onMove);
      ['pointerup', 'pointercancel', 'pointerleave'].forEach((name) => carousel.removeEventListener(name, onUp));
    };
  }, []);

  const goTo = (index) => {
    carouselRef.current?.querySelectorAll('[data-amc-card]')[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  return (
    <>
      <div className="prestation-amc-card-grid" ref={carouselRef}>
        {detail.dispositions.map((card, index) => <DispositionCard key={index} card={card} index={index} detail={detail} />)}
      </div>
      <div className="prestation-amc-card-dots" aria-label={detail.paginationLabel}>
        {detail.dispositions.map((card, index) => [
          ' ',
          <button key={index} className={index === activeDot ? 'is-active' : ''} type="button" aria-label={card.title} aria-current={index === activeDot ? 'true' : 'false'} onClick={() => goTo(index)}></button>
        ])}{' '}
      </div>
    </>
  );
}

function CaseCard({ entry, index, optionIndex, detail }) {
  const [icon, title, body] = entry;
  const [open, setOpen] = useState(false);
  const contentId = `amc-case-${optionIndex}-${index}`;
  return (
    <article className={`prestation-amc-case-card${open ? ' is-open' : ''}`}>
      <button className="prestation-amc-case-trigger" type="button" aria-expanded={open ? 'true' : 'false'} aria-controls={contentId} aria-label={`${open ? detail.collapseLabel : detail.expandLabel} : ${title}`} onClick={() => setOpen(!open)}>
        <span className="prestation-amc-case-icon"><i className={`fa-solid ${icon}`} aria-hidden="true"></i></span>
        <span className="prestation-amc-case-title">{title}</span>
        <i className={`fa-solid ${open ? 'fa-minus' : 'fa-plus'} prestation-amc-case-toggle`} aria-hidden="true"></i>
      </button>
      <p className="prestation-amc-case-copy" id={contentId} hidden={!open}>{body}</p>
    </article>
  );
}

/** Une formule AMC : garanties (accordéon) + cas pratiques. */
function OptionPanel({ option, index, active, markActive, detail }) {
  const [openGuarantee, setOpenGuarantee] = useState(0);
  return (
    <section className={`prestation-amc-option-panel${markActive ? ' is-active' : ''}`} hidden={!active}>
      <div className="prestation-amc-option-head">
        <span>{option.title}{option.note && <>{' '}<small className="prestation-amc-option-note">{option.note}</small></>}</span>
        <p>{option.kicker}</p>
      </div>
      <div className="prestation-amc-guarantee-list">
        {option.guarantees.map((guarantee, guaranteeIndex) => {
          const open = openGuarantee === guaranteeIndex;
          return (
            <article key={guaranteeIndex} className={`prestation-amc-guarantee${open ? ' is-open' : ''}`}>
              <button className="prestation-amc-guarantee-trigger" type="button" aria-expanded={open ? 'true' : 'false'} onClick={() => setOpenGuarantee(open ? -1 : guaranteeIndex)}>
                <span>
                  <small>{String(guaranteeIndex + 1).padStart(2, '0')}</small>
                  <strong>{guarantee.title}</strong>
                </span>
                <i className={`fa-solid ${open ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true"></i>
              </button>
              <div className="prestation-amc-guarantee-content" hidden={!open}>
                <div className="prestation-amc-guarantee-grid">
                  <div>
                    <span className="prestation-amc-label">{detail.assuredLabel}</span>
                    <p>{guarantee.assured}</p>
                  </div>
                  <div>
                    <span className="prestation-amc-label">{detail.benefitsLabel}</span>
                    <BulletList items={guarantee.benefits} />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="prestation-amc-cases">
        <div className="prestation-amc-subhead">
          <SectionTag icon="fa-notes-medical">{`${detail.casesTitle} — ${option.title}`}</SectionTag>
        </div>
        <div className="prestation-amc-case-grid">
          {option.cases.map((entry, caseIndex) => <CaseCard key={caseIndex} entry={entry} index={caseIndex} optionIndex={index} detail={detail} />)}
        </div>
      </div>
    </section>
  );
}

/** Onglet « Assurance Maladie Complémentaire ». */
const AmcSection = forwardRef(function AmcSection({ detail, visible }, ref) {
  const [option, setOption] = useState(0);
  const [touched, setTouched] = useState(false);
  const choose = (index) => {
    setOption(index);
    setTouched(true);
  };
  return (
    <section ref={ref} className={`section page-section-soft prestation-amc-section${visible ? ' is-tab-active' : ''}`} id="assurance-maladie-complementaire" hidden={!visible}>
      <div className="container">
        <div className="prestation-amc-hero">
          <SectionTag icon="fa-shield-heart">{detail.tagLabel || 'AMC'}</SectionTag>
          <h2>{detail.title}</h2>
          <p>{detail.subtitle}</p>
        </div>

        <div className="prestation-amc-block">
          <div className="prestation-amc-block-head">
            <SectionTag icon="fa-file-contract">{detail.tagLabel || 'AMC'}</SectionTag>
            <h2 className="prestation-amc-block-title">{detail.dispositionsTitle}</h2>
          </div>
          <DispositionCarousel detail={detail} />
        </div>

        <div className="prestation-amc-block">
          <div className="prestation-amc-block-head is-split">
            <div>
              <SectionTag icon="fa-list-check">{detail.prestationsTitle}</SectionTag>
              <h3>{detail.title}</h3>
            </div>
            <div className="prestation-amc-option-tabs" role="tablist" aria-label={detail.prestationsTitle}>
              {detail.options.map((entry, index) => (
                <button key={index} className={index === option ? 'is-active' : ''} type="button" role="tab" aria-selected={index === option ? 'true' : 'false'} onClick={() => choose(index)}>
                  {entry.title}
                </button>
              ))}
            </div>
          </div>
          <div className="prestation-amc-options">
            {detail.options.map((entry, index) => (
              // « is-active » n'apparaît qu'après un premier choix d'onglet (comme avant).
              <OptionPanel key={index} option={entry} index={index} active={index === option} markActive={touched && index === option} detail={detail} />
            ))}
          </div>
        </div>

        <aside className="prestation-amc-note">
          <span><i className="fa-solid fa-circle-info" aria-hidden="true"></i></span>
          <div>
            <h3>{detail.noteTitle}</h3>
            <p>{detail.note}</p>
          </div>
        </aside>
      </div>
    </section>
  );
});

export default AmcSection;
