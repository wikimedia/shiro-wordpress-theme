Wikimedia's Shiro Theme
===

This theme was originally forked from the Reaktiv Studios starter theme and [Underscores](https://github.com/Automattic/_s) with quite a few additions. The following documentation runs through the basics of the theme and any commands you may need to follow.

Folder Structure
---------------
The basic folder structure keeps things fairly simple and organized by type.

The `assets` folder contains front-end files in the `src` sub-directory. Any files that need to be generated or built from source are output into `dist`, and files are enqueued by the theme from that directory.

The `inc` folder contains all PHP files that aren't required in the root directory by WordPress.

The `template-parts` folder contains template parts used by larger templates in the root directory.

Branches & Deploy Process
---------------

Branch | Purpose | Contains built code
---- | ----- | -----
`main` | Primary repository branch; should be the branch base and target branch when creating pull requests for new features. | NO
`release` | Release branch, updated automatically by Actions when code is merged to `main`. Should never be PR'd to directly. | YES
`develop` | Test branch; PR branches can be merged into this to generate a test release. Should be periodically reset to `main`. | NO
`release-develop` | Test build, updated automatically by Actions when code is merged to `develop`. Should never be PR'd to directly. | YES

The release and release-develop versions of the Shiro theme are built using [GitHub Actions](https://github.com/features/actions). Any time a pull request is merged into the `main` or `develop` branches, that code is built and pushed to the corresponding `release` and `release-develop` branches. **You should not commit to the release branches directly,** nor submit pull requests against them.

Development workflow:

- Implement a feature or bugfix in a feature branch created off of `main`
- Submit a pull request from that feature branch back into `main`, and get code review
- Merge the feature branch into `develop` manually.
  - The `release-develop` branch will be automatically rebuilt
- Update the preproduction or development environment for your project to reference the newest built version of the `release-develop` branch, to deploy and test the theme PR.
- Once approved, merge the pull request into `main`
  - The `release` branch will be automatically rebuilt
- Update the production branch in your project repository to reference the newest built version of the `release` branch, to deploy the change to production.


Build Process
---------------
This theme uses [Gulp](http://gulpjs.com/) & [Webpack](https://webpack.js.org) for all its build process needs. They will help you to concatenate, lint and build your files. This also includes livereload, which will automatically inject CSS changes, and reload the live page whenever changes are made to JS or PHP files.

The following tasks are available to you:

* `npm run build`
This builds out the assets and runs the following tasks: `styles`, `scripts`

* `npm run lint`
Lints JavaScript and (modified) PHP files.

* `npm run lint:js`
Lints only JavaScript using `eslint`

* `npm run lint:php`
Lints only PHP files which have changed in the current branch, using `phpcs`.  To run PHPCS on all files, run `composer phpcs`.

* `npm run start`
Begins watching front-end assets (scripts and styles) and compiles them when changed. This will also start the livereload script, which refreshes the page when changes are made.

> [!WARNING]
> When running the `npm start` development server, WordPress [requires](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) SCRIPT_DEBUG to be enabled. On a macOS host system you can edit the configuration for VIP's dev-env environment at `~/.local/share/vip/dev-environment/wikimedia/config/wp-config.php` (assuming `wikimedia` is your environment slug.). Add `define( 'SCRIPT_DEBUG', true );` to permit WordPress to load files from our development server.

> [!IMPORTANT]
> This theme's dependencies currently require Node 22. If you use [nvm](https://github.com/nvm-sh/nvm) to manage your local Node install, you may run `nvm use` to select the appropriate Node version for the commands above.

CSS
---------------
CSS should follow the BEM naming convention and files should be clearly commented.

JS
---------------
JS should follow the project linting standards, which are based on the [WordPress core coding standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/javascript/) and [Human Made coding standards]([https://](https://www.npmjs.com/package/@humanmade/eslint-config)). In addition, please use [JSDoc](http://eslint.org/docs/rules/require-jsdoc) to document functions.

Due to evolving JavaScript best practices over the lifecycle of this project, different pieces of JS code are held to slightly different coding standards. ESLint is configured in [`.eslintrc`](.eslintrc).

PHP
---------------
PHP should follow the [WordPress coding standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/). PHP Codesniffer is configured in [`phpcs.xml`](phpcs.xml).

Icons
---------------
An SVG icon system has been included as a sprite sheet generated by gulp by running `gulp` or `npm run build-spritesheet` within the `assets/src/svg` folder. This is segregated from the rest of the build because this asset rarely changes, and because the sprite generation relies on Gulp when the remainder of the build has been migrated to wp-scripts.

In order to keep the file size of this spritesheet down, only icons which are added to the theme's `assets/src/svg/individual` folder are compiled and included in this sprite file. The compiled icon sprite asset is generated in `assets/src/svg/spritesheet` and copied to `assets/dist/icons.svg` as part of the main build.

##### Using icons in the theme
The helper function `wmf_show_icon` is available to make using icons as simple as possible. The parameters for this function are the name of the SVG to display and optional classes to add. The name matches the name of the original SVG file.

````php
wmf_show_icon( 'search' );
````

When the SVG is output, it will include the `icon` and `icon-{icon-name}` CSS classes so that it can be targeted and styled.

Additional Documentation
---------------
- [Code repository wiki](https://github.com/wikimedia/shiro-wordpress-theme/wiki)
- [Meta-Wiki page](https://meta.wikimedia.org/wiki/Wikimedia_Foundation_website/WordPress_theme)
