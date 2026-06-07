# Pronos Coupe du Monde

PWA mobile personnelle pour afficher les matchs de la Coupe du Monde 2026 et generer des pronos IA si une cle OpenAI est configuree.

## Utilisation locale

Depuis le dossier `outputs`:

```powershell
node .\server.mjs 4174
```

Puis ouvrir:

```text
http://127.0.0.1:4174
```

Le terminal doit rester ouvert pendant que tu utilises l'app. Si la commande affiche `Pronos CDM: http://127.0.0.1:4174`, c'est bon: elle ne rend pas la main parce que le serveur tourne.

Il faut utiliser ce serveur local pour eviter les erreurs CORS de `worldcup26.ir`. Ouvrir `index.html` directement peut fonctionner pour l'interface, mais la source live risque de basculer sur le fallback OpenFootball.

## Fonctionnement

- Sans cle OpenAI: matchs, resultats et stats simples restent visibles.
- Avec cle OpenAI dans Reglages: les boutons de generation/relance de prono deviennent disponibles.
- La date de generation est affichee sur chaque prono sauvegarde.
- Chaque fiche match affiche aussi deux sections de stats sans IA: `Coupe du Monde` pour le tournoi charge, et `Tout compris` pour l'historique public international.
- Les stats `Tout compris` ne sont pas telechargees automatiquement. Dans Reglages, le bouton `Actualiser stats globales` telecharge directement `results.csv` depuis `martj42/international_results` (environ 3,55 Mio), puis le garde en cache local IndexedDB.
- Dans `Tout compris`, chaque equipe affiche ses 10 derniers matchs avec score. Les moyennes de buts marques/encaisses sont calculees sur ces 10 derniers matchs.
- En haut de chaque page match, un resume du prono affiche le score predit quand il est detectable. Cliquer dessus descend vers l'analyse complete du prono.
- Les scores de match sont affiches partout au format `Equipe 1  score1 - score2  Equipe 2`.
- Les boutons Retour utilisent maintenant l'historique navigateur (`history.back`) avec fallback vers la vue logique.
- Les 10 derniers matchs affichent maintenant date + type en discret, puis le score en ligne plus visible.
- Dans `Tout compris`, le bilan et les buts affiches sont calcules sur les 10 derniers matchs, comme les moyennes.
- Le detail d'un match est une page interne dediee (`#match=...`), pas une popup. Le bouton retour du navigateur fonctionne.
- Les groupes ont aussi une page interne (`#group=...`) avec classement, stats rapides V/N/D, buts, points, et liens vers les matchs du groupe.
- Les groupes sont affiches dans l'ordre alphabetique, avec des colonnes de classement alignees de facon identique d'une carte a l'autre.
- La disponibilite des stats est masquee par defaut dans un bouton `i` en haut a droite des blocs stats.

## Donnees

- Source principale: `https://worldcup26.ir/get/games`, `groups`, `teams`.
- Comme cette API ne renvoie pas toujours les en-tetes CORS necessaires a un navigateur, `server.mjs` sert de relais local sans cle. Si ce relais n'existe pas, l'app tente un proxy public sans cle puis bascule sur le planning OpenFootball.
- Fallback: `https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json`.

## Stockage local

La cle OpenAI, le prompt, les pronos et les dates de generation sont sauvegardes tels quels dans le stockage local du navigateur.
