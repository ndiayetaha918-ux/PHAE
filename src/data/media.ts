/* Manifeste des médias.
   Le domaine du site source est bloqué par la politique réseau de
   l'environnement, donc aucun visuel original n'a pu être récupéré.
   Chaque emplacement est déclaré ici avec sa proportion cible. Tant
   qu'un fichier est absent de public/media/, le composant <Plate>
   réserve l'espace au bon ratio sans casser la composition.

   Pour activer un visuel: déposer le fichier dans public/media/ sous
   le nom indiqué, puis passer `ready: true`. */

export type Plate = {
  key: string;
  src: string;
  alt: string;
  /** largeur / hauteur */
  ratio: number;
  /** largeur intrinsèque souhaitée, en pixels */
  width: number;
  ready: boolean;
};

export const plates: Record<string, Plate> = {
  archive: {
    key: 'archive',
    src: '/media/archive-1862.jpg',
    alt: 'Document d’archive de 1862, plan manuscrit du projet de phare.',
    ratio: 7 / 9,
    width: 1400,
    ready: false,
  },
  expo: {
    key: 'expo',
    src: '/media/salle-expo.jpg',
    alt: 'La salle d’exposition au rez-de-chaussée du phare.',
    ratio: 10 / 7,
    width: 2000,
    ready: false,
  },
  soir: {
    key: 'soir',
    src: '/media/soir.jpg',
    alt: 'La terrasse du phare en soirée, la presqu’île en contrebas.',
    ratio: 10 / 7,
    width: 2000,
    ready: false,
  },
};
