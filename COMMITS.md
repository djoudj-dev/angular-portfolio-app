# Convention de Commit en Français

Ce projet utilise les conventions de commit en français avec des outils automatisés pour garantir la cohérence.

## Types de commit autorisés

- **ajout**: Ajout d'une nouvelle fonctionnalité
- **correctif**: Correction d'un bug
- **docs**: Modification de la documentation
- **style**: Modification du style (formatage, points-virgules manquants, etc.)
- **refactor**: Refactorisation du code (ni ajout de fonctionnalité ni correction de bug)
- **perf**: Amélioration des performances
- **test**: Ajout ou modification de tests
- **build**: Modification du système de build ou des dépendances externes
- **ci**: Modification des fichiers et scripts d'intégration continue
- **revert**: Annulation d'un commit précédent
- **maintenance**: Maintenance générale du code

## Format des messages de commit

```
type(portée): description courte

Description plus détaillée si nécessaire.

BREAKING CHANGE: description des changements incompatibles
Closes #123
```

### Exemples

```
ajout(auth): système d'authentification utilisateur

Implémentation complète du système d'authentification avec JWT.
Inclut la connexion, déconnexion et gestion des tokens.

Closes #45
```

```
correctif(navbar): correction de l'affichage mobile

La navbar ne s'affichait pas correctement sur les écrans mobiles.
Ajout de media queries pour améliorer la responsivité.

Closes #78
```

## Utilisation

### Méthode 1: Avec l'assistant interactif (recommandé)

```bash
pnpm run commit
```

Cette commande lance un assistant interactif en français qui vous guide pour créer un message de commit conforme.

### Méthode 2: Git classique avec validation

Vous pouvez toujours utiliser `git commit` normalement. Le hook `commit-msg` validera automatiquement que votre message respecte les conventions françaises.

```bash
git add .
git commit -m "ajout(composant): nouveau composant bouton"
```

Si le message ne respecte pas les conventions, le commit sera rejeté avec une explication.

## Validation automatique

- **Hook commit-msg**: Valide automatiquement tous les messages de commit
- **Types français obligatoires**: Seuls les types français sont acceptés
- **Format strict**: Le format doit respecter la convention Conventional Commits
- **Longueur limitée**: L'en-tête du commit ne doit pas dépasser 100 caractères

## Configuration

La configuration se trouve dans :
- `commitlint.config.js`: Règles de validation des commits
- `.czrc`: Configuration de l'assistant interactif
- `.husky/commit-msg`: Hook Git pour la validation

## Désactivation temporaire

Si vous devez absolument bypasser la validation (déconseillé), vous pouvez utiliser :

```bash
git commit --no-verify -m "votre message"
```

**Note**: Cette pratique est fortement déconseillée car elle brise la cohérence du projet.
