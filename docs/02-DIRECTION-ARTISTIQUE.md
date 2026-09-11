# Phase 2 : Direction visuelle et structure

## Lecture du brief

Site institutionnel pour un monument réel qui est à la fois un musée
national et un lieu de sortie. Public: visiteurs de Dakar, touristes,
institutions, organisateurs d'événements. Langage: patrimoine et
navigation, pas "luxe africain". Le socle technique est Astro avec du CSS
écrit à la main, parce que le contenu est presque entièrement statique et
que la priorité est la performance mobile.

## Le principe

**L'identité ne vient pas d'un décor ajouté. Elle vient de l'objet.**

Le phare possède déjà quatre choses qu'aucun autre lieu de Dakar ne
possède, et ce sont elles qui font le système:

1. **Une cadence.** L'optique fait un tour en cinq secondes. C'est le
   tempo ambiant du site. Le balayage de la page tourne exactement en
   cinq secondes, pas en "trois secondes parce que c'est plus dynamique".
2. **Une géométrie.** La lentille de Fresnel est une suite d'anneaux à
   échelons. Elle est dessinée à partir de sa structure réelle: rayon en
   racine carrée pour que chaque couronne traite une part égale du flux,
   couronne de prismes catadioptriques, montants de lanterne. C'est la
   signature visuelle, et elle est vraie.
3. **Une portée.** Cinquante-trois kilomètres. Cent vingt-six mètres.
   Seize mètres de tour. Mille huit cent soixante-quatre. Des nombres
   réels, documentés, jamais inventés pour faire technique.
4. **Deux vies.** La nuit, le feu. Le jour, le musée et le panorama.

## Ce qui a été écarté

- Photo frontale du phare avec grand titre et bouton. C'est le cliché
  que le brief demandait d'éviter, et c'est aussi ce que fait le site actuel.
- Motifs ajoutés pour "faire sénégalais". Le phare est un ouvrage
  d'ingénierie maritime du XIXe siècle. Lui coller des motifs serait
  un décor de façade.
- Palette beige et laiton. C'est le réflexe par défaut des briefs
  patrimoniaux et il rend toutes les marques interchangeables.
- Glassmorphism, dégradés décoratifs, cartes partout, parallax.

## Couleur

Il n'y a **pas de couleur d'accent**. Il y a de la lumière.

| Rôle | Valeur | Origine |
|---|---|---|
| Sol nuit | `#0a0c0f` vers `#1e242c` | Le basalte de la colline. Jamais de noir pur. |
| Sol jour | `#e9eae6` | Maçonnerie chaulée sous la lumière atlantique. Froid, pas crème. |
| Encre | `#14171a` | |
| Lumière | `rgb(255 226 176)` | Le feu. Utilisée en luminance seulement: halos, balayage, filets. Jamais en aplat de bouton. |

Les boutons ne sont pas colorés: ils sont en contraste de valeur, chalk
sur basalte la nuit, encre sur chalk le jour. Cela passe le niveau AA
sans effort et évite la couleur décorative.

**Une seule bascule de thème sur la page**, entre la moitié nuit et la
moitié jour, et elle porte du contenu (la date de fondation) plutôt qu'un
effet. Aucune section n'inverse le thème ailleurs.

## Typographie

Deux familles, une règle claire.

- **Archivo** (variable, axe de largeur). C'est la voix de l'institution.
  La largeur porte le contraste: `wdth 78 à 93` pour les titres, qui
  deviennent étroits et verticaux comme la tour, `wdth 110 à 118` pour
  les petites étiquettes, qui s'élargissent et se posent.
- **Newsreader italique**. C'est **la voix de l'archive**, et rien
  d'autre. Elle n'apparaît que sur les mentions de pièces d'archives.
  Elle n'est jamais utilisée pour de l'interface.

Aucun mot en serif injecté dans un titre en sans. L'emphase se fait par
la graisse et la largeur de la même famille.

Les chiffres réels sont en chasse tabulaire, pour que les colonnes de
valeurs s'alignent.

## Forme

Tout ce qui est rectiligne est à angle vif, rayon zéro. Le seul élément
rond de la page est l'optique. La règle tient sur une ligne et ne souffre
pas d'exception.

## Parcours

Chaque section répond à la curiosité créée par la précédente.

| Section | Ce qu'elle donne | La question qu'elle ouvre |
|---|---|---|
| Ouverture | Cinq secondes par tour | Comment ? |
| Le feu | Fresnel, mercure, 53 km | 53 km depuis où ? |
| 1864 | La fondation. Bascule nuit vers jour | |
| La colline | 126 m de basalte, la tour n'en fait que 16 | Et on voit quoi ? |
| Le panorama | La presqu'île entière | Et à l'intérieur ? |
| Le musée | Les archives de 1862, le parcours | Je peux venir ? |
| Rendez-vous | La programmation | |
| Venir | Horaires, tarifs, accès | |

## Mouvement

Trois mouvements, pas vingt.

1. **Le balayage.** Cinq secondes par tour, la période réelle. Animation
   CSS, donc elle tourne hors du fil principal et ne saute pas pendant
   le chargement.
2. **L'entrée de l'ouverture.** Le texte monte de 0,5 em, décalages de
   70 ms, courbe `cubic-bezier(0.23, 1, 0.32, 1)`.
3. **La révélation au défilement.** Un seul mécanisme pour tout le site,
   un IntersectionObserver qui cesse d'observer après le passage.
   Opacité et translation uniquement, donc tout reste sur le compositeur.

Rien n'est attaché à un écouteur de défilement. Aucun parallax.
`prefers-reduced-motion` retire le mouvement mais garde l'idée: le
faisceau reste allumé, il cesse de tourner.

## Contraintes vérifiées

Un script d'audit passe le site au crible à 1440 px et à 390 px, et
mesure sur le rendu réel, pas sur les intentions:

- contraste de chaque nœud de texte visible contre son fond peint,
- taille des cibles tactiles,
- ordre des niveaux de titre,
- noms accessibles des liens et boutons,
- débordement horizontal,
- tenue de l'ouverture dans le premier écran.

État actuel: 0 échec sur les deux tailles.
