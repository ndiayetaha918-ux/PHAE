# Phase 1 : Inventaire de la matière existante

Source : `https://www.pharedesmamelles.sn/` (WordPress) et sources tierces.

## Statut d'accès au site source

**Le domaine `pharedesmamelles.sn` est bloqué par la politique réseau de cet
environnement d'exécution** (le proxy de sortie refuse la connexion avec un 403,
côté `curl` comme côté outil de récupération de page). `web.archive.org` et
`archive.org` sont bloqués également.

Conséquence directe : **aucun binaire n'a pu être téléchargé depuis le site**
(images originales, vidéos, logo, icônes, PDF de carte). Le contenu **textuel et
factuel** ci-dessous a été reconstitué à partir de l'indexation publique des pages
du site et de sources tierces concordantes.

Pour débloquer : autoriser `pharedesmamelles.sn` dans la politique réseau de
l'environnement (https://code.claude.com/docs/en/claude-code-on-the-web), ou
déposer une archive des médias dans `public/media/`.

## Arborescence du site actuel

| URL | Rôle |
|---|---|
| `/` | Accueil |
| `/welcome-section/` | Bloc d'accroche de l'accueil |
| `/section-slider/` | Carrousel d'accueil |
| `/musee-histoire/` | Musée et histoire |
| `/musee` | Musée et boutique de souvenirs |
| `/programmes-evenements/` | Programmation et événements |
| `/informations-pratiques/` | Informations pratiques |
| `/page-menu/` | Carte du restaurant (onglets) |
| `/menu/hercule/`, `/menu/malibu/` | Fiches cocktails |
| `/contentboxes/musee-histoire-section-1-horaires-tarifs/` | Horaires et tarifs |
| `/contentboxes/contact-section-on-frontpage/` | Bloc contact, titré "Pour la vue et pour l'ambiance" |

## Faits historiques et techniques

Tous vérifiés sur au moins deux sources indépendantes.

- Édifié en **1864** par l'administration coloniale française, un an avant le port de Dakar.
- Coût de construction : **86 000 francs**.
- Implanté sur la plus occidentale et la plus grande des deux collines volcaniques dites **les Mamelles**, presqu'île du Cap-Vert.
- **126 m** d'altitude. Édifice de **16 m** de haut.
- Environ **4 km** au sud-est de la pointe des Almadies, extrémité occidentale du continent africain.
- Au sommet : une **lentille de Fresnel** tournant sur une **cuve de mercure**, à raison de **5 secondes par tour**.
- **Portée du faisceau : 53 km.** Feu blanc.
- Plus ancien phare de Dakar. Réputé le plus puissant d'Afrique avec celui du cap de Bonne-Espérance.
- Premier phare d'atterrissage de cette partie du continent.

## Le musée

- **1er musée national des Phares et Balises** du Sénégal.
- Exposition au rez-de-chaussée : archives d'origine, la plus ancienne datée de **1862**. Archives manuscrites du lancement du projet, documents de la commission des phares, budgétisation, plans d'architecte.
- Parcours : histoire des routes maritimes à travers les civilisations, phares mythiques, contes et légendes locales.
- Volet scientifique : principes physiques de l'optique et leur évolution, réglementation maritime et balisage.
- Boutique de souvenirs.
- Un guide est présent sur place.
- Billetterie tenue par un percepteur du **Port Autonome de Dakar** à l'entrée.

## Informations pratiques

| | |
|---|---|
| Adresse | Route de l'Aéroport, Les Mamelles, Dakar |
| Téléphone | +221 77 343 72 72 |
| Courriel | contact@pharedesmamelles.com |
| Musée | Mardi au dimanche, 10h - 18h |
| Tarif visite | À partir de 3 000 FCFA. Offerte aux clients du restaurant. |

Horaires du lieu (restaurant et terrasse) :

| Jour | Horaires |
|---|---|
| Lundi | Fermé |
| Mardi, mercredi | 11h30 - 00h00 |
| Jeudi | 11h30 - 01h30 |
| Vendredi | 11h30 - 02h30 |
| Samedi | 09h30 - 02h30 |
| Dimanche | 09h30 - 00h00 |

## Programmation

- En semaine : show à partir de 21h00, puis DJ résident à partir de 22h30.
- Week-end : formation live de 22h00 à 23h30, puis DJ résident et invité.
- Dimanche : brunch de 10h00 à 14h00, musique live de 20h30 à 22h00.
- Le rendez-vous du vendredi soir est identifié sous le nom **Friday Live**.
- Privatisation et événements professionnels : afterwork, séminaires, team building, lancements de produit, conférences de presse.

## Réception publique

Note moyenne d'environ **4,4 / 5** sur un corpus de plusieurs centaines d'avis.
Points forts récurrents : le panorama, le coucher de soleil, l'ambiance des
soirées live. Critiques récurrentes : régularité de la cuisine, délais de service.
Cela oriente la refonte vers le lieu, le patrimoine et le panorama plutôt que
vers une promesse gastronomique.

## Contrainte éditoriale appliquée

Le site actuel consacre des pages entières à des fiches cocktails
(`/menu/hercule/`, `/menu/malibu/`) et met le bar en avant.

Décision retenue pour la refonte, conformément à la demande :

- **Aucune page, aucune fiche, aucune photographie de boisson alcoolisée.**
- Aucune carte détaillée du restaurant. La restauration est présentée comme un
  service du lieu, pas comme un argument de vente produit par produit.
- Aucun visuel ni mention de charcuterie.
- **L'histoire, le musée, les archives et les informations institutionnelles sont
  repris sans altération.** La contrainte porte sur la mise en avant commerciale,
  pas sur le contenu patrimonial.

## Médias à fournir

Emplacements qui attendent une image réelle. Les formats sont indiqués en pixels,
largeur intrinsèque souhaitée.

| Clé | Emplacement | Format | Sujet |
|---|---|---|---|
| `tour-nuit` | Accueil, ouverture | 2400x3000 | La tour de nuit, faisceau visible |
| `lentille` | Section Le Feu | 1600x1600 | Gros plan de la lentille de Fresnel |
| `panorama` | Section Le Point de vue | 3200x1400 | Panorama depuis la galerie |
| `archive-1862` | Section Musée | 1400x1800 | Document d'archive, plan ou manuscrit |
| `salle-expo` | Section Musée | 2000x1400 | Salle d'exposition du rez-de-chaussée |
| `colline` | Section Le Lieu | 2400x1600 | La colline des Mamelles, vue large |
| `soir` | Section Programmation | 2000x1400 | La terrasse en soirée |
| `logo` | Navigation, pied de page | SVG | Logo officiel |

Ces clés sont déclarées dans `src/data/media.ts`. Tant qu'un fichier est absent,
le composant `<Plate>` affiche un cadre de réservation typographié à la bonne
proportion, sans casser la mise en page.
