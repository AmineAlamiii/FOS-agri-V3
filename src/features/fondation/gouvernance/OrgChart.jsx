import { useLanguage } from '@/i18n/LanguageProvider';
import { usePageT } from '@/i18n/usePageT';
import { ORGANISATION } from './organisation.data';
import { organisationI18n } from './organisation.i18n';

const VARIANTS = { gold: 'is-gold', teal: 'is-teal', green: 'is-green', support: 'is-support', service: 'is-service' };

const sortedActive = (items) =>
  Array.isArray(items) ? items.filter((n) => n && n.isActive !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : [];

/** Texte localisé d'un nœud : champ suffixé (titleAr, nameZgh…) puis champ FR, puis clé de traduction. */
function localized(node, field, keyField, lang, t) {
  if (!node) return '';
  const suffix = lang === 'ar' ? 'Ar' : lang === 'zgh' ? 'Zgh' : '';
  if (suffix && node[`${field}${suffix}`]) return node[`${field}${suffix}`];
  if (node[field]) return node[field];
  return node[keyField] ? t(node[keyField]) : '';
}

function OrgNode({ node, index, extraClass, lang, t }) {
  const title = localized(node, 'title', 'titleKey', lang, t);
  const name = localized(node, 'name', 'nameKey', lang, t);
  const className = ['org-node', VARIANTS[node.colorVariant] || '', extraClass || ''].filter(Boolean).join(' ');
  return (
    <article className={className} style={{ '--reveal-index': index }} lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {node.icon && <span className="org-node-icon" aria-hidden="true"><i className={node.icon}></i></span>}
      {title && <p className="org-node-title">{title}</p>}
      {name ? <p className="org-node-name">{name}</p> : (node.colorVariant === 'gold' || node.colorVariant === 'teal') && (
        <p className="org-node-name"><span className="org-node-vacant">{t('status.vacant')}</span></p>
      )}
      {node.positionKey && <p className="org-node-position">{t(node.positionKey)}</p>}
    </article>
  );
}

function Directions({ lang, t }) {
  const items = sortedActive(ORGANISATION.directions);
  if (!items.length) return null;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  return (
    <div className="org-tier org-tier-directions">
      {items.map((direction, i) => {
        const services = sortedActive(direction.services);
        const managerName = localized(direction, 'managerName', 'managerNameKey', lang, t);
        const title = localized(direction, 'title', 'titleKey', lang, t);
        return (
          <div key={direction.id} className="org-direction" style={{ '--reveal-index': 5 + i * 3 }}>
            <article className="org-direction-head" style={{ '--reveal-index': 5 + i * 3 }} lang={lang} dir={dir}>
              {direction.icon && <span className="org-node-icon" aria-hidden="true"><i className={direction.icon}></i></span>}
              {title && <p className="org-node-title">{title}</p>}
              {managerName ? <p className="org-node-name">{managerName}</p> : <p className="org-node-name"><span className="org-node-vacant">{t('status.vacant')}</span></p>}
            </article>
            <div className="org-services" role="list">
              {services.length === 0 ? <p className="org-service-empty">{t('status.noServices')}</p> : services.map((service, j) => {
                const serviceTitle = localized(service, 'title', 'titleKey', lang, t);
                const serviceName = localized(service, 'managerName', 'managerNameKey', lang, t);
                return (
                  <article key={service.id} className="org-node is-service org-service" style={{ '--reveal-index': 6 + i * 3 + j }} lang={lang} dir={dir}>
                    {serviceTitle && <p className="org-node-title">{serviceTitle}</p>}
                    {serviceName && <p className="org-node-name">{serviceName}</p>}
                    {service.positionKey && <p className="org-node-position">{t(service.positionKey)}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Organigramme : présidence, secrétariat général, directions et services. */
export default function OrgChart() {
  const { lang } = useLanguage();
  const t = usePageT(organisationI18n);
  const president = sortedActive(ORGANISATION.leadership)[0];
  const sg = president ? sortedActive(president.children)[0] : null;
  const presidentSupports = president ? sortedActive(president.supports) : [];
  const sgSupports = sg ? sortedActive(sg.supports) : [];
  const nodeProps = { lang, t };

  return (
    <div className="org-chart" id="org-chart" data-state="ready" lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {president && (
        <div className="org-tier org-tier-president">
          {presidentSupports[0] ? <div className="org-support-left"><OrgNode node={presidentSupports[0]} index={1} {...nodeProps} /></div> : <div></div>}
          <OrgNode node={president} index={0} {...nodeProps} />
          {presidentSupports[1] ? <div className="org-support-right"><OrgNode node={presidentSupports[1]} index={2} {...nodeProps} /></div> : <div></div>}
        </div>
      )}
      {sg && (
        <div className="org-tier org-tier-sg">
          <div></div>
          <OrgNode node={sg} index={3} {...nodeProps} />
          {sgSupports[0] ? <div className="org-support-right"><OrgNode node={sgSupports[0]} index={4} {...nodeProps} /></div> : <div></div>}
        </div>
      )}
      <Directions {...nodeProps} />
    </div>
  );
}
