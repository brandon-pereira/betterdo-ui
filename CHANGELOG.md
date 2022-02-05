# Changelog

## v5.5.0

-   Upgraded `react-router` to v6.
-   Migrated modal animations to Framer Motion
-   Added ability to deeplink to modals
-   Added animation to nav when switching lists

## v5.4.1

-   We're now 100% Typescript!
-   Minor bug fixes throughout app

## v5.4.0

-   We're now in the [Android Play Store](https://play.google.com/store/apps/details?id=app.betterdo.twa&hl=en_CA&gl=US), leveraging a TWA for the deploy process.
-   Front-end is now primarily written in TypeScript, more migrations to follow.
-   Rebuilt static site in Astro, now has automated deploys like the rest of the app.
-   Migrate various legacy animations to Framer Motion
-   Upgrade `web-notifier` dependency to v2

## v5.3.2

-   More improvements to animations when completing tasks
-   Fixed gap issue on main task container
-   Various perceived performance gains

## v5.3.1

-   Improvements to animations on switching lists and adding/completing tasks

## 5.3.0

-   Fixed issues with this week list
-   Switched animation engines, added animations to tasks load/switching
-   Better "Due By" quick action toggles
-   Fix issue which broke dark mode logic
-   Slowly migrating codebase to TypeScript

## v5.2.1

-   Added animation to completed tasks counter when incrementing

## v5.2.0

-   Added "Overdue" and "This Week" custom lists
-   Custom lists now display their respective date in the navigation.
-   Custom lists tasks states should now update more reliably
-   Added timezone setting to improve reliability of date based custom lists
-   Fix bug when editing task details from custom lists would navigate to original list

## v5.1.2

-   Improve DX when running app locally
-   Improve notification handling
-   Dark mode improvements
-   Accessibility improvements

## v5.1.1

-   Fix notification icon being broken

## v5.1.0

-   Added back sorting to subtasks
-   Automated deploys to production
-   Custom scrollbars on some elements
-   Initial plumbing for Typescript migration
-   Various Bug Fixes

## v5.0.0

-   Significantly faster development boot times thanks to Snowpack
-   Significantly smaller bundle size by only supporting modern browsers
-   Added modal height animations
-   Added tab animations
-   Improved complete task animation
-   Fix error when changing personal information
-   Improved drag and drop logic within tasks sometimes being janky
-   Dropped `date-fns` dependency in favour of vanilla Javascript relative time formatting
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
