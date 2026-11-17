import { useEffect, useRef, useState } from 'react';
import { siteData } from '@/data/siteData';
import { localizedEntry } from '@/i18n/useSiteT';
import { url } from '@/lib/paths';
import { MOROCCO_MAP_SVG } from '../data/moroccoMap';

const SVG_NS = 'http://www.w3.org/2000/svg';
const REGIONS = siteData.regions;
const getRegion = (key) => REGIONS.find((item) => item.key === key) || REGIONS[0];
const DEFAULT_REGION = REGIONS.some((region) => region.key === 'tanger-tetouan-al-hoceima') ? 'tanger-tetouan-al-hoceima' : REGIONS[0].key;

/** Associe chaque tracé SVG à la région dont le point cible est le plus proche. */
function assignRegionsToPaths(paths) {
  const entries = paths.map((path) => {
    const box = path.getBBox();
    return { path, cx: box.x + box.width / 2, cy: box.y + box.height / 2 };
  });
  const regions = REGIONS.map((region) => ({ ...region }));
  const matches = [];
  while (entries.length && regions.length) {
    let best = null;
    entries.forEach((entry, entryIndex) => {
      regions.forEach((region, regionIndex) => {
        const distance = Math.hypot(entry.cx - region.target.x, entry.cy - region.target.y);
        if (!best || distance < best.distance) best = { distance, entryIndex, regionIndex };
      });
    });
    const [entry] = entries.splice(best.entryIndex, 1);
    const [region] = regions.splice(best.regionIndex, 1);
    matches.push({ key: region.key, path: entry.path, center: { x: entry.cx, y: entry.cy } });
  }
  return matches;
}

/** Colore les régions et dessine l'étiquette de la région active/survolée. */
function paintMap(mount, pathMap, centers, activeKey, hoverKey, lang) {
  const svgRoot = mount?.querySelector('svg');
  if (!svgRoot) return;
  let layer = svgRoot.querySelector('#map-overlays');
  if (!layer) {
    layer = document.createElementNS(SVG_NS, 'g');
    layer.id = 'map-overlays';
    svgRoot.appendChild(layer);
  }
  layer.innerHTML = '';
  pathMap.forEach((path, key) => {
    const stateful = hoverKey === key || activeKey === key;
    Object.assign(path.style, {
      fill: stateful ? '#c8a44d' : '#266a63',
      stroke: '#eef3ec',
      strokeWidth: '1.4',
      cursor: 'pointer',
      transition: 'fill 0.18s ease, opacity 0.18s ease',
      opacity: stateful ? '1' : '0.98'
    });
    if (!stateful) return;
    const region = getRegion(key);
    const target = centers.get(key) || region.target;
    const name = localizedEntry(region, lang).name;
    const circle = document.createElementNS(SVG_NS, 'circle');
    Object.entries({ cx: target.x, cy: target.y, r: '5.5', fill: '#1f6a43', stroke: '#fff', 'stroke-width': '2' }).forEach(([k, v]) => circle.setAttribute(k, v));
    layer.appendChild(circle);
    [{ fill: 'none', stroke: '#ffffff', 'stroke-width': '3', 'stroke-linejoin': 'round' }, { fill: '#1f6a43' }].forEach((extra) => {
      const text = document.createElementNS(SVG_NS, 'text');
      Object.entries({ x: target.x, y: target.y - 12, 'text-anchor': 'middle', ...extra, 'font-size': '18', 'font-weight': '800', 'font-family': 'Inter, Outfit, sans-serif' })
        .forEach(([k, v]) => text.setAttribute(k, v));
      text.style.pointerEvents = 'none';
      text.textContent = name;
      layer.appendChild(text);
    });
  });
}

/** Présence nationale : carte interactive des régions + délégation. */
export default function MapSection({ t, lang }) {
  const mountRef = useRef(null);
  const pathMapRef = useRef(null);
  const centersRef = useRef(new Map());
  const [activeKey, setActiveKey] = useState(DEFAULT_REGION);
  const [hoverKey, setHoverKey] = useState(null);
  const shown = localizedEntry(getRegion(hoverKey || activeKey), lang);

  // Préparation de la carte : association tracés → régions, événements.
  useEffect(() => {
    const mount = mountRef.current;
    const svgRoot = mount?.querySelector('svg');
    if (!svgRoot || pathMapRef.current) return;
    const paths = [...svgRoot.querySelectorAll('.region-shape'), ...svgRoot.querySelectorAll('#mapLayer path'), ...svgRoot.querySelectorAll('path.st0')]
      .filter((path, index, list) => list.indexOf(path) === index);
    if (paths.length < REGIONS.length) return;
    svgRoot.querySelectorAll('circle').forEach((circle) => { circle.style.display = 'none'; });
    const pathMap = new Map();
    assignRegionsToPaths(paths).forEach(({ key, path, center }) => {
      pathMap.set(key, path);
      centersRef.current.set(key, center);
      path.dataset.region = key;
      path.addEventListener('mouseenter', () => setHoverKey(key));
      path.addEventListener('mouseleave', () => setHoverKey(null));
      path.addEventListener('click', () => setActiveKey(key));
    });
    pathMapRef.current = pathMap;
  }, []);

  useEffect(() => {
    if (pathMapRef.current) paintMap(mountRef.current, pathMapRef.current, centersRef.current, activeKey, hoverKey, lang);
  }, [activeKey, hoverKey, lang]);

  return (
    <section className="section map-section" id="presence">
      <div className="container map-layout">
        <div>
          <div className="section-tag">{t('map.tag')}</div>
          <h2>{t('map.title')}</h2>
          <p className="section-copy">{t('map.subtitle')}</p>
          <div className="map-info-card" id="region-info-card">
            <div className="map-info-head">
              <span className="map-info-dot" id="region-dot" style={{ backgroundColor: 'rgb(200, 164, 77)', opacity: 1 }}></span>
              <p id="region-title">{shown.name}</p>
            </div>
            <p id="region-text">{shown.details}</p>
            <a href={url('contact.html')} className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', borderRadius: '999px', fontSize: '0.95rem', padding: '0.75rem 1.5rem', textAlign: 'center', textDecoration: 'none', display: 'inline-block' }}>{t('region.contact')}</a>
          </div>
        </div>
        <div className="map-stage">
          <div className="morocco-map" aria-label="Carte interactive du Maroc">
            {/* SVG fourni tel quel : React ne gère pas son contenu (régions préparées dans l'effet). */}
            <div id="morocco-map-object" className="morocco-map-object" aria-label="Carte du Maroc" ref={mountRef} dangerouslySetInnerHTML={{ __html: MOROCCO_MAP_SVG }}></div>
            <div className="map-points" id="map-points" aria-hidden="false"></div>
          </div>
          <article className="region-card reveal-on-scroll is-visible" id="region-card" aria-live="polite">
            <h3>{shown.name}</h3>
            <p className="region-subtitle">{shown.delegate}</p>
            <p>{shown.details}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
