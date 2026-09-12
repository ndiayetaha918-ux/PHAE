# Photos à déposer sur la branche

Deux destinations différentes selon ce que la photo doit faire.

## A. Photos qui apparaissent sur le site

À déposer dans `public/media/`, sous **exactement** ce nom de fichier
(le code les référence déjà, aucune modification n'est nécessaire une
fois le fichier présent) :

| Fichier à créer | Utilisé dans | Sujet | Proportion cible |
|---|---|---|---|
| `public/media/archive-1862.jpg` | Section Le musée | Document d'archive de 1862, plan manuscrit du projet de phare | 7:9 (portrait) |
| `public/media/salle-expo.jpg` | Section Le musée | La salle d'exposition au rez-de-chaussée | 10:7 (paysage) |
| `public/media/soir.jpg` | Section Rendez-vous | La terrasse en soirée, la presqu'île en contrebas | 10:7 (paysage) |

Une fois le fichier déposé, ouvrir `src/data/media.ts` et passer
`ready: true` sur l'entrée correspondante — sinon le composant `<Plate>`
continue d'afficher le cadre de réservation même si le fichier existe,
par sécurité (pour ne jamais afficher un fichier non vérifié).

Largeur native attendue : voir le champ `width` de chaque entrée dans
`src/data/media.ts`. Un fichier plus large est downscalé sans problème ;
un fichier plus petit sera flou en grand écran.

## B. Photos de référence pour le modèle 3D et le hero

**Celle que tu as montrée dans la conversation (le phare vu depuis la
colline, ciel blanc d'harmattan, mur de basalte, antennes)** — et toute
autre vue du bâtiment réel — vont dans :

```
docs/references/phare/
```

Nom libre (`phare-vue-generale.jpg`, `phare-lanterne-detail.jpg`,
`phare-facade-sud.jpg`, etc.). Elles ne sont **pas** affichées
automatiquement sur le site : ce sont des documents de travail que
j'utilise pour corriger le modèle 3D construit par le code
(`src/three/phare.js`) et pour décider si le hero doit finalement montrer
une vraie photo plutôt que le rendu 3D.

Photos les plus utiles à ce stade, si tu en as :

1. **La lanterne de près** — la forme exacte du dôme, l'espacement des
   montants, la couleur réelle de la patine.
2. **Une vue de face de la façade**, pour vérifier la proportion du
   corps de logis par rapport au fût.
3. **Une vue de nuit ou au crépuscule**, si elle existe, pour le rendu
   de la lampe allumée.

## Comment déposer les fichiers

Directement sur la branche `claude/phare-mamelles-redesign-c4g5wf` du
dépôt GitHub, dans les chemins ci-dessus. Un commit de ta part sur cette
branche est repris automatiquement dès la prochaine session : dis-le moi
et je relis les fichiers, je bascule `ready: true` où c'est pertinent, et
je republie.
