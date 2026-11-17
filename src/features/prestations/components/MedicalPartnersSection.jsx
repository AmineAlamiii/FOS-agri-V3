import { useEffect, useMemo, useRef, useState } from 'react';
import { medicalPartnersData } from '@/data/medicalPartners';
import { medicalRegionsMapSvg } from '@/data/medicalRegionsMap';
import { assetUrl } from '@/lib/paths';
import {
  formatMedicalContactValue, formatMedicalOpeningDate, medicalCategoryFilterValue, medicalCategoryIcon,
  medicalMapRegionAliases, medicalNoticeActions, medicalRegionFromName, medicalRegionLabel, medicalRegionMeta,
  normalizeMedicalValue, splitMedicalOffer, translateMedicalCategory, uniqueMedicalValues
} from '../data/medical';
import { scrollToServiceTarget } from '../lib/serviceScroll';
import { Paragraphs, SectionTag } from './common';

const PAGE_SIZE = 4;
const SVG_NS = 'http://www.w3.org/2000/svg';
const regional = medicalPartnersData.filter((entry) => entry.section === 'regional');
const central = medicalPartnersData.filter((entry) => entry.section === 'central');
const regionIdOf = (entry) => medicalRegionFromName(entry.region)?.id || '';
// Identifiant d'origine de chaque tracé de la carte (avant application des alias).
const ORIGINAL_REGION = new WeakMap();

/** Partenaires visibles pour une région (Rabat-Salé-Kénitra = niveau central). */
function entriesForRegion(region) {
  if (!region) return regional.concat(central);
  if (region === 'rabat-sale-kenitra') return central;
  return regional.filter((entry) => regionIdOf(entry) === region);
}

/** Nom de la région survolée/sélectionnée, dessiné sur la carte. */
function paintMapLabel(mapMount, regionId, regionPath, lang) {
  const svgRoot = mapMount?.querySelector('svg');
  if (!svgRoot) return;
  let layer = svgRoot.querySelector('#medical-map-overlays');
  if (!layer) {
    layer = document.createElementNS(SVG_NS, 'g');
    layer.id = 'medical-map-overlays';
    layer.style.pointerEvents = 'none';
    svgRoot.appendChild(layer);
  }
  layer.innerHTML = '';
  const region = medicalRegionMeta.find((entry) => entry.id === regionId);
  if (!region?.target) return;
  const path = regionPath || [...mapMount.querySelectorAll('[data-region]')].find((node) => node.getAttribute('data-region') === regionId);
  const box = path?.getBBox ? path.getBBox() : null;
  const target = box ? { x: box.x + box.width / 2, y: box.y + box.height / 2 } : region.target;
  const label = medicalRegionLabel(region, lang);
  const textY = Math.max(24, target.y - 12);
  const textX = Math.min(560, Math.max(120, target.x));
  const circle = document.createElementNS(SVG_NS, 'circle');
  Object.entries({ cx: target.x, cy: target.y, r: '5.5', fill: '#1f6a43', stroke: '#fff', 'stroke-width': '2' }).forEach(([k, v]) => circle.setAttribute(k, v));
  layer.appendChild(circle);
  ['halo', 'label'].forEach((type) => {
    const text = document.createElementNS(SVG_NS, 'text');
    const attrs = { x: textX, y: textY, 'text-anchor': 'middle', 'font-size': String(label.length > 24 ? 16 : 18), 'font-weight': '800', 'font-family': 'Inter, Outfit, sans-serif' };
    Object.assign(attrs, type === 'halo' ? { fill: 'none', stroke: '#ffffff', 'stroke-width': '3.5', 'stroke-linejoin': 'round' } : { fill: '#1f6a43' });
    Object.entries(attrs).forEach(([k, v]) => text.setAttribute(k, v));
    text.textContent = label;
    layer.appendChild(text);
  });
}

function PartnerCard({ entry, copy, lang }) {
  const rawTitle = entry.organisme || entry.medecin || translateMedicalCategory(entry.categorie, lang) || copy.organization;
  const { name: title, offer } = splitMedicalOffer(rawTitle);
  const actions = medicalNoticeActions(entry, copy);
  const rows = [
    [entry.dateOuverture, copy.openingDate, () => formatMedicalOpeningDate(entry.dateOuverture)],
    [entry.adresse, copy.address, () => entry.adresse],
    [entry.telephone, copy.phone, () => formatMedicalContactValue(entry.telephone)],
    [entry.fax, copy.fax, () => formatMedicalContactValue(entry.fax)],
    [entry.email, copy.email, () => entry.email]
  ].filter(([value]) => value);
  return (
    <article className="medical-partner-card">
      <div className="medical-partner-card-top">
        <span><i className="fa-solid fa-location-dot" aria-hidden="true"></i>{entry.ville || '—'}</span>
        <span>{translateMedicalCategory(entry.categorie || '', lang)}</span>
      </div>
      <h3>{title}</h3>
      {offer && <p className="medical-offer-badge"><i className="fa-solid fa-tag" aria-hidden="true"></i>{` ${offer}`}</p>}
      {entry.medecin && <p className="medical-partner-doctor"><strong>{`${copy.doctor} :`}</strong>{` ${entry.medecin}`}</p>}
      <dl>
        {rows.map(([, label, format]) => <div key={label}><dt>{label}</dt><dd>{format()}</dd></div>)}
      </dl>
      {actions.length > 0 && (
        <div className="medical-notice-actions">
          {actions.map((action) => (action.href
            ? <a key={action.label} className="medical-notice-button" href={assetUrl(action.href)} download>{action.label}</a>
            : <button key={action.label} className="medical-notice-button" type="button" disabled>{action.label}</button>))}
        </div>
      )}
    </article>
  );
}

function Pagination({ page, totalPages, copy, onPage }) {
  if (totalPages <= 1) return null;
  return (
    <>
      <button type="button" disabled={page === 1} onClick={() => onPage(Math.max(1, page - 1))}>{copy.previousPage}</button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
        <button key={number} type="button" className={number === page ? 'is-active' : ''} aria-label={`${copy.pageLabel} ${number}`} aria-current={number === page ? 'page' : 'false'} onClick={() => onPage(number)}>{number}</button>
      ))}
      <button type="button" disabled={page === totalPages} onClick={() => onPage(Math.min(totalPages, page + 1))}>{copy.nextPage}</button>
    </>
  );
}

/** Conventions médicales : carte des régions, filtres et liste paginée. */
export default function MedicalPartnersSection({ section, copy, lang }) {
  const widgetRef = useRef(null);
  const mapRef = useRef(null);
  const resultsRef = useRef(null);
  const activePathRef = useRef(null);
  const regionRef = useRef('');
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);
  const [scrollRequest, setScrollRequest] = useState(0);

  const base = useMemo(() => entriesForRegion(region), [region]);
  const categories = useMemo(() => uniqueMedicalValues(base, 'categorie'), [base]);
  // Comme avant : la catégorie choisie est oubliée si elle n'existe pas dans la nouvelle région.
  const activeCategory = categories.includes(category) ? category : '';
  const q = normalizeMedicalValue(query);
  const entries = base.filter((entry) => {
    if (activeCategory && medicalCategoryFilterValue(entry.categorie) !== activeCategory) return false;
    if (!q) return true;
    return normalizeMedicalValue([
      entry.medecin, entry.organisme, entry.categorie, entry.adresse, entry.ville,
      formatMedicalOpeningDate(entry.dateOuverture), formatMedicalContactValue(entry.telephone),
      formatMedicalContactValue(entry.fax), entry.email
    ].join(' ')).includes(q);
  });
  const showEntries = Boolean(region) || Boolean(activeCategory);
  const totalPages = showEntries ? Math.max(1, Math.ceil(entries.length / PAGE_SIZE)) : 1;
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const selectedRegion = medicalRegionMeta.find((entry) => entry.id === region) || null;

  const selectRegion = (value, path = null) => {
    activePathRef.current = path;
    setRegion(value);
    setPage(1);
  };
  const selectCategory = (value) => {
    setCategory(value || '');
    setPage(1);
    setScrollRequest((count) => count + 1);
  };

  // Carte SVG : préparation des régions (alias, accessibilité, événements).
  useEffect(() => {
    const mount = mapRef.current;
    if (!mount) return undefined;
    const paths = [...mount.querySelectorAll('[data-region]')];
    const cleanups = paths.map((path) => {
      if (!ORIGINAL_REGION.has(path)) ORIGINAL_REGION.set(path, path.getAttribute('data-region'));
      const original = ORIGINAL_REGION.get(path);
      const id = medicalMapRegionAliases[original] || original;
      const meta = medicalRegionMeta.find((entry) => entry.id === id);
      path.dataset.region = id;
      path.setAttribute('tabindex', '0');
      path.setAttribute('role', 'button');
      path.setAttribute('aria-label', medicalRegionLabel(meta, lang));
      const onEnter = () => paintMapLabel(mount, id, path, lang);
      const onLeave = () => paintMapLabel(mount, regionRef.current, activePathRef.current, lang);
      const onClick = () => selectRegion(id, path);
      const onKey = (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        selectRegion(id, path);
      };
      path.addEventListener('mouseenter', onEnter);
      path.addEventListener('mouseleave', onLeave);
      path.addEventListener('click', onClick);
      path.addEventListener('keydown', onKey);
      return () => {
        path.removeEventListener('mouseenter', onEnter);
        path.removeEventListener('mouseleave', onLeave);
        path.removeEventListener('click', onClick);
        path.removeEventListener('keydown', onKey);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [lang]);

  // Région active : surbrillance sur la carte + étiquette.
  useEffect(() => {
    const mount = mapRef.current;
    if (!mount) return;
    regionRef.current = region;
    mount.querySelectorAll('[data-region]').forEach((path) => {
      const active = Boolean(region) && (activePathRef.current ? path === activePathRef.current : path.getAttribute('data-region') === region);
      path.classList.toggle('is-active', active);
      path.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    paintMapLabel(mount, region, activePathRef.current, lang);
  }, [region, lang]);

  // Après un choix de catégorie : défilement vers les résultats.
  useEffect(() => {
    if (!scrollRequest) return undefined;
    const timer = window.setTimeout(() => {
      scrollToServiceTarget(resultsRef.current, widgetRef.current, { duration: 850, respectReducedMotion: false });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [scrollRequest]);

  const categoryOptions = [{ value: '', label: copy.allCategories, icon: 'fa-layer-group' }]
    .concat(categories.map((value) => ({ value, label: translateMedicalCategory(value, lang), icon: medicalCategoryIcon(value) })));

  return (
    <div ref={widgetRef} className="container">
      <article className="prestation-extra-card medical-partners-intro">
        <SectionTag icon="fa-file-contract">{section.badge || copy.badge}</SectionTag>
        <h2>{section.title || copy.title}</h2>
        <Paragraphs value={section.intro || copy.intro} />
      </article>

      <div className="medical-partner-layout">
        <section className={`medical-partner-panel medical-partner-regional ${open ? 'is-open' : 'is-collapsed'}`} aria-label={copy.regionalTitle}>
          <button className="medical-partner-panel-head" type="button" aria-expanded={open ? 'true' : 'false'} onClick={() => setOpen(!open)}>
            <div>
              <SectionTag icon="fa-map-location-dot">{copy.regionalTitle}</SectionTag>
              <p>{copy.regionalIntro}</p>
            </div>
            <span className="medical-panel-meta">
              <strong>{showEntries ? `${entries.length} ${copy.results}` : ''}</strong>
              <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
            </span>
          </button>
          <div className="medical-partner-panel-body" hidden={!open}>
            <div className="medical-partner-filters">
              <label>
                <span>{copy.search}</span>
                <input type="search" placeholder={copy.searchPlaceholder} autoComplete="off" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />
              </label>
              <label>
                <span>{copy.region}</span>
                <select value={region} onChange={(event) => selectRegion(event.target.value || '')}>
                  <option value="">{copy.allRegions}</option>
                  {medicalRegionMeta.map((entry) => <option key={entry.id} value={entry.id}>{medicalRegionLabel(entry, lang)}</option>)}
                </select>
              </label>
              <label>
                <span>{copy.category}</span>
                <select value={activeCategory} onChange={(event) => selectCategory(event.target.value)}>
                  <option value="">{copy.allCategories}</option>
                  {categories.map((value) => <option key={value} value={value}>{translateMedicalCategory(value, lang)}</option>)}
                </select>
              </label>
              <div className="medical-category-buttons" aria-label={copy.category}>
                {categoryOptions.map((option) => [
                  ' ',
                  <button key={option.value || 'all'} className={`medical-category-button${option.value === activeCategory ? ' is-active' : ''}`} type="button" aria-pressed={option.value === activeCategory ? 'true' : 'false'} onClick={() => selectCategory(option.value)}>
                    <i className={`fa-solid ${option.icon}`} aria-hidden="true"></i>
                    <span>{option.label}</span>
                  </button>
                ])}
              </div>
            </div>
            <div className="medical-map-layout">
              {/* SVG fourni tel quel : React ne gère pas son contenu (régions préparées dans l'effet). */}
              <div ref={mapRef} className="medical-map-card medical-region-map" aria-label={copy.mapLabel} dangerouslySetInnerHTML={{ __html: medicalRegionsMapSvg }}></div>
            </div>
            <div className="medical-selected-region">
              <span>{copy.selectedRegion}</span>
              <strong>{selectedRegion ? medicalRegionLabel(selectedRegion, lang) : copy.allRegions}</strong>
            </div>
            <div ref={resultsRef} className="medical-partner-results">
              {!showEntries && <p className="medical-partner-empty">{copy.selectRegionalFilter}</p>}
              {showEntries && !entries.length && <p className="medical-partner-empty">{copy.noRegional}</p>}
              {showEntries && entries.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((entry, index) => (
                <PartnerCard key={`${entry.organisme}-${index}`} entry={entry} copy={copy} lang={lang} />
              ))}
            </div>
            <div className="medical-pagination">
              {showEntries && entries.length > 0 && <Pagination page={currentPage} totalPages={totalPages} copy={copy} onPage={setPage} />}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
