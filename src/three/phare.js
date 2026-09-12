/* Modèle du Phare des Mamelles.
   Géométrie construite par le code, pas un fichier importé: le maillage
   complet pèse quelques dizaines de kilo-octets en mémoire et rien sur
   le réseau. C'est le choix le plus léger possible pour du mobile.

   Toutes les cotes sont en mètres et les proportions sont relevées sur
   la photographie de référence, rapportées au diamètre du fût.

     fût visible au dessus du corps de logis   1.20 D
     galerie, diamètre hors tout               1.42 D
     lanterne, diamètre                        1.02 D
     lanterne, hauteur                         0.80 D
     dôme, hauteur                             0.42 D
     épi de faîtage                            0.38 D

   La tour cylindrique documentée fait 16 m. */

/* Teintes relevées sur les photographies de référence
   (docs/references/phare). Correction: le bâtiment est BLANC, pas
   crème. La première photographie était prise en lumière chaude de
   fin de journée, ce qui l'avait fait lire beige. */
export const TEINTES = {
  pierre: 0xedebe5,
  pierreOmbre: 0xd3d0c8,
  basalte: 0x2b3235,
  metal: 0x23282a,
  dome: 0xc6c6bd,
  verre: 0x7d8a8c,
  feu: 0xfff6e0,
  terre: 0x9c6a4e,
};

const D = 4.6;           // diamètre du fût
const R = D / 2;
const H_BLOC = 8.4;      // corps de logis, deux étages
const H_SOCLE = H_BLOC + 2.1;        // socle carré d'où sort le fût
const H_FUT = H_SOCLE + 1.5 * D;     // fût élancé, comme sur la photographie
const H_CORBEAU = H_FUT + 0.66;
const H_GALERIE = H_CORBEAU + 0.24;
const H_RAMBARDE = H_GALERIE + 0.2 * D;
const H_LANTERNE_BAS = H_RAMBARDE + 0.3;
const H_LANTERNE = H_LANTERNE_BAS + 0.74 * D;
const H_DOME = H_LANTERNE + 0.44 * D;
const H_EPI = H_DOME + 0.34 * D;

export const REPERES = {
  bloc: H_BLOC,
  galerie: H_GALERIE,
  lanterne: (H_LANTERNE_BAS + H_LANTERNE) / 2,
  sommet: H_EPI,
};

/* Profil du dôme: une ogive surbaissée, pas une demi-sphère.
   Relevé sur la photographie, où le dôme retombe presque droit sur
   la couronne avant de s'arrondir. */
function profilDome(THREE, rBase, hauteur, pas = 12) {
  const pts = [];
  for (let i = 0; i <= pas; i++) {
    const t = i / pas;
    const r = rBase * Math.cos((t * Math.PI) / 2) ** 0.72;
    const y = hauteur * Math.sin((t * Math.PI) / 2) ** 1.18;
    pts.push(new THREE.Vector2(Math.max(r, 0.0001), y));
  }
  return pts;
}

export function construirePhare(THREE, { qualite = 'haute' } = {}) {
  const fin = qualite === 'basse';
  const seg = fin ? 28 : 56;
  const nBalustres = fin ? 20 : 30;
  const nMontants = 12;

  const groupe = new THREE.Group();
  groupe.name = 'phare';

  const matPierre = new THREE.MeshStandardMaterial({
    color: TEINTES.pierre, roughness: 0.92, metalness: 0,
  });
  const matPierreOmbre = new THREE.MeshStandardMaterial({
    color: TEINTES.pierreOmbre, roughness: 0.94, metalness: 0,
  });
  const matBasalte = new THREE.MeshStandardMaterial({
    color: TEINTES.basalte, roughness: 0.98, metalness: 0,
  });
  const matMetal = new THREE.MeshStandardMaterial({
    color: TEINTES.metal, roughness: 0.5, metalness: 0.6,
  });
  const matDome = new THREE.MeshStandardMaterial({
    color: TEINTES.dome, roughness: 0.62, metalness: 0.35,
  });
  const matVerre = new THREE.MeshStandardMaterial({
    color: TEINTES.verre, roughness: 0.1, metalness: 0.15,
    transparent: true, opacity: 0.46,
  });
  const matFeu = new THREE.MeshStandardMaterial({
    color: TEINTES.feu, emissive: TEINTES.feu, emissiveIntensity: 1.6, roughness: 1,
  });

  const ajouter = (mesh, ombre = true) => {
    mesh.castShadow = ombre;
    mesh.receiveShadow = ombre;
    groupe.add(mesh);
    return mesh;
  };

  /* ---- Terrasse et mur de soutènement en basalte ---- */
  // Mur de soutènement à pierres rondes: il porte la plateforme et
  // c'est l'élément le plus sombre de l'ensemble.
  ajouter(new THREE.Mesh(
    new THREE.CylinderGeometry(12.4, 13.6, 6.4, fin ? 18 : 36),
    matBasalte,
  )).position.y = -3.2;

  // Couvertine: un simple bandeau en arase, il ne masque pas le basalte.
  const couv = ajouter(new THREE.Mesh(
    new THREE.TorusGeometry(12.35, 0.22, 5, fin ? 20 : 40), matPierreOmbre,
  ), false);
  couv.rotation.x = Math.PI / 2;
  couv.position.y = 0.1;

  // Plateforme, en retrait du nu du mur.
  ajouter(new THREE.Mesh(
    new THREE.CylinderGeometry(12.2, 12.2, 0.25, fin ? 18 : 36),
    matPierreOmbre,
  )).position.y = -0.12;

  /* ---- Corps de logis, deux étages ---- */
  const bloc = ajouter(new THREE.Mesh(
    new THREE.BoxGeometry(11.8, H_BLOC, 9.6), matPierre,
  ));
  bloc.position.set(-0.8, H_BLOC / 2, 0.6);

  // Bandeau de couronnement, légèrement débordant
  const bandeau = ajouter(new THREE.Mesh(
    new THREE.BoxGeometry(12.5, 0.45, 10.3), matPierreOmbre,
  ));
  bandeau.position.set(-0.8, H_BLOC + 0.25, 0.6);

  // Percements. Deux niveaux, comme sur la photographie.
  const creux = new THREE.BoxGeometry(1.15, 1.85, 0.3);
  for (const ny of [2.3, 5.5]) {
    for (const nx of [-5.1, -3.0, -0.9]) {
      const f = ajouter(new THREE.Mesh(creux, matMetal), false);
      f.position.set(nx, ny, 5.42);
    }
  }

  // Socle carré d'où émerge le fût
  const socle = ajouter(new THREE.Mesh(
    new THREE.BoxGeometry(6.6, H_SOCLE - H_BLOC, 6.6), matPierre,
  ));
  socle.position.y = (H_BLOC + H_SOCLE) / 2;

  /* ---- Fût, légèrement fuselé ---- */
  ajouter(new THREE.Mesh(
    new THREE.CylinderGeometry(R * 0.93, R, H_FUT, seg), matPierre,
  )).position.y = H_FUT / 2;

  // Percement du fût
  const oeil = ajouter(new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 1.5, 0.3), matMetal, false,
  ));
  oeil.position.set(0, H_SOCLE + 2.6, R * 0.95);

  /* ---- Corbeau évasé sous la galerie ---- */
  ajouter(new THREE.Mesh(
    new THREE.CylinderGeometry(0.7 * D, R * 0.93, H_CORBEAU - H_FUT, seg),
    matPierre,
  )).position.y = (H_FUT + H_CORBEAU) / 2;

  /* ---- Plancher de galerie ---- */
  ajouter(new THREE.Mesh(
    new THREE.CylinderGeometry(0.7 * D, 0.7 * D, H_GALERIE - H_CORBEAU, seg),
    matMetal,
  )).position.y = (H_CORBEAU + H_GALERIE) / 2;

  /* ---- Garde-corps: balustres et lisses ---- */
  const balustre = new THREE.CylinderGeometry(0.032, 0.032, H_RAMBARDE - H_GALERIE, 5);
  const rBal = 0.68 * D;
  for (let i = 0; i < nBalustres; i++) {
    const a = (i / nBalustres) * Math.PI * 2;
    const b = ajouter(new THREE.Mesh(balustre, matMetal), false);
    b.position.set(Math.cos(a) * rBal, (H_GALERIE + H_RAMBARDE) / 2, Math.sin(a) * rBal);
  }
  for (const ly of [H_RAMBARDE, H_GALERIE + (H_RAMBARDE - H_GALERIE) * 0.5]) {
    const lisse = ajouter(new THREE.Mesh(
      new THREE.TorusGeometry(rBal, 0.042, 5, seg), matMetal,
    ), false);
    lisse.rotation.x = Math.PI / 2;
    lisse.position.y = ly;
  }

  /* ---- Lanterne ---- */
  // Soubassement
  ajouter(new THREE.Mesh(
    new THREE.CylinderGeometry(0.53 * D, 0.56 * D, H_LANTERNE_BAS - H_RAMBARDE, seg),
    matMetal,
  )).position.y = (H_RAMBARDE + H_LANTERNE_BAS) / 2;

  // Cage vitrée
  const hCage = H_LANTERNE - H_LANTERNE_BAS;
  ajouter(new THREE.Mesh(
    new THREE.CylinderGeometry(0.51 * D, 0.51 * D, hCage, seg, 1, true),
    matVerre,
  ), false).position.y = (H_LANTERNE_BAS + H_LANTERNE) / 2;

  // Montants verticaux
  const montant = new THREE.BoxGeometry(0.11, hCage, 0.11);
  for (let i = 0; i < nMontants; i++) {
    const a = (i / nMontants) * Math.PI * 2;
    const m = ajouter(new THREE.Mesh(montant, matMetal), false);
    m.position.set(Math.cos(a) * 0.51 * D, (H_LANTERNE_BAS + H_LANTERNE) / 2, Math.sin(a) * 0.51 * D);
    m.rotation.y = -a;
  }
  // Traverse médiane
  const traverse = ajouter(new THREE.Mesh(
    new THREE.TorusGeometry(0.515 * D, 0.06, 5, seg), matMetal,
  ), false);
  traverse.rotation.x = Math.PI / 2;
  traverse.position.y = H_LANTERNE_BAS + hCage * 0.42;

  // Couronne
  ajouter(new THREE.Mesh(
    new THREE.CylinderGeometry(0.55 * D, 0.53 * D, 0.3, seg), matMetal,
  )).position.y = H_LANTERNE + 0.15;

  /* ---- L'optique de Fresnel, second ordre ----
     Un tambour de couronnes à échelons, pas une ampoule. C'est
     l'objet que l'on vient voir en haut de l'escalier. */
  const optique = new THREE.Group();
  optique.name = 'lampe';
  const yOpt = H_LANTERNE_BAS + hCage * 0.44;
  const hOpt = 1.72;
  optique.add(new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.42, hOpt * 0.34, fin ? 12 : 20), matFeu,
  ));
  const nEch = fin ? 4 : 7;
  for (let i = 0; i < nEch; i++) {
    const t = (i + 0.5) / nEch;
    // Couronnes d'aire égale: le pas se resserre vers le haut et le bas.
    const dy = (t - 0.5) * hOpt;
    const r = 0.52 + 0.28 * Math.sqrt(1 - (2 * (t - 0.5)) ** 2);
    const anneau = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.055, 4, fin ? 12 : 22), matFeu,
    );
    anneau.rotation.x = Math.PI / 2;
    anneau.position.y = dy;
    optique.add(anneau);
  }
  optique.position.y = yOpt;
  groupe.add(optique);

  /* ---- Dôme à patine ---- */
  ajouter(new THREE.Mesh(
    new THREE.LatheGeometry(profilDome(THREE, 0.515 * D, H_DOME - H_LANTERNE - 0.3, fin ? 9 : 16), seg),
    matDome,
  )).position.y = H_LANTERNE + 0.3;

  /* ---- Épi de faîtage ---- */
  ajouter(new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, H_EPI - H_DOME, 6), matMetal,
  ), false).position.y = (H_DOME + H_EPI) / 2;
  ajouter(new THREE.Mesh(
    new THREE.SphereGeometry(0.27, 10, 8), matMetal,
  ), false).position.y = H_DOME + (H_EPI - H_DOME) * 0.42;

  return groupe;
}
