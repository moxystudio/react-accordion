# react-accordion

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][build-status-image]][build-status-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/react-accordion
[downloads-image]:https://img.shields.io/npm/dm/@moxy/react-accordion.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/react-accordion.svg
[build-status-url]:https://github.com/moxystudio/react-accordion/actions
[build-status-image]:https://img.shields.io/github/workflow/status/moxystudio/react-accordion/Node%20CI/master
[codecov-url]:https://codecov.io/gh/moxystudio/react-accordion
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/react-accordion/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/react-accordion
[david-dm-image]:https://img.shields.io/david/moxystudio/react-accordion.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/react-accordion?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/react-accordion.svg

A react component that renders an accessible accordion.

## Installation

```sh
$ npm install @moxy/react-accordion
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.

## Motivation

An accordion allows users to toggle the display of content sections. This package was created to make it easier to implement an accordion with accessible navigation.

## Usage

```js
import React from 'react';
import { Accordion, AccordionItem } from '@moxy/react-accordion';

const MyComponent = () => {
    <div>
        <Accordion defaultActiveItems={ [0, 1] } multiple scrollIntoView>
            <AccordionItem title="Foo">
                Bar
            </AccordionItem>
            <AccordionItem title="Foo1">
                Bar1
            </AccordionItem>
        </Accordion>
    </div>
}
```

To import a stylesheet, one can import it on the project's entry CSS file:

```css
/* src/index.css */
@import "@moxy/react-accordion/dist/index.css";
```

Or in the project's entry JavaScript file:

```js
/* src/index.js */
import "@moxy/react-accordion/dist/index.css";
```

## API

These are the props available in [`@moxy/react-accordion`](https://github.com/moxystudio/react-accordion).

### Accordion Props

#### children

Type: `node` | Required: `true`

One or more `AccordionItem` elements that will be rendered inside the `Accordion`.

#### defaultActiveItems

Type: `array` | Required: `false` | Default: `[]`

The indexes of the items that should be open by default.  
It is necessary to have the prop `multiple` enabled to have more than one item open.

#### multiple

Type: `boolean` | Required: `false` | Default: `false`

Whether or not multiple items can be open at the same time.

#### className

Type: `string` | Required: `false`

A className to apply to the accordion container.

#### closedClassName

Type: `string` | Required: `false`

A className to apply to the accordion container when all the items are closed.

#### onItemToggling

Type: `function` | Required: `false` | Arguments: `index: Number, options: { active: Boolean }`

Callback to be invoked before an item is opened or closed.

### AccordionItem Props

#### title

Type: `any` | Required: `true`

The content of the title.

#### children

Type: `node` or `function` | Required: `false`

The content of the item.

Example with function:

```js
<AccordionItem { ...props }>
    { ({ isActive }) => isActive ? 'Open' : 'Closed' }
</AccordionItem>
```

> ⚠️ All the following props can be defined at the `Accordion` level whenever you want a specific prop to be the same for all accordion items.
>
> Keep in mind that if you define a prop in `Accordion` and in an `AccordionItem`, the one that will be used is the `AccordionItem` one.

#### animationDuration

Type: `number` | Required: `false` | Default: `300`

Duration of the animation for both opening and closing states.

#### animationEasing

Type: `string` | Required: `false` | Default: `ease-in-out`

Type of animation easing for both opening and closing states.

#### itemContainerClassName

Type: `string` | Required: `false`

A className to apply to the item container.

#### headingContainerClassName

Type: `string` | Required: `false`

A className to apply to the heading container.

#### titleContainerClassName

Type: `string` | Required: `false`

A className to apply to the title.

#### contentContainerClassName

Type: `string` | Required: `false`

A className to apply to the content container.

#### contentClassName

Type: `string` | Required: `false`

A className to apply to the content.

#### iconClassName

Type: `string` | Required: `false`

A className to apply to the icon container.

#### icon

Type: `any` | Required: `false`

The content of the icon.

## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```

## Demo

A demo [Next.js](https://nextjs.org/) project is available in the [`/demo`](./demo) folder so you can try out this component.

First, build the `react-accordion` project with:

```sh
$ npm run build
```

To run the demo, do the following inside the demo's folder:

```sh
$ npm i
$ npm run dev
```

*Note: Everytime a change is made to the package a rebuild is required to reflect those changes on the demo.*

## FAQ

### I can't override the component's CSS, what's happening?

There is an ongoing [next.js issue](https://github.com/zeit/next.js/issues/10148) about the loading order of modules and global CSS in development mode. This has been fixed in [v9.3.6-canary.0](https://github.com/zeit/next.js/releases/tag/v9.3.6-canary.0), so you can either update `next.js` to a version higher than `v9.3.5`, or simply increase the CSS specificity when overriding component's classes, as we did in the [`demo`](./demo/pages/index.module.css), e.g. having the page or section CSS wrap the component's one.

## License

Released under the [MIT License](./LICENSE).
