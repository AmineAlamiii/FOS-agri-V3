(function () {
  const categoryLabels = {
    institutional: { fr: "Institutionnel", ar: "مؤسساتي", zgh: "ⵜⴰⵎⵙⵙⵓⵔⵜ" },
    health: { fr: "Santé", ar: "الصحة", zgh: "ⵜⴰⴷⵓⵙⵉ" },
    education: { fr: "Éducation", ar: "التربية والتكوين", zgh: "ⴰⵙⴳⵎⵉ" },
    leisure: { fr: "Loisirs et voyages", ar: "الترفيه والأسفار", zgh: "ⴰⵙⵔⴼ ⴷ ⵓⵔⴰⵔ" },
    housing: { fr: "Logement", ar: "السكن", zgh: "ⴰⵣⴷⵓⵖ" },
    finance: { fr: "Offres financières", ar: "العروض المالية", zgh: "ⵜⵉⵡⵙⵉⵡⵉⵏ ⵜⵉⴷⵔⵉⵎⵉⵏ" },
    social: { fr: "Action sociale", ar: "العمل الاجتماعي", zgh: "ⴰⵎⴰⵍ ⴰⵏⴰⵎⵓⵏ" },
    partnership: { fr: "Partenariats", ar: "الشراكات", zgh: "ⵜⵉⵎⵙⴷⵓⴽⴽⴰⵍ" },
    administrative: { fr: "Information adhérents", ar: "معلومات المنخرطين", zgh: "ⵉⵙⴰⵍⵏ ⵏ ⵉⵎⵏⵖⵔⴰⴹⵏ" }
  };

  function localized(title, detail, category) {
    const trimmed = detail.trim();
    const excerpt = trimmed.length <= 165
      ? trimmed
      : `${trimmed.slice(0, 165).replace(/\s+\S*$/, "")}…`;
    return { title, excerpt, detail: trimmed, category };
  }

  function entry(id, slug, date, coverExtension, category, attachmentExtensions, translations) {
    const labels = categoryLabels[category];
    return {
      id,
      slug,
      date,
      year: 2026,
      image: `assets/news/2026/images/${id}-cover.${coverExtension}`,
      sourceUrl: `https://fos-agri.ma/blog-details.html?varname=${id}`,
      attachments: attachmentExtensions.map((extension, index) => ({
        type: extension === "pdf" ? "pdf" : "image",
        path: `assets/news/2026/${extension === "pdf" ? "documents" : "images"}/${id}-${extension === "pdf" ? "document" : "attachment"}-${index + 1}.${extension}`,
        preview: extension === "pdf" ? `assets/news/2026/previews/${id}-document-${index + 1}.jpg` : null
      })),
      fr: localized(translations.fr[0], translations.fr[1], labels.fr),
      ar: localized(translations.ar[0], translations.ar[1], labels.ar),
      zgh: localized(translations.zgh[0], translations.zgh[1], labels.zgh)
    };
  }

  window.siteData.news = [
    entry(350, "inscription-omra-2026", "02 Septembre 2026", "png", "leisure", ["pdf"], {
      fr: ["Ouverture des inscriptions à l’Omra 2026", "La Fondation ouvre les inscriptions à la huitième édition de l’Omra, organisée du 9 au 21 ou 22 novembre 2026. Les adhérents intéressés doivent consulter les offres et remplir leur demande dans l’Espace adhérent."],
      ar: ["إطلاق التسجيل في عملية العمرة برسم سنة 2026", "تعلن المؤسسة عن انطلاق التسجيل في النسخة الثامنة من رحلة العمرة، المنظمة من 9 إلى 21 أو 22 نونبر 2026. وعلى الراغبين في المشاركة الاطلاع على العروض وتعبئة الطلب عبر فضاء المنخرطين."],
      zgh: ["ⴰⵙⵙⵓⵜⵔ ⵏ ⵓⵣⵎⵎⴻⵎ ⴳ ⵄⵓⵎⵔⴰ 2026", "ⵜⴰⵎⵙⵙⵓⵔⵜ ⵜⵙⵙⵏⵜⵉ ⴰⵣⵎⵎⴻⵎ ⴳ ⵜⵉⵙ 8 ⵏ ⵄⵓⵎⵔⴰ, ⵙⴳ 9 ⴰⵔ 21 ⵏⵉⵖ 22 ⵏ ⵏⵓⵡⴰⵏⴱⵉⵔ 2026. ⵉⵎⵏⵖⵔⴰⴹⵏ ⴰⴷ ⵥⵕⵏ ⵜⵉⵡⵙⵉⵡⵉⵏ ⴷ ⵙⵙⵓⵜⵔⵏ ⴳ ⵓⵎⴽⴰⵏ ⵏⵏⵙⵏ."]
    }),
    entry(349, "madinat-bades-al-hoceima", "17 Août 2026", "png", "housing", ["pdf"], {
      fr: ["Commercialisation de la nouvelle tranche « Madinat Bades » à Al Hoceïma", "Dans le cadre du partenariat avec CGI, une nouvelle tranche d’appartements F3 à F5 est commercialisée à Madinat Bades, avec une remise exceptionnelle de 5 % pour les adhérents. Contacts : 06 64 38 22 01 et 080 100 28 28."],
      ar: ["تسويق الشطر السكني الجديد «مدينة بادس» بالحسيمة", "في إطار الشراكة مع CGI، انطلق تسويق شطر جديد من شقق F3 إلى F5 بمشروع مدينة بادس، مع تخفيض استثنائي بنسبة 5% لفائدة المنخرطين. للمعلومات: 06 64 38 22 01 و080 100 28 28."],
      zgh: ["ⴰⵙⵙⵏⵣⵉ ⵏ ⵓⵎⵓⵔ ⴰⵎⴰⵢⵏⵓ «Madinat Bades» ⴳ Al Hoceïma", "ⴳ ⵜⵎⵙⴷⵓⴽⴽⴰⵍ ⴷ CGI, ⵜⵜⵓⵙⵙⵏⵣⴰⵏ ⵉⴳⵔⴰⵡⵏ F3 ⴰⵔ F5 ⵙ ⵜⵖⴼⵉⴹⵜ ⵏ 5% ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ. ⵉⵙⴰⵍⵏ: 06 64 38 22 01 ⴷ 080 100 28 28."]
    }),
    entry(348, "convention-clinique-ibnou-baja-taza", "06 Août 2026", "png", "health", ["pdf"], {
      fr: ["Convention avec la clinique IBNOU BAJA à Taza", "La convention avec la clinique IBNOU BAJA accorde des tarifs préférentiels aux adhérents actifs et retraités, à leurs conjoints et à leurs enfants, sur présentation de la carte d’adhésion."],
      ar: ["اتفاقية مع مصحة ابن باجة بتازة", "تمنح الاتفاقية مع مصحة ابن باجة أسعاراً تفضيلية للمنخرطين العاملين والمتقاعدين وأزواجهم وأبنائهم، عند الإدلاء ببطاقة الانخراط."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⴷ ⵜⴽⵍⵉⵏⵉⴽⵜ IBNOU BAJA ⴳ Taza", "ⵜⴰⵎⵙⴰⵙⴰ ⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ, ⵉⵎⵙⵉⵔⴰⵏ ⴷ ⵉⵎⴰⵎⴰⵙⵏ, ⴷ ⵜⵡⴰⵛⵓⵍⵉⵏ ⵏⵏⵙⵏ ⵙ ⵜⴽⴰⵕⴹⴰ ⵏ ⵓⵏⵖⵎⵉⵙ."]
    }),
    entry(347, "convention-cardiologie-guercif", "06 Août 2026", "png", "health", ["pdf"], {
      fr: ["Convention avec un cabinet de cardiologie à Guercif", "Le cabinet de cardiologie partenaire à Guercif propose des tarifs préférentiels aux adhérents actifs et retraités, à leurs conjoints et à leurs enfants, sur présentation de la carte d’adhésion."],
      ar: ["اتفاقية مع عيادة لأمراض القلب بجرسيف", "تقدم عيادة أمراض القلب الشريكة بجرسيف أسعاراً تفضيلية للمنخرطين العاملين والمتقاعدين وأزواجهم وأبنائهم، عند الإدلاء ببطاقة الانخراط."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⴷ ⵍⴽⴰⴱⵉⵏⵉ ⵏ ⵓⵍ ⴳ Guercif", "ⵍⴽⴰⴱⵉⵏⵉ ⵏ ⵓⵍ ⴳ Guercif ⵉⵜⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵉⵏ ⵏⵏⵙⵏ ⵙ ⵜⴽⴰⵕⴹⴰ ⵏ ⵓⵏⵖⵎⵉⵙ."]
    }),
    entry(346, "convention-gynecologie-taza", "06 Août 2026", "png", "health", ["pdf"], {
      fr: ["Convention avec un cabinet de gynécologie à Taza", "Une convention conclue avec un cabinet de gynécologie à Taza permet aux adhérentes de bénéficier de tarifs préférentiels sur présentation de leur carte d’adhésion."],
      ar: ["اتفاقية مع عيادة لطب النساء بتازة", "تتيح اتفاقية مبرمة مع عيادة لطب النساء بتازة للمنخرطات الاستفادة من أسعار تفضيلية عند الإدلاء ببطاقة الانخراط."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⴷ ⵍⴽⴰⴱⵉⵏⵉ ⵏ ⵜⵎⵟⵟⵓⵜ ⴳ Taza", "ⵜⴰⵎⵙⴰⵙⴰ ⴷ ⵍⴽⴰⴱⵉⵏⵉ ⴳ Taza ⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵜⵎⵏⵖⵔⴰⴹⵉⵏ ⵙ ⵜⴽⴰⵕⴹⴰ ⵏ ⵓⵏⵖⵎⵉⵙ."]
    }),
    entry(345, "tournoi-generation-green-2026", "31 Juillet 2026", "png", "leisure", ["pdf", "pdf"], {
      fr: ["Deuxième édition du tournoi national « Génération Green » de mini-foot", "Après le succès de la première édition, la Fondation lance la deuxième édition du tournoi national « Génération Green » de mini-foot afin de renforcer les activités sportives et les liens entre les agents du secteur agricole."],
      ar: ["إطلاق النسخة الثانية من الدوري الوطني «الجيل الأخضر» لكرة القدم المصغرة", "بعد نجاح الدورة الأولى، تطلق المؤسسة النسخة الثانية من الدوري الوطني «الجيل الأخضر» لكرة القدم المصغرة، بهدف تعزيز الأنشطة الرياضية وروابط التواصل بين موظفي قطاع الفلاحة."],
      zgh: ["ⵜⵉⵙ 2 ⵏ ⵜⵎⵣⵉⵣⵣⵍⵜ «Génération Green» ⵏ ⴽⵓⵕⴰ ⵜⴰⵎⵥⵢⴰⵏⵜ", "ⵎⴱⴰⵄⴷ ⵏ ⵜⵎⵏⵜⵉⵍⵜ ⵜⴰⵎⵣⵡⴰⵔⵓⵜ, ⵜⵙⵙⵏⵜⵉ ⵜⵎⵙⵙⵓⵔⵜ ⵜⵉⵙ 2 ⵉ ⵓⵙⵎⵖⵔ ⵏ ⵓⵔⴰⵔ ⴷ ⵓⵎⵢⴰⵡⴰⴹ ⴳⵔ ⵉⵎⴳⴳⴰⵢⵏ ⵏ ⵜⴼⵍⴰⵃⵜ."]
    }),
    entry(344, "prime-rentree-scolaire-2026-2027", "29 Juillet 2026", "jpg", "education", ["pdf"], {
      fr: ["Prime de rentrée scolaire 2026-2027", "La Fondation ouvre les inscriptions pour bénéficier de la prime de rentrée scolaire au titre de l’année 2026-2027. Les conditions et modalités figurent dans la note jointe."],
      ar: ["منحة الدخول المدرسي 2026-2027", "تفتح المؤسسة باب التسجيل للاستفادة من منحة الدخول المدرسي برسم السنة الدراسية 2026-2027. وترد الشروط والإجراءات في المذكرة المرفقة."],
      zgh: ["ⵜⴰⵡⵙⴰ ⵏ ⵓⵙⴳⴳⵯⴰⵙ ⴰⵙⴽⴰⵙ 2026-2027", "ⵜⵙⵙⵏⵜⵉ ⵜⵎⵙⵙⵓⵔⵜ ⴰⵣⵎⵎⴻⵎ ⵉ ⵜⴰⵡⵙⴰ ⵏ ⵓⵙⴽⴰⵙ 2026-2027. ⵜⵉⵍⴰⵡⵜ ⴷ ⵜⵎⵙⵙⵉⵔⵜ ⵍⵍⴰⵏⵜ ⴳ ⵜⴱⵔⴰⵜ ⵉⴷⴷⴰⵏ."]
    }),
    entry(343, "actualites-whatsapp-adherents", "22 Juillet 2026", "jpg", "administrative", ["jpg"], {
      fr: ["Avis important : recevoir les actualités de la Fondation sur WhatsApp", "La Fondation informe ses adhérents des modalités d’activation permettant de recevoir ses dernières actualités et annonces directement via WhatsApp. Consultez l’affiche officielle ci-dessous."],
      ar: ["إشعار هام إلى المنخرطين بخصوص التوصل بمستجدات المؤسسة عبر واتساب", "تخبر المؤسسة منخرطيها بطريقة تفعيل خدمة التوصل بآخر المستجدات والإعلانات مباشرة عبر واتساب. يرجى الاطلاع على الملصق الرسمي أسفله."],
      zgh: ["ⴰⵍⵖⵓ ⵉⵎⵇⵇⵓⵔⵏ: ⵉⵙⴰⵍⵏ ⵏ ⵜⵎⵙⵙⵓⵔⵜ ⴳ WhatsApp", "ⵜⵙⵙⵏ ⵜⵎⵙⵙⵓⵔⵜ ⵉⵎⵏⵖⵔⴰⴹⵏ ⵎⴰⵎⴽ ⴰⴷ ⵙⵙⵔⵎⴷⵏ ⴰⵙⴰⵍ ⵏ ⵓⵔⵎⴰⵙ ⵏ ⵉⵙⴰⵍⵏ ⴳ WhatsApp. ⵥⵕ ⵜⴰⴼⵔⴰⵜ ⵜⵓⵏⵚⵉⴱⵜ."]
    }),
    entry(342, "kinesitherapeutes-centre-medico-social", "22 Juillet 2026", "png", "health", ["pdf"], {
      fr: ["Convention avec des kinésithérapeutes au Centre Médico-Social", "Deux kinésithérapeutes, un praticien et une praticienne, exerceront au Centre Médico-Social afin de renforcer les prestations médicales et de garantir aux adhérents un accès à des soins de qualité."],
      ar: ["اتفاقية مع أخصائيين في العلاج الطبيعي بالمركز الطبي الاجتماعي", "سيعمل أخصائي وأخصائية في العلاج الطبيعي داخل المركز الطبي الاجتماعي لتعزيز الخدمات الطبية وضمان استفادة المنخرطين من علاجات ذات جودة."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⴷ ⵉⵎⵙⵙⴼⴰⵔⵏ ⵏ ⴽⵉⵏⵉⵣⵉ ⴳ ⵓⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ", "ⵙⵉⵏ ⵉⵎⵙⵙⴼⴰⵔⵏ ⴰⴷ ⵎⴰⵍⵏ ⴳ ⵓⵎⵎⴰⵙ ⴰⴷⵓⵙⴰⵏ ⵉ ⵓⵙⵎⵖⵔ ⵏ ⵜⵉⵡⵙⵉⵡⵉⵏ ⴷ ⵓⵙⴽⵛⵎ ⵖⵔ ⵓⵙⵙⴼⵔ ⵏ ⵜⵖⴰⵔⴰ."]
    }),
    entry(341, "bourses-sociales-bacheliers-2026", "22 Juillet 2026", "jpg", "education", ["pdf", "pdf"], {
      fr: ["Bourses sociales pour les bacheliers 2025-2026", "La Fondation lance un programme de bourses sociales destiné aux bacheliers 2026, enfants des adhérents. La note d’information et la fiche complète du programme sont disponibles ci-dessous."],
      ar: ["منح اجتماعية لفائدة باكالوريا السنة الدراسية 2025-2026", "تطلق المؤسسة برنامج المنح الاجتماعية لفائدة حاملي باكالوريا 2026 من أبناء المنخرطين. وتتوفر أسفله مذكرة المعلومات والبطاقة الكاملة للبرنامج."],
      zgh: ["ⵜⵉⵡⵙⵉⵡⵉⵏ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ ⵉ ⵉⵎⵙⵙⵉⵡⴹⵏ ⵏ 2026", "ⵜⵙⵙⵏⵜⵉ ⵜⵎⵙⵙⵓⵔⵜ ⴰⵙⵏⴰⵎⴰⵍ ⵏ ⵜⵉⵡⵙⵉ ⵉ ⵜⴰⵔⵡⴰ ⵏ ⵉⵎⵏⵖⵔⴰⴹⵏ ⵉⵍⴽⵎⵏ ⴱⴰⴽ 2026. ⵜⴱⵔⴰⵜ ⴷ ⵜⴼⵔⴰⵜ ⵍⵍⴰⵏⵜ ⴷⴷⴰⵡ."]
    }),
    entry(340, "bourses-excellence-bacheliers-2026", "22 Juillet 2026", "jpg", "education", ["pdf", "pdf"], {
      fr: ["Bourses d’excellence pour les bacheliers 2025-2026", "La Fondation lance son programme de bourses d’excellence au profit des bacheliers 2026, enfants des adhérents. Consultez la note d’information et la fiche du programme."],
      ar: ["منح الاستحقاق لفائدة باكالوريا السنة الدراسية 2025-2026", "تطلق المؤسسة برنامج منح الاستحقاق لفائدة حاملي باكالوريا 2026 من أبناء المنخرطين. يرجى الاطلاع على مذكرة المعلومات وبطاقة البرنامج."],
      zgh: ["ⵜⵉⵡⵙⵉⵡⵉⵏ ⵏ ⵜⵎⵏⵜⵉⵍⵜ ⵉ ⵉⵎⵙⵙⵉⵡⴹⵏ ⵏ 2026", "ⵜⵙⵙⵏⵜⵉ ⵜⵎⵙⵙⵓⵔⵜ ⵜⵉⵡⵙⵉⵡⵉⵏ ⵏ ⵜⵎⵏⵜⵉⵍⵜ ⵉ ⵜⴰⵔⵡⴰ ⵏ ⵉⵎⵏⵖⵔⴰⴹⵏ ⵉⵍⴽⵎⵏ ⴱⴰⴽ 2026. ⵥⵕ ⵜⴱⵔⴰⵜ ⴷ ⵜⴼⵔⴰⵜ."]
    }),
    entry(339, "convention-centre-espoir-el-jadida", "20 Juillet 2026", "png", "education", ["pdf"], {
      fr: ["Convention avec le centre de langues CENTRE ESPOIR à El Jadida", "Le CENTRE ESPOIR à El Jadida accorde des tarifs préférentiels aux adhérents, à leurs conjoints et à leurs enfants sur présentation de la carte d’adhésion."],
      ar: ["اتفاقية مع مركز اللغات CENTRE ESPOIR بالجديدة", "يمنح مركز CENTRE ESPOIR بالجديدة أسعاراً تفضيلية للمنخرطين وأزواجهم وأبنائهم عند الإدلاء ببطاقة الانخراط."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⴷ CENTRE ESPOIR ⴳ El Jadida", "CENTRE ESPOIR ⴳ El Jadida ⵉⵜⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵉⵏ ⵏⵏⵙⵏ ⵙ ⵜⴽⴰⵕⴹⴰ ⵏ ⵓⵏⵖⵎⵉⵙ."]
    }),
    entry(338, "convention-smile-art-rabat", "14 Juillet 2026", "png", "health", ["pdf"], {
      fr: ["Convention avec le cabinet dentaire SMILE ART à Rabat", "Le cabinet SMILE ART propose des tarifs préférentiels aux adhérents, à leurs conjoints et à leurs enfants sur présentation de la carte d’adhésion. La note et la grille tarifaire sont jointes."],
      ar: ["اتفاقية مع عيادة الأسنان SMILE ART بالرباط", "تقدم عيادة SMILE ART أسعاراً تفضيلية للمنخرطين وأزواجهم وأبنائهم عند الإدلاء ببطاقة الانخراط. وتوجد المذكرة وشبكة الأسعار رفقته."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⴷ SMILE ART ⴳ Rabat", "SMILE ART ⵉⵜⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵉⵏ ⵏⵏⵙⵏ. ⵜⴱⵔⴰⵜ ⴷ ⵜⴼⵔⴰⵜ ⵏ ⵉⵙⵡⵉⵔⵏ ⵍⵍⴰⵏⵜ ⴷⴷⴰⵡ."]
    }),
    entry(337, "sejour-culturel-rabat-logistique-2026", "03 Juillet 2026", "jpg", "leisure", ["pdf", "pdf", "pdf", "pdf"], {
      fr: ["Séjour culturel et récréatif à Rabat : dispositions logistiques", "Le programme, les modalités d’organisation, la liste des participants et le trousseau du séjour culturel et récréatif 2026 à Rabat sont publiés dans les documents joints."],
      ar: ["الإقامة الثقافية والترفيهية بالرباط: الترتيبات اللوجستيكية", "تنشر المؤسسة برنامج الإقامة الثقافية والترفيهية بالرباط برسم 2026، وترتيبات التنظيم ولائحة المشاركين واللوازم المطلوبة ضمن الوثائق المرفقة."],
      zgh: ["ⴰⵙⵔⴼ ⴰⴷⵍⵙⴰⵏ ⴷ ⵓⵔⴰⵔ ⴳ Rabat: ⵜⵉⵙⵖⵓⵏⵉⵏ", "ⴰⵙⵏⴰⵎⴰⵍ, ⵜⵉⵙⵖⵓⵏⵉⵏ, ⵜⴰⵍⴳⴰⵎⵜ ⵏ ⵉⵎⴷⵔⴰⵡⵏ ⴷ ⵉⵎⴰⵙⵙⵏ ⵏ ⵓⵙⵔⴼ 2026 ⴳ Rabat ⵍⵍⴰⵏ ⴳ ⵉⵙⵎⵍⵏ ⵉⴷⴷⴰⵏ."]
    }),
    entry(336, "colonie-vacances-agadir-logistique-2026", "19 Juin 2026", "jpg", "leisure", ["pdf", "pdf", "pdf", "pdf"], {
      fr: ["Colonie de vacances 2026 à Agadir : dispositions logistiques", "Le programme du séjour, les modalités d’organisation, la liste des bénéficiaires et le trousseau de la colonie de vacances 2026 à Agadir sont disponibles dans les documents joints."],
      ar: ["المخيم الصيفي 2026 بأكادير: الترتيبات اللوجستيكية", "تتوفر ضمن الوثائق المرفقة تفاصيل برنامج المخيم الصيفي 2026 بأكادير، وكيفية التنظيم، ولائحة المستفيدين، واللوازم المطلوبة."],
      zgh: ["ⴰⵎⵅⵉⵎ 2026 ⴳ Agadir: ⵜⵉⵙⵖⵓⵏⵉⵏ", "ⴰⵙⵏⴰⵎⴰⵍ, ⵜⵉⵙⵖⵓⵏⵉⵏ, ⵜⴰⵍⴳⴰⵎⵜ ⵏ ⵉⵎⵙⵜⴼⵉⴷⵏ ⴷ ⵉⵎⴰⵙⵙⵏ ⵏ ⵓⵎⵅⵉⵎ 2026 ⴳ Agadir ⵍⵍⴰⵏ ⴳ ⵉⵙⵎⵍⵏ."]
    }),
    entry(335, "convention-optisquare-rabat", "19 Juin 2026", "png", "health", ["pdf"], {
      fr: ["Convention à tarifs préférentiels avec OPTISQUARE à Rabat", "L’opticien OPTISQUARE à Rabat accorde des tarifs préférentiels aux adhérents de la FOS-Agri. La note détaillée de la convention est disponible ci-dessous."],
      ar: ["اتفاقية بأسعار تفضيلية مع OPTISQUARE بالرباط", "يمنح محل البصريات OPTISQUARE بالرباط أسعاراً تفضيلية لمنخرطي FOS-Agri. وتتوفر أسفله المذكرة التفصيلية للاتفاقية."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⵙ ⵜⵉⵖⴼⵉⴹⵉⵏ ⴷ OPTISQUARE ⴳ Rabat", "OPTISQUARE ⴳ Rabat ⵉⵜⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ ⵏ FOS-Agri. ⵜⴱⵔⴰⵜ ⵜⴰⵎⵎⴰⵙⵜ ⵜⵍⵍⴰ ⴷⴷⴰⵡ."]
    }),
    entry(334, "prolongation-adhesion-futurs-retraites", "11 Juin 2026", "png", "administrative", ["pdf", "pdf"], {
      fr: ["Prolongation de l’adhésion pour les futurs retraités", "La Fondation informe les agents proches de la retraite de la procédure permettant de maintenir leur adhésion après leur départ, ainsi que des pièces à fournir et des délais de dépôt."],
      ar: ["تمديد الانخراط لفائدة الموظفين المقبلين على التقاعد", "تخبر المؤسسة الموظفين المقبلين على التقاعد بمسطرة الاستمرار في الانخراط بعد الإحالة على التقاعد، والوثائق المطلوبة والآجال المحددة لإيداع الطلبات."],
      zgh: ["ⴰⵙⵎⵖⵔ ⵏ ⵓⵏⵖⵎⵉⵙ ⵉ ⵉⵎⴳⴳⴰⵢⵏ ⵉⵇⵇⵔⴱⵏ ⵖⵔ ⵜⵎⴰⵎⴰⵙⵜ", "ⵜⵙⵙⵏ ⵜⵎⵙⵙⵓⵔⵜ ⵉⵎⴳⴳⴰⵢⵏ ⵎⴰⵎⴽ ⴰⴷ ⴽⵎⵎⵍⵏ ⴰⵏⵖⵎⵉⵙ ⵎⴱⴰⵄⴷ ⵏ ⵜⵎⴰⵎⴰⵙⵜ, ⴷ ⵉⵙⵎⵍⵏ ⴷ ⵉⵣⵎⴰⵣ."]
    }),
    entry(333, "adhesion-retraites-fondation", "11 Juin 2026", "png", "administrative", ["pdf", "pdf"], {
      fr: ["Adhésion des retraités à la Fondation", "La Fondation présente aux agents retraités la procédure d’adhésion ainsi que les deux périodes prévues pour déposer les dossiers de demande."],
      ar: ["انخراط المتقاعدين بالمؤسسة", "تعرض المؤسسة على الموظفين المتقاعدين مسطرة الانخراط المعتمدة، وكذا فترتي التسجيل المحددتين لإيداع ملفات طلبات الانخراط."],
      zgh: ["ⴰⵏⵖⵎⵉⵙ ⵏ ⵉⵎⴰⵎⴰⵙⵏ ⴳ ⵜⵎⵙⵙⵓⵔⵜ", "ⵜⵙⵙⵏ ⵜⵎⵙⵙⵓⵔⵜ ⵉⵎⴰⵎⴰⵙⵏ ⵜⴰⵎⵙⵙⵉⵔⵜ ⵏ ⵓⵏⵖⵎⵉⵙ ⴷ ⵙⵉⵏ ⵉⵣⵎⴰⵣ ⵏ ⵓⵙⵙⵓⵜⵔ."]
    }),
    entry(332, "sejour-culturel-rabat-finalisation", "08 Juin 2026", "jpg", "leisure", ["pdf"], {
      fr: ["Séjour culturel et récréatif à Rabat", "Les parents des enfants retenus et avertis par SMS doivent déposer les documents demandés via l’Espace adhérent avant le lundi 15 juin 2026 à 16 h. La note précise le compte bancaire et les contributions par échelle administrative."],
      ar: ["المخيم الثقافي الترفيهي بالرباط", "يتعين على آباء الأطفال المقبولين والمتوصلين برسالة نصية تحميل الوثائق المطلوبة عبر فضاء المنخرط قبل الاثنين 15 يونيو 2026 على الساعة الرابعة بعد الزوال. وتوضح المذكرة الحساب البنكي والمساهمات."],
      zgh: ["ⴰⵙⵔⴼ ⴰⴷⵍⵙⴰⵏ ⴷ ⵓⵔⴰⵔ ⴳ Rabat", "ⵉⵎⴰⵡⵍⴰⵏ ⵏ ⵜⴰⵔⵡⴰ ⵉⵜⵜⵓⵙⵜⴰⵢⵏ ⴰⴷ ⵙⵔⵙⵏ ⵉⵙⵎⵍⵏ ⴳ ⵓⵎⴽⴰⵏ ⵏⵏⵙⵏ ⴷⴰⵜ 15 ⵢⵓⵏⵢⵓ 2026 ⴳ 16:00. ⵜⴱⵔⴰⵜ ⵜⵙⵙⵏ ⴰⵎⵙⵉⴷ ⴷ ⵜⵉⵡⵙⵉⵡⵉⵏ."]
    }),
    entry(331, "colonie-vacances-finalisation-2026", "26 Mai 2026", "jpg", "leisure", ["pdf", "pdf", "pdf", "pdf", "pdf"], {
      fr: ["Colonie de vacances 2026 : finalisation des démarches", "Les listes des enfants bénéficiaires sont publiées. Les adhérents concernés sont invités à finaliser l’inscription conformément aux indications de la note et aux listes jointes."],
      ar: ["المخيم الصيفي 2026: استكمال إجراءات الاستفادة", "تم نشر لوائح الأطفال المستفيدين، ويُدعى المنخرطون المعنيون إلى استكمال إجراءات التسجيل وفق التفاصيل الواردة بالمذكرة واللوائح المرفقة."],
      zgh: ["ⴰⵎⵅⵉⵎ 2026: ⴰⵙⵎⴷ ⵏ ⵜⵎⵙⵙⵉⵔⵜ", "ⵜⵜⵓⵙⵙⵓⴼⵖⵏⵜ ⵜⵍⴳⴰⵎⵉⵏ ⵏ ⵜⴰⵔⵡⴰ ⵉⵎⵙⵜⴼⵉⴷⵏ. ⵉⵎⵏⵖⵔⴰⴹⵏ ⴰⴷ ⵙⵎⴷⵏ ⴰⵣⵎⵎⴻⵎ ⵙ ⵜⴱⵔⴰⵜ ⴷ ⵜⵍⴳⴰⵎⵉⵏ."]
    }),
    entry(330, "mise-a-jour-donnees-adherents", "20 Mai 2026", "jpg", "administrative", ["pdf"], {
      fr: ["Mise à jour des données des adhérents", "Dans le cadre de l’actualisation de sa base de données, la Fondation invite tous ses adhérents à mettre à jour leurs informations personnelles dans l’Espace adhérent."],
      ar: ["تحيين معطيات المنخرطين", "في إطار تحيين قاعدة بياناتها، تدعو المؤسسة جميع المنخرطين إلى تحديث معطياتهم الشخصية عبر الفضاء الخاص بالمنخرطين."],
      zgh: ["ⴰⵙⵎⴰⵢⵏⵓ ⵏ ⵉⵙⴰⵍⵏ ⵏ ⵉⵎⵏⵖⵔⴰⴹⵏ", "ⵉ ⵓⵙⵎⴰⵢⵏⵓ ⵏ ⵓⵙⵏⴰ ⵏ ⵉⵙⴰⵍⵏ, ⵜⴰⵎⵙⵙⵓⵔⵜ ⵜⵙⵙⵓⵜⵔ ⵉⵎⵏⵖⵔⴰⴹⵏ ⴰⴷ ⵙⵎⴰⵢⵏⵓⵏ ⵉⵙⴰⵍⵏ ⵏⵏⵙⵏ ⴳ ⵓⵎⴽⴰⵏ ⵏⵏⵙⵏ."]
    }),
    entry(329, "beneficiaires-aide-vacances-2026", "16 Mai 2026", "png", "leisure", ["jpg", "pdf", "pdf", "pdf", "pdf"], {
      fr: ["Programme d’aide aux vacances des adhérents 2026", "Les listes des bénéficiaires de l’aide aux vacances 2026 ont été arrêtées selon les critères d’éligibilité et le tri informatique. Elles sont publiées par administration et région d’affectation."],
      ar: ["برنامج دعم عطل المنخرطين برسم سنة 2026", "تم حصر لوائح المستفيدين من دعم العطل لسنة 2026 وفق معايير الاستحقاق والفرز المعلوماتي. وتنشر اللوائح حسب الإدارة وجهة التعيين."],
      zgh: ["ⴰⵙⵏⴰⵎⴰⵍ ⵏ ⵜⵉⵡⵙⵉ ⵉ ⵓⵙⵔⴼ 2026", "ⵜⵜⵓⵙⴱⴷⴷⵏⵜ ⵜⵍⴳⴰⵎⵉⵏ ⵏ ⵉⵎⵙⵜⴼⵉⴷⵏ ⵙ ⵜⵉⵍⴰⵡⵜ ⴷ ⵓⵙⵜⴰⵢ ⴰⴷⵉⵊⵉⵜⴰⵍ. ⵜⵜⵓⵙⵙⵓⴼⵖⵏⵜ ⵙ ⵜⵏⴱⴰⴹⵜ ⴷ ⵜⵎⵏⴰⴹⵜ."]
    }),
    entry(328, "pret-social-sans-interet-2026", "07 Mai 2026", "png", "social", ["pdf"], {
      fr: ["Service de prêt social sans intérêt", "La Fondation lance au profit de ses adhérents le service de prêt social sans intérêt. Les conditions et les démarches sont détaillées dans la note jointe."],
      ar: ["خدمة السلف الاجتماعي المجاني", "تطلق المؤسسة لفائدة منخرطيها خدمة السلف الاجتماعي المجاني. وترد شروط الاستفادة والإجراءات في المذكرة المرفقة."],
      zgh: ["ⴰⵎⴰⵍⴰⵙⵙ ⵏ ⵓⵙⵔⵙ ⴰⵏⴰⵎⵓⵏ ⵡⴰⵔ ⵜⵉⵎⴷⵉ", "ⵜⵙⵙⵏⵜⵉ ⵜⵎⵙⵙⵓⵔⵜ ⴰⵎⴰⵍⴰⵙⵙ ⵏ ⵓⵙⵔⵙ ⴰⵏⴰⵎⵓⵏ ⵡⴰⵔ ⵜⵉⵎⴷⵉ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ. ⵜⵉⵍⴰⵡⵜ ⵍⵍⴰⵏⵜ ⴳ ⵜⴱⵔⴰⵜ."]
    }),
    entry(327, "convention-laboratoire-oued-noun-guelmim", "07 Mai 2026", "png", "health", ["pdf"], {
      fr: ["Convention avec le laboratoire Oued Noun Guelmim d’analyses médicales", "Le laboratoire Oued Noun Guelmim accorde des remises préférentielles aux adhérents, à leurs conjoints et à leurs enfants. La note détaillée est disponible ci-dessous."],
      ar: ["اتفاقية مع مختبر واد نون كلميم للتحاليل الطبية", "يمنح مختبر واد نون كلميم تخفيضات تفضيلية للمنخرطين وأزواجهم وأبنائهم. وتتوفر أسفله المذكرة التفصيلية."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⴷ ⵍⴰⴱⵓ Oued Noun Guelmim", "ⵍⴰⴱⵓ Oued Noun Guelmim ⵉⵜⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵉⵏ ⵏⵏⵙⵏ. ⵜⴱⵔⴰⵜ ⵜⴰⵎⵎⴰⵙⵜ ⵜⵍⵍⴰ ⴷⴷⴰⵡ."]
    }),
    entry(326, "taux-credits-immobiliers-credit-agricole", "04 Mai 2026", "jpg", "housing", ["pdf"], {
      fr: ["Nouvelle grille des crédits immobiliers du Crédit Agricole du Maroc", "Le Crédit Agricole du Maroc propose de nouvelles conditions préférentielles pour les crédits immobiliers, avec des taux révisés à la baisse. La fiche détaillée est jointe."],
      ar: ["شبكة جديدة لقروض السكن من القرض الفلاحي للمغرب", "يقدم القرض الفلاحي للمغرب شروطاً تفضيلية جديدة لقروض السكن، مع خفض نسب الفائدة. وتتوفر البطاقة التفصيلية ضمن المرفقات."],
      zgh: ["ⵜⴰⴼⵔⴰⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ ⵏ ⵉⵙⵔⵙⵏ ⵏ Crédit Agricole du Maroc", "Crédit Agricole du Maroc ⵉⵜⵜⴼⴽⴰ ⵜⵉⵍⴰⵡⵜ ⵜⵉⵎⴰⵢⵏⵓⵜ ⵉ ⵉⵙⵔⵙⵏ ⵏ ⵓⵣⴷⵓⵖ ⵙ ⵜⵉⵎⴷⵉ ⵉⴷⵔⵓⵙⵏ. ⵜⴰⴼⵔⴰⵜ ⵜⵍⵍⴰ ⴷⴷⴰⵡ."]
    }),
    entry(325, "sejour-culturel-rabat-inscriptions-2026", "29 Avril 2026", "jpg", "leisure", ["pdf"], {
      fr: ["Séjour culturel et récréatif à Rabat 2026", "Un séjour est organisé au Club de l’Agriculture à Rabat du 20 au 31 juillet 2026 pour les enfants d’adhérents âgés de 9 à 13 ans et résidant dans les régions éloignées. L’inscription se fait dans l’Espace adhérent."],
      ar: ["مخيم ثقافي ترفيهي بالرباط 2026", "تنظم المؤسسة مخيماً بنادي الفلاحة بالرباط من 20 إلى 31 يوليوز 2026 لفائدة أبناء المنخرطين بين 9 و13 سنة والقاطنين بالمناطق النائية. ويتم التسجيل عبر فضاء المنخرطين."],
      zgh: ["ⴰⵙⵔⴼ ⴰⴷⵍⵙⴰⵏ ⴷ ⵓⵔⴰⵔ ⴳ Rabat 2026", "ⴰⵙⵔⴼ ⴰⴷ ⵔⴰⴷ ⵉⵍⵉ ⴳ Club de l’Agriculture ⵙⴳ 20 ⴰⵔ 31 ⵢⵓⵍⵢⵓⵣ 2026 ⵉ ⵜⴰⵔⵡⴰ ⵏ 9 ⴰⵔ 13 ⵓⵙⴳⴳⵯⴰⵙ ⴳ ⵜⵎⵏⴰⴹⵉⵏ ⵉⴱⵄⴷⵏ. ⴰⵣⵎⵎⴻⵎ ⴳ ⵓⵎⴽⴰⵏ ⵏ ⵓⵎⵏⵖⵔⴰⴹ."]
    }),
    entry(324, "colonie-vacances-agadir-inscriptions-2026", "28 Avril 2026", "jpg", "leisure", ["pdf"], {
      fr: ["Colonie de vacances pour les enfants des adhérents", "Les inscriptions sont ouvertes pour la colonie 2026 à Atlantic Park Agadir, du 1er au 12 juillet, au profit des enfants des adhérents âgés de 9 à 13 ans."],
      ar: ["تنظيم مخيم صيفي لفائدة أبناء المنخرطين", "يفتح التسجيل للمخيم الصيفي 2026 بمركز أتلنتيك بارك بأكادير من 1 إلى 12 يوليوز، لفائدة أبناء المنخرطين الذين تتراوح أعمارهم بين 9 و13 سنة."],
      zgh: ["ⴰⵎⵅⵉⵎ ⵉ ⵜⴰⵔⵡⴰ ⵏ ⵉⵎⵏⵖⵔⴰⴹⵏ", "ⵉⵍⴷⵉ ⵓⵣⵎⵎⴻⵎ ⵉ ⵓⵎⵅⵉⵎ 2026 ⴳ Atlantic Park Agadir ⵙⴳ 1 ⴰⵔ 12 ⵢⵓⵍⵢⵓⵣ, ⵉ ⵜⴰⵔⵡⴰ ⵏ 9 ⴰⵔ 13 ⵓⵙⴳⴳⵯⴰⵙ."]
    }),
    entry(323, "convention-laboratoire-taourirt-central", "20 Avril 2026", "png", "health", ["pdf"], {
      fr: ["Convention avec le laboratoire Taourirt Central d’analyses médicales", "Le laboratoire Taourirt Central accorde des remises préférentielles aux adhérents, à leurs conjoints et à leurs enfants. La note détaillée est disponible ci-dessous."],
      ar: ["اتفاقية مع مختبر تاوريرت المركزي للتحاليل الطبية", "يمنح مختبر تاوريرت المركزي تخفيضات تفضيلية للمنخرطين وأزواجهم وأبنائهم. وتتوفر أسفله المذكرة التفصيلية."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⴷ ⵍⴰⴱⵓ Taourirt Central", "ⵍⴰⴱⵓ Taourirt Central ⵉⵜⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵉⵏ ⵏⵏⵙⵏ. ⵜⴱⵔⴰⵜ ⵜⴰⵎⵎⴰⵙⵜ ⵜⵍⵍⴰ ⴷⴷⴰⵡ."]
    }),
    entry(322, "stand-fos-agri-siam-2026", "09 Avril 2026", "png", "institutional", ["pdf"], {
      fr: ["Stand de la Fondation au SIAM à Meknès, du 20 au 28 avril 2026", "La Fondation accueillera ses partenaires conventionnés sur son stand au Salon international de l’agriculture de Meknès et invite les adhérents à découvrir les nouveautés et les services proposés."],
      ar: ["رواق المؤسسة بالمعرض الدولي للفلاحة بمكناس من 20 إلى 28 أبريل 2026", "تستقبل المؤسسة شركاءها المتعاقدين في رواقها بالمعرض الدولي للفلاحة بمكناس، وتدعو المنخرطين إلى التعرف على المستجدات والخدمات المقترحة."],
      zgh: ["ⴰⵙⵜⴰⵏⴷ ⵏ ⵜⵎⵙⵙⵓⵔⵜ ⴳ SIAM Meknès ⵙⴳ 20 ⴰⵔ 28 ⵉⴱⵔⵉⵔ 2026", "ⵜⴰⵎⵙⵙⵓⵔⵜ ⵔⴰⴷ ⵜⵙⵙⵉⵡⴹ ⵉⵎⵎⴷⴷⴰⵏ ⴳ ⵓⵙⵜⴰⵏⴷ ⵏⵏⵙ ⴳ SIAM Meknès, ⵜⵙⵙⵓⵜⵔ ⵉⵎⵏⵖⵔⴰⴹⵏ ⴰⴷ ⵙⵙⵏⵏ ⵉⵙⴰⵍⵏ ⴷ ⵉⵎⴰⵍⴰⵙⵙⵏ."]
    }),
    entry(321, "convention-centre-dentaire-seddik-tanger", "03 Avril 2026", "png", "health", ["pdf"], {
      fr: ["Convention avec le Centre Dentaire Seddik à Tanger", "Le Centre Dentaire Seddik à Tanger accorde des tarifs préférentiels aux adhérents, à leurs conjoints et à leurs enfants. Consultez la note détaillée."],
      ar: ["اتفاقية مع مركز الصديق لطب الأسنان بطنجة", "يمنح مركز الصديق لطب الأسنان بطنجة أسعاراً تفضيلية للمنخرطين وأزواجهم وأبنائهم. يرجى الاطلاع على المذكرة التفصيلية."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⴷ Centre Dentaire Seddik ⴳ Tanger", "Centre Dentaire Seddik ⴳ Tanger ⵉⵜⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ ⴷ ⵜⵡⴰⵛⵓⵍⵉⵏ ⵏⵏⵙⵏ. ⵥⵕ ⵜⴱⵔⴰⵜ."]
    }),
    entry(320, "convention-laboratoire-al-fouarate-temara", "26 Mars 2026", "png", "health", ["pdf"], {
      fr: ["Convention avec le laboratoire Al Fouarate à Témara", "Le laboratoire Al Fouarate accorde des remises aux adhérents, à leurs conjoints, enfants et parents. La note détaillée de cette offre élargie est jointe."],
      ar: ["اتفاقية مع مختبر الفوارات للتحاليل الطبية بتمارة", "يمنح مختبر الفوارات تخفيضات للمنخرطين وأزواجهم وأبنائهم وآبائهم. وتوجد رفقته المذكرة التفصيلية لهذا العرض الموسع."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⴷ ⵍⴰⴱⵓ Al Fouarate ⴳ Témara", "ⵍⴰⴱⵓ Al Fouarate ⵉⵜⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ, ⵜⵡⴰⵛⵓⵍⵉⵏ ⴷ ⵉⵎⴰⵡⵍⴰⵏ ⵏⵏⵙⵏ. ⵜⴱⵔⴰⵜ ⵜⵍⵍⴰ ⴷⴷⴰⵡ."]
    }),
    entry(319, "convention-german-syrien-dental-clinic-rabat", "19 Mars 2026", "png", "health", ["pdf"], {
      fr: ["Convention avec German Syrien Dental Clinic à Rabat", "La clinique dentaire German Syrien Dental Clinic à Rabat accorde des tarifs préférentiels aux adhérents de la FOS-Agri, à leurs conjoints et à leurs enfants."],
      ar: ["اتفاقية مع German Syrien Dental Clinic بالرباط", "تمنح عيادة الأسنان German Syrien Dental Clinic بالرباط أسعاراً تفضيلية لمنخرطي FOS-Agri وأزواجهم وأبنائهم."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⴷ German Syrien Dental Clinic ⴳ Rabat", "German Syrien Dental Clinic ⴳ Rabat ⵜⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ ⵏ FOS-Agri ⴷ ⵜⵡⴰⵛⵓⵍⵉⵏ ⵏⵏⵙⵏ."]
    }),
    entry(318, "wafa-immobilier-taux-credits-2026", "19 Mars 2026", "png", "housing", ["pdf"], {
      fr: ["Wafa Immobilier : baisse des taux des crédits immobiliers", "Wafa Immobilier annonce une nouvelle grille tarifaire avec des taux de crédits immobiliers revus à la baisse. Consultez la fiche détaillée."],
      ar: ["وفا العقارية: تخفيض نسب قروض السكن", "تعلن وفا العقارية عن شبكة أسعار جديدة تتضمن خفض نسب قروض السكن. يرجى الاطلاع على البطاقة التفصيلية."],
      zgh: ["Wafa Immobilier: ⴰⴷⵔⵓⵙ ⵏ ⵜⵉⵎⴷⵉ ⵏ ⵉⵙⵔⵙⵏ ⵏ ⵓⵣⴷⵓⵖ", "Wafa Immobilier ⵜⵙⵙⵏ ⵜⴰⴼⵔⴰⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ ⵙ ⵜⵉⵎⴷⵉ ⵉⴷⵔⵓⵙⵏ ⵏ ⵉⵙⵔⵙⵏ ⵏ ⵓⵣⴷⵓⵖ. ⵥⵕ ⵜⴰⴼⵔⴰⵜ."]
    }),
    entry(317, "banque-populaire-credits-immobiliers-2026", "19 Mars 2026", "png", "housing", ["pdf"], {
      fr: ["Banque Populaire : nouvelle grille des crédits immobiliers", "La Banque Populaire propose une nouvelle tarification à la baisse des taux de crédits immobiliers. Les conditions détaillées figurent dans la fiche jointe."],
      ar: ["البنك الشعبي: شبكة جديدة لقروض السكن", "يقترح البنك الشعبي تسعيرة جديدة تتضمن خفض نسب قروض السكن. وترد الشروط التفصيلية في البطاقة المرفقة."],
      zgh: ["Banque Populaire: ⵜⴰⴼⵔⴰⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ ⵏ ⵉⵙⵔⵙⵏ ⵏ ⵓⵣⴷⵓⵖ", "Banque Populaire ⵉⵜⵜⴼⴽⴰ ⵜⵉⵎⴷⵉ ⵉⴷⵔⵓⵙⵏ ⵉ ⵉⵙⵔⵙⵏ ⵏ ⵓⵣⴷⵓⵖ. ⵜⵉⵍⴰⵡⵜ ⵍⵍⴰⵏⵜ ⴳ ⵜⴼⵔⴰⵜ."]
    }),
    entry(316, "banque-populaire-credits-consommation-2026", "19 Mars 2026", "png", "finance", ["pdf"], {
      fr: ["Banque Populaire : nouvelle grille des crédits à la consommation", "La Banque Populaire propose une nouvelle tarification à la baisse des taux de crédits à la consommation. Les conditions détaillées figurent dans la fiche jointe."],
      ar: ["البنك الشعبي: شبكة جديدة لقروض الاستهلاك", "يقترح البنك الشعبي تسعيرة جديدة تتضمن خفض نسب قروض الاستهلاك. وترد الشروط التفصيلية في البطاقة المرفقة."],
      zgh: ["Banque Populaire: ⵜⴰⴼⵔⴰⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ ⵏ ⵉⵙⵔⵙⵏ ⵏ ⵓⵙⵎⵔⵙ", "Banque Populaire ⵉⵜⵜⴼⴽⴰ ⵜⵉⵎⴷⵉ ⵉⴷⵔⵓⵙⵏ ⵉ ⵉⵙⵔⵙⵏ ⵏ ⵓⵙⵎⵔⵙ. ⵜⵉⵍⴰⵡⵜ ⵍⵍⴰⵏⵜ ⴳ ⵜⴼⵔⴰⵜ."]
    }),
    entry(315, "resiliation-convention-dr-lamliki", "11 Mars 2026", "png", "health", ["pdf"], {
      fr: ["Résiliation de la convention avec la cardiologue Dr Lamliki", "La Fondation informe ses adhérents de la résiliation de la convention conclue avec la cardiologue Dr Lamliki. Les précisions officielles figurent dans l’avis joint."],
      ar: ["إنهاء الاتفاقية مع طبيبة القلب الدكتورة لمليكي", "تخبر المؤسسة منخرطيها بإنهاء الاتفاقية المبرمة مع طبيبة القلب الدكتورة لمليكي. وترد التفاصيل الرسمية في الإشعار المرفق."],
      zgh: ["ⴰⵙⵔⵔⴰⵃ ⵏ ⵜⵎⵙⴰⵙⴰ ⴷ Dr Lamliki", "ⵜⵙⵙⵏ ⵜⵎⵙⵙⵓⵔⵜ ⵉⵎⵏⵖⵔⴰⴹⵏ ⵙ ⵓⵙⵔⵔⴰⵃ ⵏ ⵜⵎⵙⴰⵙⴰ ⴷ Dr Lamliki. ⵉⵙⴰⵍⵏ ⵍⵍⴰⵏ ⴳ ⵜⴱⵔⴰⵜ."]
    }),
    entry(314, "resiliation-convention-markoub", "11 Mars 2026", "png", "partnership", ["pdf"], {
      fr: ["Résiliation de la convention avec Markoub.ma", "La Fondation informe ses adhérents de la résiliation de la convention conclue avec la société Markoub.ma. Les précisions officielles figurent dans l’avis joint."],
      ar: ["إنهاء الاتفاقية مع شركة Markoub.ma", "تخبر المؤسسة منخرطيها بإنهاء الاتفاقية المبرمة مع شركة Markoub.ma. وترد التفاصيل الرسمية في الإشعار المرفق."],
      zgh: ["ⴰⵙⵔⵔⴰⵃ ⵏ ⵜⵎⵙⴰⵙⴰ ⴷ Markoub.ma", "ⵜⵙⵙⵏ ⵜⵎⵙⵙⵓⵔⵜ ⵉⵎⵏⵖⵔⴰⴹⵏ ⵙ ⵓⵙⵔⵔⴰⵃ ⵏ ⵜⵎⵙⴰⵙⴰ ⴷ Markoub.ma. ⵉⵙⴰⵍⵏ ⵍⵍⴰⵏ ⴳ ⵜⴱⵔⴰⵜ."]
    }),
    entry(313, "bank-assafa-mourabaha-sakane-2026", "09 Mars 2026", "jpg", "housing", ["pdf"], {
      fr: ["BANK ASSAFA : nouvelle grille Mourabaha Sakane", "BANK ASSAFA révise à la baisse les taux appliqués aux financements immobiliers Mourabaha Sakane. Consultez la fiche détaillée pour connaître les nouvelles conditions."],
      ar: ["بنك الصفاء: شبكة جديدة لمرابحة السكن", "يراجع بنك الصفاء نحو الانخفاض النسب المطبقة على تمويلات مرابحة السكن. يرجى الاطلاع على البطاقة التفصيلية لمعرفة الشروط الجديدة."],
      zgh: ["BANK ASSAFA: ⵜⴰⴼⵔⴰⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ ⵏ Mourabaha Sakane", "BANK ASSAFA ⵉⵙⵏⴼⵍ ⵜⵉⵎⴷⵉ ⵏ Mourabaha Sakane ⵙ ⵓⴷⵔⵓⵙ. ⵥⵕ ⵜⴰⴼⵔⴰⵜ ⵉ ⵜⵉⵍⴰⵡⵜ ⵜⵉⵎⴰⵢⵏⵓⵜ."]
    }),
    entry(312, "aide-pelerinage-2026", "20 Février 2026", "png", "social", ["pdf"], {
      fr: ["Aide au pèlerinage pour la saison 1447 H / 2026", "La Fondation accorde une aide financière aux adhérents qui accompliront le pèlerinage en 2026, dans la limite des demandes acceptées, des conditions définies et des crédits annuels disponibles."],
      ar: ["الحج إلى بيت الله الحرام برسم موسم 1447هـ/2026م", "تقدم المؤسسة دعماً مادياً للمنخرطين الذين سيؤدون فريضة الحج سنة 2026، في حدود الطلبات المقبولة والشروط المحددة والاعتمادات المالية السنوية المتاحة."],
      zgh: ["ⵜⵉⵡⵙⵉ ⵉ ⵍⵃⴰⵊⵊ 1447 H / 2026", "ⵜⴼⴽⴰ ⵜⵎⵙⵙⵓⵔⵜ ⵜⵉⵡⵙⵉ ⵜⴰⴷⵔⵉⵎⵜ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ ⵉⵔⴰⴷ ⵉⴷⴷⵓⵏ ⵖⵔ ⵍⵃⴰⵊⵊ 2026, ⵙ ⵜⵉⵍⴰⵡⵜ ⴷ ⵉⴷⵔⵉⵎⵏ ⵉⵍⵍⴰⵏ."]
    }),
    entry(311, "aide-vacances-inscriptions-2026", "20 Février 2026", "png", "leisure", ["pdf", "pdf", "pdf", "pdf"], {
      fr: ["Aide aux vacances des adhérents 2026", "La Fondation ouvre les inscriptions à son programme annuel d’aide financière directe aux vacances pour 2026. La note et les documents de réservation précisent les conditions et la procédure."],
      ar: ["دعم عطل المنخرطين برسم سنة 2026", "تفتح المؤسسة التسجيل في البرنامج السنوي للدعم المادي المباشر للعطل برسم 2026. وتوضح المذكرة ووثائق الحجز الشروط والإجراءات."],
      zgh: ["ⵜⵉⵡⵙⵉ ⵉ ⵓⵙⵔⴼ ⵏ ⵉⵎⵏⵖⵔⴰⴹⵏ 2026", "ⵜⵍⴷⵉ ⵜⵎⵙⵙⵓⵔⵜ ⴰⵣⵎⵎⴻⵎ ⴳ ⵓⵙⵏⴰⵎⴰⵍ ⴰⵙⴳⴳⵯⴰⵙ ⵏ ⵜⵉⵡⵙⵉ ⵉ ⵓⵙⵔⴼ 2026. ⵜⴱⵔⴰⵜ ⴷ ⵉⵙⵎⵍⵏ ⵙⵙⵏⵏ ⵜⵉⵍⴰⵡⵜ."]
    }),
    entry(310, "rappel-offres-centres-vacances-douanes", "20 Février 2026", "png", "leisure", ["pdf", "pdf", "pdf"], {
      fr: ["Rappel des offres de réservation des centres de vacances des Douanes", "La Fondation rappelle les offres préférentielles de réservation d’appartements dans les centres de l’Association des œuvres sociales de l’Administration des Douanes. Les formulaires et la procédure sont joints."],
      ar: ["تذكير بالعروض التفضيلية لمراكز جمعية الأعمال الاجتماعية للجمارك", "تذكر المؤسسة بالعروض التفضيلية لحجز الشقق بمراكز جمعية الأعمال الاجتماعية لإدارة الجمارك. وتتوفر رفقته استمارات الطلب ومساطر الحجز."],
      zgh: ["ⴰⵙⵎⴽⵜⵉ ⵏ ⵜⵉⵡⵙⵉⵡⵉⵏ ⵏ ⵉⵎⵔⴽⴰⵣ ⵏ ⵓⵙⵔⴼ ⵏ Douanes", "ⵜⵙⵎⴽⵜⴰⵢ ⵜⵎⵙⵙⵓⵔⵜ ⵜⵉⵡⵙⵉⵡⵉⵏ ⵙ ⵜⵉⵖⴼⵉⴹⵉⵏ ⵉ ⵓⵙⵔⴼ ⴳ ⵉⵎⵔⴽⴰⵣ ⵏ Douanes. ⵉⵙⵎⵍⵏ ⴷ ⵜⵎⵙⵙⵉⵔⵜ ⵍⵍⴰⵏ ⴷⴷⴰⵡ."]
    }),
    entry(309, "convention-assurance-automobile-mamda", "11 Février 2026", "png", "partnership", ["pdf", "jpg", "jpg", "jpg", "jpg", "jpg"], {
      fr: ["Convention d’assurance automobile avec la MAMDA", "Une nouvelle convention avec la Mutuelle Agricole Marocaine d’Assurances permet aux adhérents de bénéficier de tarifs préférentiels et d’avantages exclusifs dans une offre automobile enrichie."],
      ar: ["اتفاقية للتأمين على السيارات مع التعاضدية الفلاحية المغربية للتأمين", "تتيح الاتفاقية الجديدة مع MAMDA للمنخرطين الاستفادة من أسعار تفضيلية وامتيازات حصرية ضمن عرض محسن للتأمين على السيارات."],
      zgh: ["ⵜⴰⵎⵙⴰⵙⴰ ⵏ ⵓⵙⵙⴼⵔ ⵏ ⵜⴽⵔⵔⵓⵙⵜ ⴷ MAMDA", "ⵜⴰⵎⵙⴰⵙⴰ ⵜⴰⵎⴰⵢⵏⵓⵜ ⴷ MAMDA ⵜⴼⴽⴰ ⵜⵉⵖⴼⵉⴹⵉⵏ ⴷ ⵉⵎⵏⴼⴰⵄⵏ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ ⴳ ⵓⵙⵙⴼⵔ ⵏ ⵜⴽⵔⵔⵓⵙⵜ."]
    }),
    entry(308, "aide-besoins-specifiques-2026", "11 Février 2026", "png", "social", ["pdf", "pdf", "pdf", "pdf"], {
      fr: ["Aide aux enfants et conjoints en situation de handicap pour 2026", "Les adhérents peuvent demander l’aide financière destinée à leurs enfants ou conjoints en situation de handicap avant le 28 février 2026, en déposant les pièces requises sur le site de la Fondation."],
      ar: ["دعم أبناء وأزواج المنخرطين من ذوي الاحتياجات الخاصة برسم 2026", "يمكن للمنخرطين طلب الدعم المالي المخصص لأبنائهم أو أزواجهم من ذوي الاحتياجات الخاصة قبل 28 فبراير 2026، مع تحميل الوثائق المطلوبة على موقع المؤسسة."],
      zgh: ["ⵜⵉⵡⵙⵉ ⵉ ⵜⴰⵔⵡⴰ ⴷ ⵉⵎⵢⴰⴳⴳⴰⵏ ⵙ ⵉⵙⵔⵙⴰⵏ ⵉⵎⵥⵍⵉⵏ 2026", "ⵉⵣⵎⵔ ⵉⵎⵏⵖⵔⴰⴹⵏ ⴰⴷ ⵙⵙⵓⵜⵔⵏ ⵜⵉⵡⵙⵉ ⵜⴰⴷⵔⵉⵎⵜ ⵉ ⵜⴰⵔⵡⴰ ⵏⵉⵖ ⵉⵎⵢⴰⴳⴳⴰⵏ ⴷⴰⵜ 28 ⴼⵓⵕⴰⵕ 2026 ⵙ ⵉⵙⵎⵍⵏ ⵉⵜⵜⵓⵙⵓⵜⵔⵏ."]
    }),
    entry(307, "sejour-linguistique-londres-2026", "05 Février 2026", "png", "education", ["pdf", "png"], {
      fr: ["Séjour linguistique, culturel et éducatif à Londres – été 2026", "Un séjour à Londres est proposé du 11 au 18 août 2026 aux enfants d’adhérents âgés de 16 à 18 ans, en partenariat avec une agence spécialisée. La note présente le programme et l’inscription."],
      ar: ["إقامة لغوية وثقافية وتربوية بلندن – صيف 2026", "تقترح المؤسسة إقامة بلندن من 11 إلى 18 غشت 2026 لفائدة أبناء المنخرطين بين 16 و18 سنة، بشراكة مع وكالة متخصصة. وتوضح المذكرة البرنامج والتسجيل."],
      zgh: ["ⴰⵙⵔⴼ ⴰⵎⵙⵙⴰⵡⴰⴹ, ⴰⴷⵍⵙⴰⵏ ⴷ ⵓⵙⴳⵎⵉ ⴳ London – 2026", "ⴰⵙⵔⴼ ⴳ London ⵙⴳ 11 ⴰⵔ 18 ⵖⵓⵛⵜ 2026 ⵉ ⵜⴰⵔⵡⴰ ⵏ 16 ⴰⵔ 18 ⵓⵙⴳⴳⵯⴰⵙ, ⴳ ⵜⵎⵙⴷⵓⴽⴽⴰⵍ ⴷ ⵜⴰⵊⴰⵏⵙⵜ. ⵜⴱⵔⴰⵜ ⵜⵙⵙⵏ ⴰⵙⵏⴰⵎⴰⵍ ⴷ ⵓⵣⵎⵎⴻⵎ."]
    }),
    entry(306, "al-barid-bank-offre-avril-2026", "05 Février 2026", "jpg", "finance", ["pdf"], {
      fr: ["AL BARID BANK : offre promotionnelle jusqu’au 15 avril 2026", "AL BARID BANK propose aux adhérents actifs et retraités une offre promotionnelle sur le crédit à la consommation, valable jusqu’au 15 avril 2026. La fiche jointe détaille les conditions."],
      ar: ["البريد بنك: عرض ترويجي إلى غاية 15 أبريل 2026", "يقدم البريد بنك للمنخرطين العاملين والمتقاعدين عرضاً ترويجياً لقروض الاستهلاك صالحاً إلى غاية 15 أبريل 2026. وتوضح البطاقة المرفقة الشروط."],
      zgh: ["AL BARID BANK: ⵜⴰⵡⵙⴰ ⵏ ⵓⵙⵙⵏⵣⵉ ⴰⵔ 15 ⵉⴱⵔⵉⵔ 2026", "AL BARID BANK ⵉⵜⵜⴼⴽⴰ ⵜⴰⵡⵙⴰ ⵏ ⵉⵙⵔⵙⵏ ⵏ ⵓⵙⵎⵔⵙ ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ ⴰⵔ 15 ⵉⴱⵔⵉⵔ 2026. ⵜⴰⴼⵔⴰⵜ ⵜⵙⵙⵏ ⵜⵉⵍⴰⵡⵜ."]
    }),
    entry(305, "cgi-the-park-iii-casa-anfa", "04 Février 2026", "png", "housing", [], {
      fr: ["Commercialisation de « The Park III – Casa Anfa »", "CGI lance une nouvelle tranche résidentielle à Casa Anfa avec une remise exceptionnelle de 5 % pour les adhérents. Contact : 06 64 38 22 01 ou 080 100 28 28, et création d’un compte client conventionné sur cgi.ma."],
      ar: ["تسويق الشطر السكني «The Park III – Casa Anfa»", "تطلق CGI شطراً سكنياً جديداً بكازا أنفا مع تخفيض استثنائي بنسبة 5% للمنخرطين. للمعلومات: 06 64 38 22 01 أو 080 100 28 28، وإنشاء حساب زبون متعاقد على cgi.ma."],
      zgh: ["ⴰⵙⵙⵏⵣⵉ ⵏ «The Park III – Casa Anfa»", "CGI ⵜⵙⵙⵏⵜⵉ ⴰⵎⵓⵔ ⴰⵎⴰⵢⵏⵓ ⴳ Casa Anfa ⵙ ⵜⵖⴼⵉⴹⵜ ⵏ 5% ⵉ ⵉⵎⵏⵖⵔⴰⴹⵏ. ⵉⵙⴰⵍⵏ: 06 64 38 22 01 ⵏⵉⵖ 080 100 28 28, ⴷ ⵓⵎⵉⴹⴰⵏ ⴳ cgi.ma."]
    }),
    entry(304, "banque-populaire-prolongation-offre-janvier-2026", "09 Janvier 2026", "png", "finance", ["pdf"], {
      fr: ["Banque Populaire : prolongation de l’offre jusqu’à fin janvier 2026", "La Banque Populaire prolonge son offre promotionnelle jusqu’à la fin de janvier 2026. L’offre comprend plusieurs services et prestations dont le détail figure dans le document joint."],
      ar: ["البنك الشعبي: تمديد العرض الترويجي إلى نهاية يناير 2026", "يمدد البنك الشعبي عرضه الترويجي إلى نهاية يناير 2026. ويشمل العرض مجموعة من الخدمات والامتيازات المفصلة في الوثيقة المرفقة."],
      zgh: ["Banque Populaire: ⴰⵙⵎⵖⵔ ⵏ ⵜⴰⵡⵙⴰ ⴰⵔ ⵜⴰⴳⴳⴰⵔⵜ ⵏ ⵉⵏⵏⴰⵢⵔ 2026", "Banque Populaire ⵉⵙⵎⵖⵔ ⵜⴰⵡⵙⴰ ⴰⵔ ⵜⴰⴳⴳⴰⵔⵜ ⵏ ⵉⵏⵏⴰⵢⵔ 2026. ⵜⴰⵡⵙⴰ ⵜⵙⴷⵓⵙ ⵉⵎⴰⵍⴰⵙⵙⵏ ⴷ ⵉⵎⵏⴼⴰⵄⵏ ⵉⵍⵍⴰⵏ ⴳ ⵓⵙⵎⵍ."]
    })
  ];
})();
