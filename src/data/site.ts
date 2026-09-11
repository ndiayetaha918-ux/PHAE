/* Toute la matière éditoriale du site, en un seul endroit.
   Les valeurs chiffrées sont documentées dans docs/01-INVENTAIRE.md.
   Aucune n'est inventée. */

export const identity = {
  name: 'Phare des Mamelles',
  role: 'Musée national des Phares et Balises',
  city: 'Dakar, Sénégal',
  url: 'https://www.pharedesmamelles.sn',
};

/* Les quatre nombres qui définissent le lieu. */
export const facts = {
  built: 1864,
  rotationSeconds: 5,
  rangeKm: 53,
  altitudeM: 126,
  towerM: 16,
  oldestArchive: 1862,
  costFrancs: '86 000',
  distanceAlmadiesKm: 4,
};

export const contact = {
  address: ['Route de l’Aéroport', 'Les Mamelles', 'Dakar'],
  phone: '+221 77 343 72 72',
  phoneHref: '+221773437272',
  email: 'contact@pharedesmamelles.com',
};

export const museum = {
  hours: 'Du mardi au dimanche, 10h à 18h',
  price: 'À partir de 3 000 FCFA',
  free: 'Entrée offerte aux clients du restaurant',
  ticketing: 'Billetterie tenue sur place par le Port Autonome de Dakar',
};

export const openingHours = [
  { day: 'Lundi', hours: 'Fermé', closed: true },
  { day: 'Mardi et mercredi', hours: '11h30 à 00h00' },
  { day: 'Jeudi', hours: '11h30 à 01h30' },
  { day: 'Vendredi', hours: '11h30 à 02h30' },
  { day: 'Samedi', hours: '09h30 à 02h30' },
  { day: 'Dimanche', hours: '09h30 à 00h00' },
];

export const nav = [
  { href: '#le-feu', label: 'Le feu' },
  { href: '#la-colline', label: 'La colline' },
  { href: '#le-musee', label: 'Le musée' },
  { href: '#rendez-vous', label: 'Rendez-vous' },
  { href: '#venir', label: 'Venir' },
];

/* Le parcours de l'exposition, tel que décrit par le musée. */
export const collection = [
  {
    year: '1862',
    title: 'Les archives fondatrices',
    body:
      'Les pièces manuscrites du lancement du projet, les documents de la commission des phares, la budgétisation et les plans d’architecte. La plus ancienne est datée de 1862, deux ans avant l’allumage.',
  },
  {
    year: null,
    title: 'Les routes maritimes',
    body:
      'L’histoire des routes de navigation à travers les civilisations, racontée par les phares mythiques qui les ont jalonnées.',
  },
  {
    year: null,
    title: 'L’optique',
    body:
      'Les principes physiques de la réfraction et leur évolution scientifique, de la lampe à huile à la lentille à échelons.',
  },
  {
    year: null,
    title: 'Le balisage',
    body:
      'La réglementation maritime et le système de balises qui organise l’approche des côtes.',
  },
  {
    year: null,
    title: 'Contes et légendes',
    body:
      'Le parcours se referme sur les récits locaux attachés à la presqu’île et à ses deux collines.',
  },
];

/* Programmation. Présentée comme un calendrier du lieu.
   Aucune carte, aucune boisson, aucun produit mis en avant. */
export const programme = [
  { when: 'Du mardi au jeudi', what: 'Scène à partir de 21h00, puis platines résidentes' },
  { when: 'Vendredi et samedi', what: 'Formation live de 22h00 à 23h30, puis platines résidentes et invitées' },
  { when: 'Dimanche', what: 'Brunch de 10h00 à 14h00, musique live de 20h30 à 22h00' },
];

export const privateEvents = [
  'Afterwork',
  'Séminaires',
  'Team building',
  'Lancements de produit',
  'Conférences de presse',
];
