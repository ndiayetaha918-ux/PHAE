# Phase 2 : Direction visuelle et structure

Version 2. La première direction a été abandonnée: elle était sombre,
lisse et interchangeable. Ce document remplace la précédente.

## D'où vient la palette

Elle ne vient pas d'une humeur "premium". Elle vient de ce dont ce musée
est le musée: **le balisage**.

Le Sénégal est en région A de l'AISM. Dans ce système, le rouge marque le
bâbord, le vert le tribord, et le feu est blanc. Ce sont des couleurs de
fonction, lisibles de loin. Le musée national des Phares et Balises a donc
déjà une identité chromatique codifiée, et personne d'autre ne peut la
revendiquer.

| Rôle | Valeur | Origine |
|---|---|---|
| Fond | `#ecedea` | Le ciel de Dakar chargé d'harmattan. Blanc laiteux, pas crème. |
| Accent | `#d5372a` | Rouge bâbord. Il domine. |
| Rare | `#157a52` | Vert tribord. Contexte technique seulement, jamais à poids égal à côté du rouge. |
| Sombre | `#1c2124` | Le basalte de la colline et du mur de soutènement à pierres rondes. |
| Pierre | `#d6cdba` | Relevé sur la photographie de référence. |
| Feu | `rgb(255 246 224)` | La lampe. |

Le noir n'apparaît **qu'une seule fois**, dans la lanterne, la nuit,
parce que c'est le seul endroit où il a une fonction.

## Règle de matière

**Aucun flou nulle part.** Pas d'ombre douce, pas de dégradé décoratif,
pas de verre dépoli, pas d'angle arrondi, pas de bouton pilule, pas de
carte. Des aplats, des filets, des bords francs. Une façade sous ce
soleil ne produit pas de dégradés.

## Typographie

Deux familles, deux registres, et le contraste porte sur la **largeur**
autant que sur la graisse.

- **Archivo** variable. La ligne monumentale est en `wdth 121` graisse
  700, capitales. Une grotesque large se lit comme de la signalisation et
  de l'institution. C'est l'inverse du réflexe "titre condensé géant".
  La ligne de réponse est en `wdth 70` graisse 300, bas de casse. Même
  famille, largeur et graisse opposées: l'emphase ne change jamais de
  famille.
- **Azeret Mono** pour le registre technique: la notation des cartes
  marines, les mesures, la navigation. C'est la langue des Phares et
  Balises.

La caractéristique du feu, `Fl W 5s`, est portée dans la composition
comme sur une carte marine. Elle veut dire: éclats, blanc, période de
cinq secondes. C'est la signature du phare, et elle n'appartient qu'à lui.

## Le parcours : une géographie, pas une liste

Le bâtiment a des salles réelles. Le site les traverse dans l'ordre où on
les traverse sur place.

| Salle | Ce qu'on y trouve |
|---|---|
| L'arrivée | Le bâtiment, sa caractéristique de feu |
| La salle des machines | Rez-de-chaussée: groupe électrogène, batteries, et l'exposition |
| La salle de veille | Premier étage: les gardiens de quart |
| L'escalier | La vis de pierre qui mène à la lanterne |
| **La lanterne** | Fresnel de second ordre, cuve de mercure. **Il fait nuit.** |
| La galerie | Le tour complet, la presqu'île |

On ne descend pas une pile de sections: on monte un escalier.

## Le modèle 3D

**Pourquoi le phare est en 3D ici:** parce que le site est une ascension
et qu'il faut savoir où l'on est dans un bâtiment qu'on ne voit pas de
l'intérieur. Le modèle reste à l'écran pendant toute la montée et la
caméra s'élève avec le lecteur. Il n'est pas là pour être fait tourner.

Fidélité: la géométrie est relevée sur la photographie de référence
fournie, rapportée au diamètre du fût. Tour cylindrique fuselée sur un
socle carré et un corps de logis de deux étages, corbeau évasé, galerie à
garde-corps, lanterne vitrée à montants avec l'optique à échelons
visible, dôme à patine, épi de faîtage, mur de soutènement en basalte.

Performance:

- La géométrie est **produite par le code**. Rien à télécharger: pas de
  fichier de modèle, pas de textures.
- `three` n'est chargé qu'à l'approche de la section, jamais au
  chargement de la page.
- Une **affiche fixe** (28 ko en WebP) est peinte d'abord. Elle sert de
  premier rendu, de repli sans WebGL, et de repli si l'appareil rame.
- Deux niveaux de détail: moins de segments, moins de balustres, pas
  d'ombres portées et résolution plafonnée sur mobile.
- **Repli automatique sous dix-huit images par seconde**: la scène rend
  la main à l'affiche plutôt que d'imposer une animation qui saccade.
- La boucle de rendu s'arrête dès que la scène sort de l'écran.
- L'interpolation est en temps réel, pas par image: le mouvement dure la
  même chose à 30 ou à 120 images par seconde.

Poids initial de la page, hors 3D: **environ 152 ko** (HTML et CSS
compressés, deux polices, l'affiche).

## Mouvement

Trois mouvements, pas vingt.

1. **L'éclat.** Cinq secondes, la période réelle de l'optique.
2. **La montée de la caméra** quand on change de salle.
3. **La révélation au défilement**, un seul mécanisme pour tout le site.

Rien n'est attaché à un écouteur de défilement. Aucun parallax.
`prefers-reduced-motion` retire le mouvement mais garde l'idée.

## Contrôles automatisés

Un script mesure sur le rendu réel à 1440 px et à 390 px: contraste de
chaque nœud de texte contre son fond peint, taille des cibles tactiles,
ordre des niveaux de titre, noms accessibles, débordement horizontal,
tenue de l'ouverture dans le premier écran, absence de cadratin et de
formules marketing génériques.

État: **0 échec** sur les deux tailles.
