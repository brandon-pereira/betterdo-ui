# Changelog

## v4.3.0 (Pre-Release)

-   Significantly faster boot times thanks to Snowpack
-   Dropped `date-fns` dependency in favour of vanilla Javascript
-   Dependency upgrades

## v4.2.0 (2021-09-28)

-   Backend Re-written in TypeScript (no feature changes)
-   Push notification when toggling Notifications on from off in settings
-   Fix some style regressions introduced dark mode

## v4.1.0 (2021-07-25)

-   Dark Mode 🔦
-   Optimizations to reordering task logic

## v4.0.3 (2021-07-22)

-   Refactored the way reordering tasks/lists is done. Now more accessible and performant.

## v4.0.2 (2021-07-05)

-   Improved app accessibility
-   Fixed bug when deleting task title
-   Fixed bug where "All caught up" banner shown incorrectly.
-   Internal refactoring of state management

## v4.0.1 (2021-02-20)

-   Fix bug with changing lists sometimes erroring
-   Improve "Completed Tasks" button styling
-   Began implementing changelog injection

## 4.0.0 (2021-02-14)

-   Initial v4 release.
-   Features redesigned frontend infrastructure and styling.
-   Features faster loading and interactions thanks to reduced server response payloads.
-   Faster front-end refreshing using more focus and blur events on browser
-   Occasional polling to server for data
-   Rebuild frontend service worker logic, migrating to WorkerBox
-   Now completely leveraging React Hooks

## v3.0.0 (2020-01-03)

-   Complete overhaul of BetterDo.
-   Migrate from PHP to Node
-   Migrate from Angular to React

## v2.0.0

-   Rebuild application using Angular

## v1.0.0

-   Initial launch of application leveraging PHP and jQuery
