import { TRANSLATIONS, Language, TranslationData } from './i18n';

let currentLang: Language = 'es';
let currentRole = 'analyst';

function getInitialLanguage(): Language {
  const saved = localStorage.getItem('webmcp_lang');
  if (saved && (saved === 'es' || saved === 'en' || saved === 'pt')) {
    return saved as Language;
  }
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('pt')) return 'pt';
  return 'es';
}

function setLanguage(lang: Language) {
  currentLang = lang;
  localStorage.setItem('webmcp_lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  applyTranslations(TRANSLATIONS[lang]);
}

function applyTranslations(t: TranslationData) {
  // 1. Navigation
  const navLinks = document.querySelectorAll('.nav-links a');
  if (navLinks.length >= 6) {
    navLinks[0].textContent = t.nav.whatIs;
    navLinks[1].textContent = t.nav.tools;
    navLinks[2].textContent = t.nav.advantages;
    navLinks[3].textContent = t.nav.howTo;
    navLinks[4].textContent = t.nav.useCases;
    navLinks[5].textContent = t.nav.faq;
  }
  const navBtnTxt = document.getElementById('txt-nav-open');
  if (navBtnTxt) navBtnTxt.textContent = t.nav.openStudio;

  // 2. Hero Section
  const heroPill = document.querySelector('.hero-pill span:last-child');
  if (heroPill) heroPill.textContent = t.hero.pill;

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.innerHTML = t.hero.title;

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) heroSubtitle.innerHTML = t.hero.subtitle;

  // Hero CTAs
  const ctaStudio = document.querySelector('.btn-hero-primary .cta-text');
  if (ctaStudio) {
    ctaStudio.innerHTML = `<strong>${t.hero.ctaStudioTitle}</strong><span>${t.hero.ctaStudioDesc}</span>`;
  }
  const secondaryCtas = document.querySelectorAll('.btn-hero-secondary .cta-text');
  if (secondaryCtas.length >= 2) {
    secondaryCtas[0].innerHTML = `<strong>${t.hero.ctaCodeTitle}</strong><span>${t.hero.ctaCodeDesc}</span>`;
    secondaryCtas[1].innerHTML = `<strong>${t.hero.ctaMockarooTitle}</strong><span>${t.hero.ctaMockarooDesc}</span>`;
  }

  // Capabilities bar
  const capItems = document.querySelectorAll('.capabilities-bar .cap-item');
  if (capItems.length >= 4) {
    capItems[0].innerHTML = `<span class="cap-dot green"></span> ${t.hero.capZeroInstall}`;
    capItems[1].innerHTML = `<span class="cap-dot green"></span> ${t.hero.capPrivate}`;
    capItems[2].innerHTML = `<span class="cap-dot green"></span> ${t.hero.capZeroCost}`;
    capItems[3].innerHTML = `<span class="cap-dot green"></span> ${t.hero.capSpeed}`;
  }

  // 3. Showcase Live Preview
  const winTitle = document.querySelector('.window-title');
  if (winTitle) winTitle.textContent = t.showcase.windowTitle;

  const wasmBadge = document.querySelector('.wasm-live-badge');
  if (wasmBadge) wasmBadge.textContent = t.showcase.wasmBadge;

  const qPrompt = document.querySelector('.sql-prompt-line span:last-child');
  if (qPrompt) qPrompt.textContent = t.showcase.queryPrompt;

  const metaExec = document.querySelector('.results-meta-bar span:first-child');
  if (metaExec) metaExec.textContent = t.showcase.metaExecution;

  const tableHeaders = document.querySelectorAll('.preview-table th');
  if (tableHeaders.length >= 4) {
    tableHeaders[0].textContent = t.showcase.colName;
    tableHeaders[1].textContent = t.showcase.colRole;
    tableHeaders[2].textContent = t.showcase.colProject;
    tableHeaders[3].textContent = t.showcase.colBudget;
  }

  // 4. Paradigm section
  const pTag = document.querySelector('#que-es .section-tag');
  if (pTag) pTag.textContent = t.paradigm.tag;

  const pTitle = document.querySelector('#que-es .section-title');
  if (pTitle) pTitle.textContent = t.paradigm.title;

  const pSubtitle = document.querySelector('#que-es .section-subtitle');
  if (pSubtitle) pSubtitle.textContent = t.paradigm.subtitle;

  const oldCard = document.querySelector('.paradigm-card.old-way');
  if (oldCard) {
    const badge = oldCard.querySelector('.card-status-badge');
    if (badge) badge.textContent = t.paradigm.oldBadge;
    const h3 = oldCard.querySelector('h3');
    if (h3) h3.textContent = t.paradigm.oldTitle;
    const items = oldCard.querySelectorAll('li');
    if (items.length >= 4) {
      items[0].innerHTML = t.paradigm.oldItem1;
      items[1].innerHTML = t.paradigm.oldItem2;
      items[2].innerHTML = t.paradigm.oldItem3;
      items[3].innerHTML = t.paradigm.oldItem4;
    }
  }

  const newCard = document.querySelector('.paradigm-card.new-way');
  if (newCard) {
    const badge = newCard.querySelector('.card-status-badge');
    if (badge) badge.textContent = t.paradigm.newBadge;
    const h3 = newCard.querySelector('h3');
    if (h3) h3.textContent = t.paradigm.newTitle;
    const items = newCard.querySelectorAll('li');
    if (items.length >= 4) {
      items[0].innerHTML = t.paradigm.newItem1;
      items[1].innerHTML = t.paradigm.newItem2;
      items[2].innerHTML = t.paradigm.newItem3;
      items[3].innerHTML = t.paradigm.newItem4;
    }
  }

  // 5. Tools section (7 tools)
  const tTag = document.querySelector('#herramientas .section-tag');
  if (tTag) tTag.textContent = t.toolsSection.tag;

  const tTitle = document.querySelector('#herramientas .section-title');
  if (tTitle) tTitle.textContent = t.toolsSection.title;

  const tSubtitle = document.querySelector('#herramientas .section-subtitle');
  if (tSubtitle) tSubtitle.textContent = t.toolsSection.subtitle;

  const toolCards = document.querySelectorAll('.tool-card');
  const toolDefs = [
    { name: t.toolsSection.tool1Name, desc: t.toolsSection.tool1Desc },
    { name: t.toolsSection.tool2Name, desc: t.toolsSection.tool2Desc },
    { name: t.toolsSection.tool3Name, desc: t.toolsSection.tool3Desc },
    { name: t.toolsSection.tool4Name, desc: t.toolsSection.tool4Desc },
    { name: t.toolsSection.tool5Name, desc: t.toolsSection.tool5Desc },
    { name: t.toolsSection.tool6Name, desc: t.toolsSection.tool6Desc },
    { name: t.toolsSection.tool7Name, desc: t.toolsSection.tool7Desc },
  ];

  toolCards.forEach((card, idx) => {
    if (toolDefs[idx]) {
      const title = card.querySelector('.tool-card-title');
      if (title) title.textContent = toolDefs[idx].name;
      const desc = card.querySelector('.tool-card-desc');
      if (desc) desc.textContent = toolDefs[idx].desc;
      const btn = card.querySelector('.btn-tool-action');
      if (btn) btn.innerHTML = `${t.toolsSection.ctaRunInStudio} &rarr;`;
    }
  });

  // 6. Comparison Matrix
  const compTag = document.querySelector('#ventajas .section-tag');
  if (compTag) compTag.textContent = t.comparison.tag;

  const compTitle = document.querySelector('#ventajas .section-title');
  if (compTitle) compTitle.textContent = t.comparison.title;

  const compSubtitle = document.querySelector('#ventajas .section-subtitle');
  if (compSubtitle) compSubtitle.textContent = t.comparison.subtitle;

  const compHeaders = document.querySelectorAll('.comparison-table th');
  if (compHeaders.length >= 5) {
    compHeaders[0].textContent = t.comparison.colFeature;
    compHeaders[1].textContent = t.comparison.colCloudDb;
    compHeaders[2].textContent = t.comparison.colDesktopGui;
    compHeaders[3].textContent = t.comparison.colSheets;
    compHeaders[4].textContent = t.comparison.colWebmcp;
  }

  const compRows = document.querySelectorAll('.comparison-table tbody tr');
  if (compRows.length >= 6) {
    // Row 1: Start
    compRows[0].children[0].innerHTML = `<strong>${t.comparison.rowStart}</strong>`;
    compRows[0].children[1].textContent = t.comparison.rowStartCloud;
    compRows[0].children[2].textContent = t.comparison.rowStartDesktop;
    compRows[0].children[3].textContent = t.comparison.rowStartSheets;
    compRows[0].children[4].innerHTML = `<strong class="text-green">${t.comparison.rowStartWebmcp}</strong>`;

    // Row 2: Cost
    compRows[1].children[0].innerHTML = `<strong>${t.comparison.rowCost}</strong>`;
    compRows[1].children[1].textContent = t.comparison.rowCostCloud;
    compRows[1].children[2].textContent = t.comparison.rowCostDesktop;
    compRows[1].children[3].textContent = t.comparison.rowCostSheets;
    compRows[1].children[4].innerHTML = `<strong class="text-green">${t.comparison.rowCostWebmcp}</strong>`;

    // Row 3: Privacy
    compRows[2].children[0].innerHTML = `<strong>${t.comparison.rowPrivacy}</strong>`;
    compRows[2].children[1].textContent = t.comparison.rowPrivacyCloud;
    compRows[2].children[2].textContent = t.comparison.rowPrivacyDesktop;
    compRows[2].children[3].textContent = t.comparison.rowPrivacySheets;
    compRows[2].children[4].innerHTML = `<strong class="text-green">${t.comparison.rowPrivacyWebmcp}</strong>`;

    // Row 4: Speed
    compRows[3].children[0].innerHTML = `<strong>${t.comparison.rowSpeed}</strong>`;
    compRows[3].children[1].textContent = t.comparison.rowSpeedCloud;
    compRows[3].children[2].textContent = t.comparison.rowSpeedDesktop;
    compRows[3].children[3].textContent = t.comparison.rowSpeedSheets;
    compRows[3].children[4].innerHTML = `<strong class="text-green">${t.comparison.rowSpeedWebmcp}</strong>`;

    // Row 5: AI Tools
    compRows[4].children[0].innerHTML = `<strong>${t.comparison.rowAi}</strong>`;
    compRows[4].children[1].textContent = t.comparison.rowAiCloud;
    compRows[4].children[2].textContent = t.comparison.rowAiDesktop;
    compRows[4].children[3].textContent = t.comparison.rowAiSheets;
    compRows[4].children[4].innerHTML = `<strong class="text-green">${t.comparison.rowAiWebmcp}</strong>`;

    // Row 6: Export
    compRows[5].children[0].innerHTML = `<strong>${t.comparison.rowExport}</strong>`;
    compRows[5].children[1].textContent = t.comparison.rowExportCloud;
    compRows[5].children[2].textContent = t.comparison.rowExportDesktop;
    compRows[5].children[3].textContent = t.comparison.rowExportSheets;
    compRows[5].children[4].innerHTML = `<strong class="text-green">${t.comparison.rowExportWebmcp}</strong>`;
  }

  // 7. How to use (3 steps)
  const howTag = document.querySelector('#como-usar .section-tag');
  if (howTag) howTag.textContent = t.howTo.tag;

  const howTitle = document.querySelector('#como-usar .section-title');
  if (howTitle) howTitle.textContent = t.howTo.title;

  const howSubtitle = document.querySelector('#como-usar .section-subtitle');
  if (howSubtitle) howSubtitle.textContent = t.howTo.subtitle;

  const stepCards = document.querySelectorAll('.step-card');
  if (stepCards.length >= 3) {
    stepCards[0].querySelector('.step-number')!.textContent = t.howTo.step1Num;
    stepCards[0].querySelector('h3')!.textContent = t.howTo.step1Title;
    stepCards[0].querySelector('p')!.textContent = t.howTo.step1Desc;

    stepCards[1].querySelector('.step-number')!.textContent = t.howTo.step2Num;
    stepCards[1].querySelector('h3')!.textContent = t.howTo.step2Title;
    stepCards[1].querySelector('p')!.textContent = t.howTo.step2Desc;

    stepCards[2].querySelector('.step-number')!.textContent = t.howTo.step3Num;
    stepCards[2].querySelector('h3')!.textContent = t.howTo.step3Title;
    stepCards[2].querySelector('p')!.textContent = t.howTo.step3Desc;
  }

  // 8. Role Selector
  const rTag = document.querySelector('#perfiles .section-tag');
  if (rTag) rTag.textContent = t.roles.tag;

  const rTitle = document.querySelector('#perfiles .section-title');
  if (rTitle) rTitle.textContent = t.roles.title;

  const rSubtitle = document.querySelector('#perfiles .section-subtitle');
  if (rSubtitle) rSubtitle.textContent = t.roles.subtitle;

  const roleTabs = document.querySelectorAll('.role-tab');
  if (roleTabs.length >= 4) {
    roleTabs[0].textContent = t.roles.tabAnalyst;
    roleTabs[1].textContent = t.roles.tabData;
    roleTabs[2].textContent = t.roles.tabEdu;
    roleTabs[3].textContent = t.roles.tabDev;
  }
  renderActiveRole();

  // 9. FAQ
  const faqTag = document.querySelector('#faq .section-tag');
  if (faqTag) faqTag.textContent = t.faq.tag;

  const faqTitle = document.querySelector('#faq .section-title');
  if (faqTitle) faqTitle.textContent = t.faq.title;

  const faqSubtitle = document.querySelector('#faq .section-subtitle');
  if (faqSubtitle) faqSubtitle.textContent = t.faq.subtitle;

  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length >= 5) {
    faqItems[0].querySelector('.faq-question span:first-child')!.textContent = t.faq.q1;
    faqItems[0].querySelector('.faq-answer p')!.innerHTML = t.faq.a1;

    faqItems[1].querySelector('.faq-question span:first-child')!.textContent = t.faq.q2;
    faqItems[1].querySelector('.faq-answer p')!.innerHTML = t.faq.a2;

    faqItems[2].querySelector('.faq-question span:first-child')!.textContent = t.faq.q3;
    faqItems[2].querySelector('.faq-answer p')!.innerHTML = t.faq.a3;

    faqItems[3].querySelector('.faq-question span:first-child')!.textContent = t.faq.q4;
    faqItems[3].querySelector('.faq-answer p')!.innerHTML = t.faq.a4;

    faqItems[4].querySelector('.faq-question span:first-child')!.textContent = t.faq.q5;
    faqItems[4].querySelector('.faq-answer p')!.innerHTML = t.faq.a5;
  }

  // 10. Bottom CTA Banner
  const botTitle = document.querySelector('.cta-banner-title');
  if (botTitle) botTitle.textContent = t.bottomCta.title;

  const botSubtitle = document.querySelector('.cta-banner-subtitle');
  if (botSubtitle) botSubtitle.textContent = t.bottomCta.subtitle;

  const botButtons = document.querySelectorAll('.cta-banner-buttons .btn');
  if (botButtons.length >= 3) {
    botButtons[0].innerHTML = t.bottomCta.btnStudio;
    botButtons[1].innerHTML = t.bottomCta.btnCodeStudio;
    botButtons[2].innerHTML = t.bottomCta.btnMockaroo;
  }

  // 11. Footer
  const footerText = document.querySelector('.footer-text');
  if (footerText) footerText.textContent = t.footer.text;

  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) footerCopy.textContent = t.footer.copy;

  const footerHeaders = document.querySelectorAll('.footer-links-group h4');
  if (footerHeaders.length >= 2) {
    footerHeaders[0].textContent = t.footer.trilogyTitle;
    footerHeaders[1].textContent = t.footer.resourcesTitle;
  }

  const trilogyLinks = document.querySelectorAll('.footer-links-group:first-of-type a');
  if (trilogyLinks.length >= 3) {
    trilogyLinks[0].textContent = t.footer.trilogyStudio;
    trilogyLinks[1].textContent = t.footer.trilogyCode;
    trilogyLinks[2].textContent = t.footer.trilogyMockaroo;
  }

  const resLinks = document.querySelectorAll('.footer-links-group:last-of-type a');
  if (resLinks.length >= 3) {
    resLinks[0].textContent = t.footer.resSqliteDocs;
    resLinks[1].textContent = t.footer.resW3c;
    resLinks[2].textContent = t.footer.resGithub;
  }
}

function renderActiveRole() {
  const t = TRANSLATIONS[currentLang];
  const roleCard = document.querySelector('.role-detail-card');
  if (!roleCard) return;

  const titleEl = roleCard.querySelector('h3');
  const quoteEl = roleCard.querySelector('.role-quote');
  const pointsList = roleCard.querySelector('.role-points');
  const benefitLabel = roleCard.querySelector('.role-highlight-box strong');
  const benefitValue = roleCard.querySelector('.role-highlight-box span');

  let title = '';
  let quote = '';
  let points: string[] = [];
  let bLabel = '';
  let bValue = '';

  if (currentRole === 'analyst') {
    title = t.roles.analystTitle;
    quote = t.roles.analystQuote;
    points = [t.roles.analystP1, t.roles.analystP2, t.roles.analystP3];
    bLabel = t.roles.analystBenefitLabel;
    bValue = t.roles.analystBenefitValue;
  } else if (currentRole === 'data') {
    title = t.roles.dataTitle;
    quote = t.roles.dataQuote;
    points = [t.roles.dataP1, t.roles.dataP2, t.roles.dataP3];
    bLabel = t.roles.dataBenefitLabel;
    bValue = t.roles.dataBenefitValue;
  } else if (currentRole === 'edu') {
    title = t.roles.eduTitle;
    quote = t.roles.eduQuote;
    points = [t.roles.eduP1, t.roles.eduP2, t.roles.eduP3];
    bLabel = t.roles.eduBenefitLabel;
    bValue = t.roles.eduBenefitValue;
  } else {
    title = t.roles.devTitle;
    quote = t.roles.devQuote;
    points = [t.roles.devP1, t.roles.devP2, t.roles.devP3];
    bLabel = t.roles.devBenefitLabel;
    bValue = t.roles.devBenefitValue;
  }

  if (titleEl) titleEl.textContent = title;
  if (quoteEl) quoteEl.textContent = quote;
  if (pointsList) {
    pointsList.innerHTML = points.map((p) => `<li>${p}</li>`).join('');
  }
  if (benefitLabel) benefitLabel.textContent = `${bLabel}:`;
  if (benefitValue) benefitValue.textContent = bValue;
}

document.addEventListener('DOMContentLoaded', () => {
  // Init language
  const initLang = getInitialLanguage();
  setLanguage(initLang);

  // Language buttons listener
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') as Language;
      if (lang) setLanguage(lang);
    });
  });

  // Role tab selector listener
  document.querySelectorAll('.role-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.role-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentRole = tab.getAttribute('data-role') || 'analyst';
      renderActiveRole();
    });
  });

  // FAQ accordion listener
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (item) {
        item.classList.toggle('open');
      }
    });
  });
});
