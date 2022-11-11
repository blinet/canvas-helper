# Easy to edit image.


  <p>
 <a href="https://github.com/arosteam"><img src="https://img.shields.io/static/v1?label=powered%20by&message=Aros&color=000636&style=for-the-badge&logo=Windows%20Terminal&logoColor=fff"/></a>
 <a href="https://www.npmjs.com/package/editor-canvas"><img src="https://img.shields.io/npm/v/editor-canvas.svg?style=for-the-badge" alt="NPM version" /></a>
 <a href="https://www.npmjs.com/package/editor-canvas"><img src="https://img.shields.io/npm/dt/editor-canvas.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
 <a href="https://paypal.me/arosteam?country.x=SA&locale.x=ar_EG"><img src="https://img.shields.io/badge/-donate-blue.svg?logo=paypal&style=for-the-badge" alt="NPM downloads" /></a>

  </p>
  
  

## Installation

### Install **[editor-canvas](https://npmjs.com/package/editor-canvas)**

```sh
$ npm install editor-canvas
```


## Features

- [Description.](#description) ✏️
- [Resize Text.](#resizeText) 📄
- [Split Text.](#splitText) 📝
- [Draw Center](#drawCenter) 📍
- [Circle Image.](#drawCircle) ⭕
- [Curved Edge](#drawSquare) 🔲
- [Draw Polygon](#drawPolygon) 📏
- [Resize Image](#resizeImage) 🔧
- [Other](#other) 🔗

### What's new!!

#### New function

- [Crop Image](#cropImage) ✂️

#### update image function(s)

- image width/height will not change !
- new parameter (Canvas) to easy to use.


## Description

editor canvas is a simple package help you to edit your image and text.
(All example bellow is under discord, but you can use the function anywhere)


## resizeText

Resize text to not go out canvas image.

```javascript
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const Canvas = require("canvas");
const editor = require("editor-canvas");

client.on("messageCreate", async (message) => {
  var args = message.content.split(" ");
  if (args[0].toLowerCase() === "write") {
    var canvas = Canvas.createCanvas(512, 512),
      ctx = canvas.getContext("2d");

    var words = args.slice(1);
    ctx.font = editor.resizeText(ctx, { text: words });
    ctx.fillText(words, 100, 0);

    message.channel.send({ files: [canvas.toBuffer()] });
  }
});
```

## splitText

Split text to not go out canvas image.

```javascript
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const Canvas = require("canvas");
const editor = require("editor-canvas");

client.on("messageCreate", async (message) => {
  var args = message.content.split(" ");
  if (args[0].toLowerCase() === "write") {
    var canvas = Canvas.createCanvas(512, 512),
      ctx = canvas.getContext("2d");

    var words = args.slice(1);
    ctx.font = "20px ";
    words = editor.splitText(ctx, { text: words });
    ctx.fillText(words, 100, 0);

    message.channel.send({ files: [canvas.toBuffer()] });
  }
});
```

## drawCenter

draw image in a specify center point

```javascript
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const Canvas = require("canvas");
const editor = require("editor-canvas");

client.on("messageCreate", async (message) => {
  var args = message.content.split(" ");
  if (args[0].toLowerCase() === "center") {
    var canvas = Canvas.createCanvas(512, 512),
      ctx = canvas.getContext("2d");

    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg",
      size: 1024,
    });

    avatar = await editor.drawCircle({ image: avatar, Canvas });
    editor.drawCenter(ctx, avatar, 200, 200, 100, 100);

    message.channel.send({ files: [canvas.toBuffer()] });
  }
});
```

## drawCircle

from an image to circle.

```javascript
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const editor = require("editor-canvas");

client.on("messageCreate", async (message) => {
  if (message.content === "circle") {
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg",
      size: 2048,
    });

    avatar = await editor.drawCircle({ image: avatar });

    message.channel.send({ files: [avatar] });
  }
});
```

## drawSquare

Curve the edge for image

```javascript
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const editor = require("editor-canvas");

client.on("messageCreate", async (message) => {
  if (message.content === "curve") {
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg",
      size: 1024,
    });

    avatar = await editor.drawSquare({ image: avatar });

    message.channel.send({ files: [avatar] });
  }
});
```

## drawPolygon

Draw any polygon with simple step

```javascript
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const editor = require("editor-canvas");

client.on("messageCreate", async (message) => {
  if (message.content === "polygon") {
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg",
      size: 1024,
    });

    avatar = await editor.drawPolygon({ image: avatar, angle: 10 });

    message.channel.send({ files: [avatar] });
  }
});
```

## resizeImage

Resize your image with specific width & height

```javascript
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const editor = require("editor-canvas");

client.on("messageCreate", async (message) => {
  var [cmd, width, height] = message.content.trim().split(/ +/);
  if (cmd === "resize") {
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg",
      size: 1024,
    });

    avatar = await editor.resizeImage({
      image: avatar,
      width: width,
      height: height,
    });

    message.channel.send({ files: [avatar] });
  }
});
```

# New

## cropImage

crop your image with specific coordinates

```javascript
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
const editor = require("editor-canvas");

client.on("messageCreate", async (message) => {
  var [cmd, x, y, width, height] = message.content.trim().split(/ +/);
  if (cmd === "crop") {
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg",
      size: 1024,
    });

    avatar = await editor.cropImage({
      image: avatar,
      x: x,
      y: y,
      width: width,
      height: height,
    });

    message.channel.send({ files: [avatar] });
  }
});
```

# Other

functions and its options.

### resizeText

> ```javascript
>
> • (ctx, { text, width, font })
>
> text // specific text. (required)
>
> width // when text go out the spefic width  will resize. (optional)
> // width: 200
>
> font // text font to start with it. (optional)
> // font: 20
>
> ```

### splitText

> ```javascript
>
> • (ctx, { text, width, maxLine })
>
> text // specific text. (required)
>
> width // when text go out the spefic width  will resize. (optional)
> // width: 200
>
> maxLine // max line reached when text is big. (optional)
> // maxLine: 2
>
> ```

### drawCircle

> ```javascript
>
> • ({ image ,fill, stroke, weight, Canvas })
>
> image // specific image. (optional)
>
> fill // if don't want image , u can draw circle with specific color. (optional)
> // fill: "BLACK"
>
> stroke // draw a fram among image or circle, with specific color. (optional)
> // stroke: "BLACK"
>
> weight // fram width. (optional)
> //weight: 5
>
> Canvas // you can use the image in your canvas code without use "loadImage"
> // else will be a Buffer image
>
> ```

### drawSquare

> ```javascript
>
> • ({ image, fill, stroke, weight, curve, Canvas })
>
> image // specific image. (optional)
>
> fill // if don't want image , u can draw circle with specific color. (optional)
> // fill: "BLACK"
>
> stroke // draw a fram among image or circle, with specific color. (optional)
> // stroke: "BLACK"
>
> weight // fram width. (optional)
> //weight: 5
>
> curve // curve the edge. (optional)
> //curve: 30
>
> Canvas // you can use the image in your canvas code without use "loadImage"
> // else will be a Buffer image
>
> ```

### drawPolygon

> ```javascript
>
> • ({ image, fill, stroke, weight, angle })
>
> image // specific image. (optional)
>
> fill // if don't want image , u can draw circle with specific color. (optional)
> // fill: "BLACK"
>
> stroke // draw a fram among image or circle, with specific color. (optional)
> // stroke: "BLACK"
>
> weight // fram width. (optional)
> //weight: 5
>
> angle // count of polygon angle. (optional)
> //angle: 10
>
> Canvas // you can use the image in your canvas code without use "loadImage"
> // else will be a Buffer image
>
> ```

### resizeImage

> ```javascript
>
> • ({ image, width, height, Canvas })
>
> image // specific image. (required)
>
> width // the new width for image. (optional)
>
> height // the new height for image. (optional)
>
> Canvas // you can use the image in your canvas code without use "loadImage"
> // else will be a Buffer image
>
> ```

### cropImage

> ```javascript
>
> • ({ image, x, y, width, height, Canvas })
>
> image // specific image. (required)
>
> x // to crop from top
>
> y // to crop from left
>
> width // the width to crop
>
> height // the height to crop
>
> Canvas // you can use the image in your canvas code without use "loadImage"
> // else will be a Buffer image
>
> ```

# Thanks for using it ❤️. [Support](https://discord.gg/maxSPHjvaw).
