(function () {
  var SUPPORTED = ['ru', 'en', 'uk', 'es', 'de', 'fr'];
  var STORAGE_KEY = 'plant-doctor-lang';

  var UI_STRINGS = {
    ru: { navPrivacy: 'Политика конфиденциальности', navTerms: 'Условия использования', navDelete: 'Удаление аккаунта' },
    en: { navPrivacy: 'Privacy Policy', navTerms: 'Terms of Service', navDelete: 'Delete Account' },
    uk: { navPrivacy: 'Політика конфіденційності', navTerms: 'Умови використання', navDelete: 'Видалення акаунта' },
    es: { navPrivacy: 'Política de privacidad', navTerms: 'Términos de uso', navDelete: 'Eliminar cuenta' },
    de: { navPrivacy: 'Datenschutzerklärung', navTerms: 'Nutzungsbedingungen', navDelete: 'Konto löschen' },
    fr: { navPrivacy: 'Politique de confidentialité', navTerms: "Conditions d'utilisation", navDelete: 'Supprimer le compte' }
  };

  function detectLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;

    var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (SUPPORTED.indexOf(nav) !== -1) return nav;

    return 'en';
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'en';

    // Some pages only have content for a subset of SUPPORTED languages
    // (e.g. a page freshly added in ru/en only). If the requested language
    // has no matching section here, fall back to 'en' (or the first
    // available section) for the *content*, while the nav/header still
    // follow the user's actual language preference below.
    var sections = document.querySelectorAll('[data-lang-section]');
    var contentLang = lang;
    if (sections.length && !document.querySelector('[data-lang-section="' + lang + '"]')) {
      contentLang = document.querySelector('[data-lang-section="en"]')
        ? 'en'
        : sections[0].getAttribute('data-lang-section');
    }

    sections.forEach(function (el) {
      var active = el.getAttribute('data-lang-section') === contentLang;
      el.classList.toggle('is-active', active);
    });

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var active = btn.getAttribute('data-lang-btn') === contentLang;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    var strings = UI_STRINGS[lang] || UI_STRINGS.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (strings[key]) el.textContent = strings[key];
    });

    document.documentElement.setAttribute('lang', contentLang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang-btn'));
      });
    });

    setLang(detectLang());
  });
})();
