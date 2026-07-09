(function () {
  var SUPPORTED = ['ru', 'en', 'uk', 'es', 'de', 'fr'];
  var STORAGE_KEY = 'plant-doctor-lang';

  var UI_STRINGS = {
    ru: { navPrivacy: 'Политика конфиденциальности', navDelete: 'Удаление аккаунта' },
    en: { navPrivacy: 'Privacy Policy', navDelete: 'Delete Account' },
    uk: { navPrivacy: 'Політика конфіденційності', navDelete: 'Видалення акаунта' },
    es: { navPrivacy: 'Política de privacidad', navDelete: 'Eliminar cuenta' },
    de: { navPrivacy: 'Datenschutzerklärung', navDelete: 'Konto löschen' },
    fr: { navPrivacy: 'Politique de confidentialité', navDelete: 'Supprimer le compte' }
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

    document.querySelectorAll('[data-lang-section]').forEach(function (el) {
      var active = el.getAttribute('data-lang-section') === lang;
      el.classList.toggle('is-active', active);
    });

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var active = btn.getAttribute('data-lang-btn') === lang;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    var strings = UI_STRINGS[lang] || UI_STRINGS.en;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (strings[key]) el.textContent = strings[key];
    });

    document.documentElement.setAttribute('lang', lang);
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
