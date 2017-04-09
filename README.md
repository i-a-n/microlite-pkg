# microlite package ![version](https://img.shields.io/npm/v/microlite.svg)

[![NPM](https://nodei.co/npm/microlite.png)](https://nodei.co/npm/microlite/)

microlite is an über-small image lightbox that leaves a microscopic footprint. It was originally
[built by @danklammer](https://github.com/danklammer/microlite). This repo (for packaging) will maintain feature parity
with that original repo.

## Table of Contents
   * [Purpose](#purpose)
   * [Installation](#installation)
   * [Usage](#usage)
   * [Features](#features)
   * [Demo](#demo)

## Purpose

microlite is a JavaScript lightbox with zero dependencies. It has no extras, no icons, no options and no bloat, but looks
nice and is easy to use. If you want special behavior, extra options or flexible features, you'll need to consider another
lightbox library (or fork this one and edit it yourself!).

microlite only modifies and animates composite (transform and opacity) CSS properties, giving you buttery smooth 60 FPS
transitions. And it uses CSS multiple backgrounds to load in the high-res version on top of the low-res, making the
experience fast and seamless. Plus, including it in your app is as easy as `import`ing and setting an `onclick={}`.


## Installation

**NPM:**
```
npm install microlite --save
```

**Other package managers:**

Coming soon

## Usage

**React:**
Using microlite is easy: simply add the microlite function to the `onclick` event on an `<a>` tag, with the thumbnail
inside it. Just make sure you pass it the event reference, like this:

```js
/* Import microlite */
import microLite from 'microlite';

class YourLightboxImage extends React.Component {

  render() {
    return (
      <a href='[full-image.jpg]'  onClick={(e) => microLite(e)}>
        <img src='[thumbnail-image.jpg]' />
      </a>
    );
  }
}
```

...You can also use it without Babel/ES6 syntax, of course:

```js
return (
  <a href='[full-image.jpg]'  onClick={function(e) { microLite(e) }}>
    <img src='[thumbnail-image.jpg]' />
  </a>
);
```

See [this example](https://codepen.io/ianm/project/editor/AYMNEA/) for reference

**Other platforms:**

Coming soon

## Features

- Prevents wheel-scrolling
- Closes on escape key keypress
- Removes listeners when closed, keeping your window events clean


## Demo

[Try it out](https://codepen.io/ianm/project/editor/AYMNEA/)

![MicroLite demo](https://github.com/danklammer/microlite/raw/master/demo.gif "MicroLite")
