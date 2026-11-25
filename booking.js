// Numéro WhatsApp officiel au format international, chiffres uniquement (212...).
const cabinetWhatsApp = '212601391918';
const form = document.getElementById('booking');
const reason = document.getElementById('reason');
const dateField = document.getElementById('visit-date');
const now = new Date();
dateField.min = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
function choose(value){if([...reason.options].some(o=>o.value===value))reason.value=value;}
document.querySelectorAll('[data-book]').forEach(a=>a.addEventListener('click',()=>choose(a.dataset.book)));
document.getElementById('care-book').addEventListener('click',()=>choose(document.getElementById('care-title').textContent));
document.getElementById('lab-book').addEventListener('click',()=>{const tab=document.querySelector('[data-treatment].selected');choose(['Implant dentaire','Couronne dentaire','Facette dentaire'][Number(tab?.dataset.treatment||0)]);});
const statusBox=document.getElementById('message'), copy=document.getElementById('copy-request');let draft='';
form.addEventListener('input',()=>{draft='';copy.hidden=true;statusBox.textContent='';});
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;draft=`Bonjour, je souhaite être contacté(e) par le cabinet pour une demande de rendez-vous.\nNom : ${document.getElementById('patient-name').value.trim()}\nTéléphone : ${document.getElementById('patient-phone').value.trim()}\nMotif : ${reason.value}\nDate souhaitée : ${dateField.value}\nCréneau : ${document.getElementById('visit-slot').value}\nMerci de me confirmer vos disponibilités.`;copy.hidden=false;if(/^\d{9,15}$/.test(cabinetWhatsApp)){statusBox.textContent='Envoyez votre demande dans WhatsApp. Notre équipe vous répondra pour confirmer votre rendez-vous.';window.open('https://wa.me/'+cabinetWhatsApp+'?text='+encodeURIComponent(draft),'_blank','noopener,noreferrer');}else{statusBox.textContent='Mode démonstration : numéro WhatsApp à configurer. Aucun message envoyé. Vous pouvez copier votre demande.';}});
copy.addEventListener('click',async()=>{if(!draft)return;try{await navigator.clipboard.writeText(draft);statusBox.textContent='Message copié. Aucun envoi effectué.';}catch{statusBox.textContent=draft;}});
if(/^\d{9,15}$/.test(cabinetWhatsApp)){const a=document.querySelector('[data-social="WhatsApp"]');a.href='https://wa.me/'+cabinetWhatsApp;a.target='_blank';a.rel='noopener noreferrer';a.removeAttribute('aria-disabled');}
