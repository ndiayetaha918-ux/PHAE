/* Pilotage de la scène 3D.

   Rôle dans le récit: le modèle est le repère d'altitude du visiteur.
   Il ne tourne pas pour faire joli. Quand on passe d'une salle à
   l'autre, la caméra monte le long du bâtiment, exactement comme on
   monte l'escalier. Le visiteur voit toujours où il se trouve.

   Budget: la géométrie est produite par le code, donc rien à
   télécharger hors three lui-même, qui n'est chargé qu'à l'approche
   de la section. */

import { construirePhare, REPERES } from './phare.js';

/* Sous dix-huit images par seconde en régime, l'animation dessert
   l'expérience: on repasse à l'affiche fixe. */
const SEUIL_LENT = 1 / 18;

const CIBLES = {
  socle:    { y: 5.0,  dist: 46, haut: 11 },
  veille:   { y: 9.5,  dist: 40, haut: 13 },
  escalier: { y: 15.0, dist: 34, haut: 16 },
  lanterne: { y: 21.2, dist: 20, haut: 22 },
  galerie:  { y: 18.3, dist: 26, haut: 19 },
};

export async function monterScene(canvas, { onPret, onLent, mobile = false } = {}) {
  const THREE = await import('three');

  const rendu = new THREE.WebGLRenderer({
    canvas, antialias: !mobile, alpha: true,
    powerPreference: mobile ? 'low-power' : 'high-performance',
  });
  rendu.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
  rendu.shadowMap.enabled = !mobile;
  rendu.toneMapping = THREE.ACESFilmicToneMapping;
  rendu.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(26, 1, 0.5, 400);

  scene.add(new THREE.HemisphereLight(0xf4f6f4, 0xb09878, 1.5));
  const soleil = new THREE.DirectionalLight(0xfff4e2, 2.2);
  soleil.position.set(26, 34, 18);
  if (!mobile) {
    soleil.castShadow = true;
    soleil.shadow.mapSize.set(1024, 1024);
    soleil.shadow.bias = -0.0004;
    soleil.shadow.normalBias = 0.14;
    const c = soleil.shadow.camera;
    c.left = -26; c.right = 26; c.top = 40; c.bottom = -12; c.far = 120;
  }
  scene.add(soleil);

  const phare = construirePhare(THREE, { qualite: mobile ? 'basse' : 'haute' });
  scene.add(phare);
  const optique = phare.getObjectByName('lampe');

  /* État visé et état courant: tout est interpolé, jamais posé d'un coup. */
  const vise = { ...CIBLES.socle, azimut: 0.62 };
  const etat = { ...vise };
  let saisi = false, dernierX = 0, vitesse = 0;

  const dimensionner = () => {
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    rendu.setSize(r.width, r.height, false);
    cam.aspect = r.width / r.height;
    cam.updateProjectionMatrix();
  };
  dimensionner();
  new ResizeObserver(dimensionner).observe(canvas);

  /* Rotation à la main. Inertie, pas de saut. */
  const prendre = (e) => { saisi = true; dernierX = e.clientX; canvas.setPointerCapture?.(e.pointerId); };
  const bouger = (e) => {
    if (!saisi) return;
    vitesse = (e.clientX - dernierX) * 0.006;
    vise.azimut -= vitesse;
    dernierX = e.clientX;
  };
  const lacher = () => { saisi = false; };
  canvas.addEventListener('pointerdown', prendre);
  canvas.addEventListener('pointermove', bouger);
  canvas.addEventListener('pointerup', lacher);
  canvas.addEventListener('pointercancel', lacher);
  canvas.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { vise.azimut += 0.22; e.preventDefault(); }
    if (e.key === 'ArrowRight') { vise.azimut -= 0.22; e.preventDefault(); }
  });

  const doux = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = false, boucle = 0;
  const t0 = performance.now();
  let tPrec = t0, images = 0, cumul = 0, abandon = false;

  const image = (t) => {
    boucle = requestAnimationFrame(image);
    const dt = Math.min((t - tPrec) / 1000, 0.1);
    tPrec = t;
    if (!visible) return;

    /* Si l'appareil ne suit pas, on rend la main à l'affiche plutôt
       que d'imposer une animation qui saccade. Les vingt premières
       images sont ignorées: c'est la montée en régime. */
    if (!abandon && images < 60) {
      images++;
      if (images > 20) cumul += dt;
      if (images === 60 && cumul / 40 > SEUIL_LENT) {
        abandon = true;
        onLent?.();
        return;
      }
    }

    // Dérive lente seulement quand personne ne tient le modèle.
    if (!saisi && !doux) {
      vitesse *= Math.exp(-3.7 * dt);
      vise.azimut -= vitesse + 0.021 * dt;
    }

    /* Convergence exponentielle en temps réel: le mouvement dure la
       même chose à 30 ou à 120 images par seconde. */
    const k = doux ? 1 : 1 - Math.exp(-3.4 * dt);
    for (const cle of ['y', 'dist', 'haut']) etat[cle] += (vise[cle] - etat[cle]) * k;
    etat.azimut += (vise.azimut - etat.azimut) * (doux ? 1 : 1 - Math.exp(-5.5 * dt));

    cam.position.set(
      Math.sin(etat.azimut) * etat.dist,
      etat.haut,
      Math.cos(etat.azimut) * etat.dist,
    );
    cam.lookAt(0, etat.y, 0);

    /* L'éclat. Période réelle de l'optique: cinq secondes. */
    if (optique) {
      const phase = ((t - t0) / 1000) % 5;
      const eclat = Math.exp(-((phase - 0.35) ** 2) / 0.045);
      optique.children.forEach((m) => {
        if (m.material) m.material.emissiveIntensity = 0.5 + eclat * 5.5;
      });
      if (!doux) optique.rotation.y = ((t - t0) / 1000) * (Math.PI * 2 / 5);
    }

    rendu.render(scene, cam);
  };

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 })
    .observe(canvas);

  boucle = requestAnimationFrame(image);
  onPret?.();

  return {
    allerA(repere) {
      const c = CIBLES[repere];
      if (c) Object.assign(vise, c);
    },
    detruire() {
      cancelAnimationFrame(boucle);
      rendu.dispose();
    },
  };
}
