// Renseigner uniquement les URL officielles validées. Laisser vide pour désactiver.
const socialAccounts = {
  Facebook: "",
  Instagram: "https://www.instagram.com/cabinet.dentaire.laasry.anas/",
  TikTok: "",
  YouTube: "",
  LinkedIn: "",
  WhatsApp: "https://wa.me/212601391918"
};
document.querySelectorAll('[data-social]').forEach(link => {
  const url = socialAccounts[link.dataset.social];
  if (url && /^https:\/\//i.test(url)) {
    link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.removeAttribute('aria-disabled');
  } else { link.title = 'Lien à renseigner'; }
});
if (Object.values(socialAccounts).every(Boolean)) document.getElementById('social-note').hidden = true;
