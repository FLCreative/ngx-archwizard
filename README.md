# Overview ngx-archwizard
[![Build Status](https://github.com/madoar/angular-archwizard/actions/workflows/build.yml/badge.svg?branch=develop)](https://github.com/madoar/angular-archwizard/actions)
[![Dependency Status](https://david-dm.org/madoar/angular-archwizard.svg)](https://david-dm.org/madoar/angular-archwizard)
[![Dev-Dependency Status](https://david-dm.org/madoar/angular-archwizard/dev-status.svg)](https://david-dm.org/madoar/angular-archwizard?type=dev)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/039c5be36d8646dfb73972e8679e5021)](https://www.codacy.com/app/marc.arndt/angular-archwizard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=madoar/angular-archwizard&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/039c5be36d8646dfb73972e8679e5021)](https://www.codacy.com/app/marc.arndt/angular-archwizard?utm_source=github.com&utm_medium=referral&utm_content=madoar/angular-archwizard&utm_campaign=Badge_Coverage)
[![NPM Version](https://img.shields.io/npm/v/ngx-archwizard.svg)](https://www.npmjs.com/package/ngx-archwizard)

Ce projet contient un module fonctionnel avec un composant wizard et des composants et directives de support pour [Angular](https://angular.io/) version 19 ou supérieure.

## Build
Exécutez `npm run build` pour construire le projet. Les artefacts de build seront stockés dans le répertoire `dist/`.

## Exécution des tests unitaires
Exécutez `npm test` pour lancer les tests unitaires via [Karma](https://karma-runner.github.io).

## Compatibilité
La dernière version de `ngx-archwizard` est compatible avec Angular 19+.
Les versions plus anciennes de `ngx-archwizard` peuvent être utilisées avec des versions plus anciennes d'Angular.
Le tableau suivant montre quelle version de `ngx-archwizard` a été construite avec quelle version d'Angular :

| Version `ngx-archwizard` | Version Angular |
|--------------------------|-----------------|
| `3.0.0`                  | Angular 5       |
| `4.0.0`                  | Angular 7       |
| `5.0.1`                  | Angular 8       |
| `6.1.0`                  | Angular 9       |
| `7.0.0`                  | Angular 11      |
| `19.0.0`                 | Angular 19      |

## Gitpod
`ngx-archwizard` peut être développé avec Gitpod, un IDE en ligne gratuit en un clic pour GitHub :

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/madoar/angular-archwizard)

## Installation

### Étape 1 : Installer `ngx-archwizard`
`ngx-archwizard` est disponible en tant que package NPM. Pour installer `ngx-archwizard` dans votre répertoire de projet, exécutez :

```bash
$ npm install --save ngx-archwizard
```

### Étape 2 : Importer le ArchwizardModule
Après l'installation, vous pouvez importer `ngx-archwizard` dans votre projet Angular en ajoutant le `ArchwizardModule` à votre déclaration de module comme suit :

```typescript
import { ArchwizardModule } from 'ngx-archwizard';

@NgModule({
  imports: [
    ArchwizardModule
  ],
})
export class Module { }
```

### Étape 3 : Inclure les styles
Pour permettre la personnalisation, `ngx-archwizard` regroupe les styles CSS séparément. Si vous utilisez Angular CLI, importez-les dans votre `styles.css`...

```css
@import '../node_modules/ngx-archwizard/styles/archwizard.css';
```

...ou incluez-les dans `angular.json` :

```javascript
{
  // ...
  "styles": [
    "node_modules/ngx-archwizard/styles/archwizard.css",
    "src/styles.css"
  ]
  // ...
}
```

Si vous utilisez SCSS, vous pouvez inclure les styles sous forme de fichier `.scss` : `node_modules/ngx-archwizard/styles/archwizard.scss`.
De cette façon, vous pouvez facilement personnaliser l'apparence du wizard en ajustant les variables SCSS comme décrit dans [Personnalisation des styles](#styles-customization).

## Comment utiliser le wizard
Pour utiliser ce composant wizard dans un projet Angular, ajoutez simplement un composant `aw-wizard` au template HTML de votre composant :

```html
<aw-wizard>
  <aw-wizard-step stepTitle="Titre de l'étape 1">
    Contenu de l'étape 1
    <button type="button" awNextStep>Étape suivante</button>
    <button type="button" [awGoToStep]="{stepIndex: 2}">Aller directement à la troisième étape</button>
  </aw-wizard-step>
  <aw-wizard-step stepTitle="Titre de l'étape 2" awOptionalStep>
    Contenu de l'étape 2
    <button type="button" awPreviousStep>Retour à l'étape précédente</button>
    <button type="button" awNextStep>Aller à l'étape suivante</button>
  </aw-wizard-step>
  <aw-wizard-step stepTitle="Titre de l'étape 3">
    Contenu de l'étape 3
    <button type="button" awPreviousStep>Étape précédente</button>
    <button type="button" (click)="finishFunction()">Terminer</button>
  </aw-wizard-step>
</aw-wizard>
```

## Composants

### \<aw-wizard\>
L'environnement `<aw-wizard>` est l'environnement dans lequel vous définissez les étapes appartenant à votre wizard.
En plus des étapes du wizard contenues, `ngx-archwizard` vous permet de définir l'emplacement et la mise en page de la barre de navigation à l'intérieur de votre wizard.
Pour définir l'emplacement, la mise en page de la barre de navigation et de nombreux autres paramètres, vous pouvez passer les paramètres suivants au composant `aw-wizard` :

#### \[navBarLocation\]
L'emplacement de la barre de navigation, contenue dans le wizard, peut être spécifié via la valeur d'entrée `navBarLocation`.
Cette valeur peut être soit `top`, `bottom`, `left` ou `right`, où les valeurs spécifient la position à laquelle la barre de navigation sera affichée.
De plus, `top` et `bottom` conduiront à une barre de navigation horizontale, tandis que `left` et `right` conduiront à une barre de navigation verticale sur le
côté gauche ou droit.
Si aucun `navBarLocation` n'est donné, la barre de navigation sera affichée en haut du wizard.

#### \[navBarLayout\]
Une autre option qui peut être modifiée est la conception ou la mise en page de la barre de navigation.
Actuellement, cinq mises en page différentes de barre de navigation existent.
Ce sont `small`, `large-filled`, `large-empty`, `large-filled-symbols` et `large-empty-symbols`.

Les trois premières mises en page affichent des cercles avec ou sans arrière-plan, pour chaque étape de votre wizard, dans la barre de navigation.
Les deux dernières mises en page `large-filled-symbols` et `large-empty-symbols` ajoutent optionnellement un symbole au centre du cercle,
pour chaque étape de votre wizard, dans la barre de navigation, si un tel symbole a été défini pour l'étape.

#### \[navBarDirection\]
Normalement, les étapes de la barre de navigation sont disposées de gauche à droite ou de haut en bas.
Dans certains cas, comme avec les langues qui s'écrivent de droite à gauche, il peut être nécessaire de changer cette direction pour disposer les étapes de droite à gauche.
Pour disposer les étapes de droite à gauche, vous pouvez passer `right-to-left` à l'entrée `navBarDirection` du composant wizard.

#### \[defaultStepIndex\]
Par défaut, le wizard commence toujours par la première étape du wizard, après l'initialisation. Il en va de même pour une réinitialisation, où le wizard se réinitialise normalement à la première étape.
Parfois, cela doit être modifié. Si une autre étape de wizard par défaut doit être utilisée, vous pouvez la définir en utilisant l'entrée `[defaultStepIndex]` du composant wizard.
Par exemple, pour commencer le wizard à la deuxième étape, `[defaultStepIndex]="2"` doit être défini.

Veuillez noter que Angular interprétera la valeur d'entrée donnée comme une chaîne si elle n'est pas entre `[]` !

#### \[disableNavigationBar\]
Parfois, il peut être nécessaire de désactiver la navigation via la barre de navigation.
Dans un tel cas, vous pouvez désactiver la navigation via la barre de navigation en définissant l'entrée `[disableNavigationBar]` du composant wizard sur `true`.

Après avoir désactivé la barre de navigation, l'utilisateur ne peut plus utiliser la barre de navigation pour naviguer entre les étapes.
La désactivation de la barre de navigation ne restreint pas l'utilisation des éléments (boutons ou liens) avec une directive `awNextStep`, `awPreviousStep` ou `awGoToStep`.

#### Vue d'ensemble des paramètres
Paramètres possibles de `<aw-wizard>` :

| Nom du paramètre           | Valeurs possibles                                                                                         | Valeur par défaut     |
| -------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------- |
| `[navBarLocation]`         | `'top'` \| `'bottom'` \| `'left'` \| `'right'`                                                           | `'top'`               |
| `[navBarLayout]`           | `'small'` \| `'large-filled'` \| `'large-empty'` \| `'large-filled-symbols'` \| `'large-empty-symbols'`  | `'small'`             |
| `[navBarDirection]`        | `'left-to-right'` \| `'right-to-left'`                                                                   | `'left-to-right'`     |
| `[defaultStepIndex]`       | `number`                                                                                                  | `0`                   |
| `[disableNavigationBar]`   | `boolean`                                                                                                 | `false`               |

### \<aw-wizard-step\>
`ngx-archwizard` contient deux façons de définir une étape de wizard.
L'une de ces deux façons est d'utiliser le composant `<aw-wizard-step>`.

#### \[stepId\]
Une étape de wizard peut avoir son propre identifiant unique.
Cet identifiant peut ensuite être utilisé pour naviguer vers l'étape.
De plus, le `[stepId]` d'une étape de wizard est utilisé comme `id` de l'élément `li` pour l'étape de wizard dans la barre de navigation.

#### \[stepTitle\]
Une étape de wizard doit contenir un titre, qui est affiché dans la barre de navigation du wizard.
Pour définir le titre d'une étape, ajoutez l'attribut d'entrée `stepTitle`, avec le titre d'étape choisi, à la définition de votre étape de wizard.

#### \[navigationSymbol\]
Parfois, il est utile d'ajouter un symbole au centre du cercle dans la barre de navigation, qui appartient à l'étape.
`ngx-archwizard` prend en charge cela via l'attribut d'entrée `[navigationSymbol]` de l'étape de wizard.

Notez que toutes les mises en page n'affichent pas les symboles.
Seules les mises en page `large-filled-symbols` et `large-empty-symbols` affichent les symboles !

Si vous voulez ajouter un `2` au cercle dans la barre de navigation appartenant à la deuxième étape, vous pouvez le faire comme ceci :

```html
<aw-wizard-step stepTitle="Deuxième étape" [navigationSymbol]="{ symbol: '2' }">
  ...
</aw-wizard-step>
```

En plus des symboles normaux, il est également possible d'utiliser une icône d'une police comme symbole.
Pour utiliser une icône d'une police, vous devez d'abord rechercher l'unicode appartenant à l'icône que vous souhaitez insérer.
Ensuite, vous pouvez utiliser l'unicode dans le format de [référence de caractère numérique](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references)
comme symbole pour l'étape.
De plus, vous devez spécifier la famille de police, à laquelle l'icône appartient, sinon le symbole ne peut pas être affiché correctement.

La famille de police du symbole utilisé peut être spécifiée via le champ `fontFamily` de l'objet d'entrée `[navigationSymbol]` json donné.
Par exemple, si vous voulez afficher l'icône avec l'unicode `\f2dd` de [FontAwesome](http://fontawesome.io/) à l'intérieur d'un cercle d'étape dans la barre de navigation, alors
vous pouvez le faire via l'attribut d'entrée `[navigationSymbol]` suivant :

```html
<aw-wizard-step stepTitle="Deuxième étape" [navigationSymbol]="{ symbol: '&#xf2dd;', fontFamily: 'FontAwesome' }">
  ...
</aw-wizard-step>
```

#### \[canEnter\]
Parfois, il est nécessaire de n'autoriser l'utilisateur à entrer dans une étape spécifique que si une certaine méthode de validation renvoie true.
Dans un tel cas, vous pouvez utiliser l'entrée `[canEnter]` de l'étape de wizard ciblée.
Cette entrée peut être soit un booléen, qui indique directement au wizard si l'étape ciblée peut être entrée,
soit une fonction lambda, prenant un `MovingDirection` et renvoyant un `boolean` ou un `Promise<boolean>`.
Cette fonction sera alors appelée, avec la direction dans laquelle l'étape ciblée sera entrée, chaque fois qu'une opération a été effectuée, qui conduit à un changement de l'étape actuelle.
Elle renvoie alors true, lorsque le changement d'étape doit réussir et false sinon.

#### \[canExit\]
Si vous avez une vérification ou une validation supplémentaire à effectuer pour décider si l'étape peut être quittée (à la fois vers l'étape suivante et vers l'étape précédente),
vous pouvez soit passer un booléen, soit une fonction, prenant un `MovingDirection` enum et renvoyant un booléen ou un `Promise<boolean>`, à l'attribut `[canExit]` de l'étape de wizard.
Ce booléen, ou fonction, est pris en compte, lorsqu'une opération a été effectuée, qui conduit à une transition de l'étape actuelle.
Si `[canExit]` a été lié à un booléen, il doit être true pour quitter l'étape dans n'importe quelle direction (avant ET arrière).
Si seul le fait de quitter dans une direction doit être couvert, vous pouvez passer une fonction, prenant un `MovingDirection` et renvoyant un booléen, à `[canExit]`.
Cette fonction sera alors appelée chaque fois qu'une opération a été effectuée, qui conduit à un changement de l'étape actuelle.

#### \(stepEnter\)
Si vous devez appeler une fonction pour faire un travail d'initialisation avant d'entrer dans une étape de wizard, vous pouvez ajouter un attribut `stepEnter` à l'environnement de l'étape de wizard comme ceci :

```html
<aw-wizard-step stepTitle="Deuxième étape" (stepEnter)="enterSecondStep($event)">
  ...
</aw-wizard-step>
```

Cela conduit à l'appel de la fonction `enterSecondStep` lorsque le wizard passe à cette étape.
Lorsque la première étape du wizard contient une fonction `stepEnter`, elle est appelée non seulement
lorsque l'utilisateur revient d'une étape ultérieure à la première étape, mais aussi après l'initialisation du wizard.
L'émetteur d'événements appellera la fonction donnée avec un paramètre qui contient le `MovingDirection` de l'utilisateur.
Si l'utilisateur est allé en arrière, par exemple de la troisième étape à la deuxième ou première étape, alors `MovingDirection.Backwards` sera passé à la fonction.
Si l'utilisateur est allé en avant, `MovingDirection.Forwards` sera passé à la fonction.

#### \(stepExit\)
Semblable à `stepEnter`, vous pouvez ajouter un attribut `stepExit` à l'environnement de l'étape de wizard, si vous voulez appeler une fonction chaque fois qu'une étape de wizard est quittée
soit en appuyant sur un composant avec une directive `awNextStep` ou `awPreviousStep`, soit par un clic sur la barre de navigation.
`stepExit`, comme `stepEnter`, peut appeler la fonction donnée avec un argument de type `MovingDirection` qui signale dans quelle direction l'étape a été quittée.

#### Vue d'ensemble des paramètres
Paramètres possibles de `<aw-wizard-step>` :

| Nom du paramètre                | Valeurs possibles                                                                                      | Valeur par défaut  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------ |
| `[stepId]`                      | `string`                                                                                              | `null`             |
| `[stepTitle]`                   | `string`                                                                                              | `null`             |
| `[navigationSymbol]`            | `{symbol: string, fontFamily?: string}`                                                               | `{symbol: ''}`     |
| `[canEnter]`                    | `function(MovingDirection): boolean` \| `function(MovingDirection): Promise<boolean>` \| `boolean`    | `true`             |
| `[canExit]`                     | `function(MovingDirection): boolean` \| `function(MovingDirection): Promise<boolean>` \| `boolean`    | `true`             |
| `(stepEnter)`                   | `function(MovingDirection): void`                                                                     | `null`             |
| `(stepExit)`                    | `function(MovingDirection): void`                                                                     | `null`             |

### \<aw-wizard-completion-step\>
La deuxième façon de définir une étape de wizard est d'utiliser le composant `<aw-wizard-completion-step>`.
Ce composant est une extension du composant `<aw-wizard-step>` et hérite de toutes ses fonctionnalités.
La seule différence est que l'étape de complétion ne peut être entrée que si toutes les étapes précédentes ont été complétées ou sont optionnelles.

### \<aw-wizard-navigation-bar\>
Le composant `<aw-wizard-navigation-bar>` est un composant de support qui peut être utilisé pour définir une barre de navigation personnalisée.
Ce composant peut être utilisé pour remplacer la barre de navigation par défaut du wizard.

### \<aw-wizard-step\>
Le composant `<aw-wizard-step>` est un composant de support qui peut être utilisé pour définir une étape de wizard personnalisée.
Ce composant peut être utilisé pour remplacer l'étape de wizard par défaut.

## Directives

### \[awNextStep\]
La directive `[awNextStep]` peut être utilisée pour naviguer vers l'étape suivante du wizard.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un bouton ou un lien.

### \[awPreviousStep\]
La directive `[awPreviousStep]` peut être utilisée pour naviguer vers l'étape précédente du wizard.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un bouton ou un lien.

### \[awGoToStep\]
La directive `[awGoToStep]` peut être utilisée pour naviguer vers une étape spécifique du wizard.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un bouton ou un lien.
La directive prend un objet avec un champ `stepIndex` qui spécifie l'index de l'étape vers laquelle naviguer.

### \[awOptionalStep\]
La directive `[awOptionalStep]` peut être utilisée pour marquer une étape comme optionnelle.
Une étape optionnelle peut être ignorée lors de la navigation.

### \[awWizardStep\]
La directive `[awWizardStep]` peut être utilisée pour définir une étape de wizard personnalisée.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un div ou un span.

### \[awWizardStepTitle\]
La directive `[awWizardStepTitle]` peut être utilisée pour définir un titre personnalisé pour une étape de wizard.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un div ou un span.

### \[awWizardStepSymbol\]
La directive `[awWizardStepSymbol]` peut être utilisée pour définir un symbole personnalisé pour une étape de wizard.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un div ou un span.

### \[awWizardStepContent\]
La directive `[awWizardStepContent]` peut être utilisée pour définir un contenu personnalisé pour une étape de wizard.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un div ou un span.

### \[awWizardStepNavigation\]
La directive `[awWizardStepNavigation]` peut être utilisée pour définir une navigation personnalisée pour une étape de wizard.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un div ou un span.

### \[awWizardStepStatus\]
La directive `[awWizardStepStatus]` peut être utilisée pour définir un statut personnalisé pour une étape de wizard.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un div ou un span.

### \[awWizardStepValidation\]
La directive `[awWizardStepValidation]` peut être utilisée pour définir une validation personnalisée pour une étape de wizard.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un div ou un span.

### \[awWizardStepEnter\]
La directive `[awWizardStepEnter]` peut être utilisée pour définir une fonction personnalisée qui sera appelée avant d'entrer dans une étape de wizard.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un div ou un span.

### \[awWizardStepExit\]
La directive `[awWizardStepExit]` peut être utilisée pour définir une fonction personnalisée qui sera appelée avant de quitter une étape de wizard.
Cette directive peut être utilisée sur n'importe quel élément HTML, comme un div ou un span.

## Personnalisation des styles
`ngx-archwizard` utilise SCSS pour ses styles, ce qui permet une personnalisation facile.
Les variables SCSS suivantes peuvent être modifiées pour personnaliser l'apparence du wizard :

| Nom de la variable | Description | Valeur par défaut |
|-------------------|-------------|-------------------|
| `$wizard-navigation-bar-height` | Hauteur de la barre de navigation | `50px` |
| `$wizard-navigation-bar-background-color` | Couleur de fond de la barre de navigation | `#f5f5f5` |
| `$wizard-navigation-bar-border-color` | Couleur de la bordure de la barre de navigation | `#ddd` |
| `$wizard-navigation-bar-border-width` | Largeur de la bordure de la barre de navigation | `1px` |
| `$wizard-navigation-bar-border-style` | Style de la bordure de la barre de navigation | `solid` |
| `$wizard-navigation-bar-border-radius` | Rayon de la bordure de la barre de navigation | `0` |
| `$wizard-navigation-bar-padding` | Remplissage de la barre de navigation | `0` |
| `$wizard-navigation-bar-margin` | Marge de la barre de navigation | `0` |
| `$wizard-navigation-bar-z-index` | Index z de la barre de navigation | `1` |
| `$wizard-navigation-bar-transition` | Transition de la barre de navigation | `all 0.3s ease-in-out` |
| `$wizard-navigation-bar-box-shadow` | Ombre de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-color` | Couleur du texte de la barre de navigation | `#333` |
| `$wizard-navigation-bar-text-font-family` | Famille de police du texte de la barre de navigation | `inherit` |
| `$wizard-navigation-bar-text-font-size` | Taille de police du texte de la barre de navigation | `14px` |
| `$wizard-navigation-bar-text-font-weight` | Poids de police du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-line-height` | Hauteur de ligne du texte de la barre de navigation | `1.5` |
| `$wizard-navigation-bar-text-text-align` | Alignement du texte de la barre de navigation | `center` |
| `$wizard-navigation-bar-text-text-transform` | Transformation du texte de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-text-decoration` | Décoration du texte de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-text-shadow` | Ombre du texte de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-letter-spacing` | Espacement des lettres du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-word-spacing` | Espacement des mots du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-white-space` | Espace blanc du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-overflow` | Dépassement du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-hyphens` | Césure du texte de la barre de navigation | `manual` |
| `$wizard-navigation-bar-text-direction` | Direction du texte de la barre de navigation | `ltr` |
| `$wizard-navigation-bar-text-unicode-bidi` | Bidi unicode du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-writing-mode` | Mode d'écriture du texte de la barre de navigation | `horizontal-tb` |
| `$wizard-navigation-bar-text-text-orientation` | Orientation du texte de la barre de navigation | `mixed` |
| `$wizard-navigation-bar-text-text-combine-upright` | Combinaison verticale du texte de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-text-emphasis` | Emphase du texte de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-text-emphasis-position` | Position de l'emphase du texte de la barre de navigation | `over right` |
| `$wizard-navigation-bar-text-text-emphasis-style` | Style de l'emphase du texte de la barre de navigation | `filled` |
| `$wizard-navigation-bar-text-text-emphasis-color` | Couleur de l'emphase du texte de la barre de navigation | `currentColor` |
| `$wizard-navigation-bar-text-text-underline-position` | Position du soulignement du texte de la barre de navigation | `auto` |
| `$wizard-navigation-bar-text-text-underline-offset` | Décalage du soulignement du texte de la barre de navigation | `auto` |
| `$wizard-navigation-bar-text-text-decoration-skip-ink` | Saut d'encre de la décoration du texte de la barre de navigation | `auto` |
| `$wizard-navigation-bar-text-text-decoration-skip` | Saut de la décoration du texte de la barre de navigation | `objects` |
| `$wizard-navigation-bar-text-text-decoration-style` | Style de la décoration du texte de la barre de navigation | `solid` |
| `$wizard-navigation-bar-text-text-decoration-color` | Couleur de la décoration du texte de la barre de navigation | `currentColor` |
| `$wizard-navigation-bar-text-text-decoration-line` | Ligne de la décoration du texte de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-text-decoration-thickness` | Épaisseur de la décoration du texte de la barre de navigation | `auto` |
| `$wizard-navigation-bar-text-text-underline-offset` | Décalage du soulignement du texte de la barre de navigation | `auto` |
| `$wizard-navigation-bar-text-text-underline-position` | Position du soulignement du texte de la barre de navigation | `auto` |
| `$wizard-navigation-bar-text-text-emphasis` | Emphase du texte de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-text-emphasis-position` | Position de l'emphase du texte de la barre de navigation | `over right` |
| `$wizard-navigation-bar-text-text-emphasis-style` | Style de l'emphase du texte de la barre de navigation | `filled` |
| `$wizard-navigation-bar-text-text-emphasis-color` | Couleur de l'emphase du texte de la barre de navigation | `currentColor` |
| `$wizard-navigation-bar-text-text-combine-upright` | Combinaison verticale du texte de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-text-orientation` | Orientation du texte de la barre de navigation | `mixed` |
| `$wizard-navigation-bar-text-writing-mode` | Mode d'écriture du texte de la barre de navigation | `horizontal-tb` |
| `$wizard-navigation-bar-text-unicode-bidi` | Bidi unicode du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-direction` | Direction du texte de la barre de navigation | `ltr` |
| `$wizard-navigation-bar-text-hyphens` | Césure du texte de la barre de navigation | `manual` |
| `$wizard-navigation-bar-text-overflow` | Dépassement du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-white-space` | Espace blanc du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-word-spacing` | Espacement des mots du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-letter-spacing` | Espacement des lettres du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-text-shadow` | Ombre du texte de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-text-decoration` | Décoration du texte de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-text-transform` | Transformation du texte de la barre de navigation | `none` |
| `$wizard-navigation-bar-text-text-align` | Alignement du texte de la barre de navigation | `center` |
| `$wizard-navigation-bar-text-line-height` | Hauteur de ligne du texte de la barre de navigation | `1.5` |
| `$wizard-navigation-bar-text-font-weight` | Poids de police du texte de la barre de navigation | `normal` |
| `$wizard-navigation-bar-text-font-size` | Taille de police du texte de la barre de navigation | `14px` |
| `$wizard-navigation-bar-text-font-family` | Famille de police du texte de la barre de navigation | `inherit` |
| `$wizard-navigation-bar-text-color` | Couleur du texte de la barre de navigation | `#333` |
| `$wizard-navigation-bar-box-shadow` | Ombre de la barre de navigation | `none` |
| `$wizard-navigation-bar-transition` | Transition de la barre de navigation | `all 0.3s ease-in-out` |
| `$wizard-navigation-bar-z-index` | Index z de la barre de navigation | `1` |
| `$wizard-navigation-bar-margin` | Marge de la barre de navigation | `0` |
| `$wizard-navigation-bar-padding` | Remplissage de la barre de navigation | `0` |
| `$wizard-navigation-bar-border-radius` | Rayon de la bordure de la barre de navigation | `0` |
| `$wizard-navigation-bar-border-style` | Style de la bordure de la barre de navigation | `solid` |
| `$wizard-navigation-bar-border-width` | Largeur de la bordure de la barre de navigation | `1px` |
| `$wizard-navigation-bar-border-color` | Couleur de la bordure de la barre de navigation | `#ddd` |
| `$wizard-navigation-bar-background-color` | Couleur de fond de la barre de navigation | `#f5f5f5` |
| `$wizard-navigation-bar-height` | Hauteur de la barre de navigation | `50px` |

## Example
You can find an basic example project using `angular-archwizard` [here](https://madoar.github.io/angular-archwizard-demo).
The sources for the example can be found in the [angular-archwizard-demo](https://github.com/madoar/angular-archwizard-demo) repository.
It illustrates how the wizard looks like and how the different settings can change its layout and behavior.
