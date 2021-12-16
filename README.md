# Easy to edit image.

## Content

- [Description.](#description) ✏️
- [Resize Text.](#ResizeText) 📄
- [Split Text.](#SplitText) 📝
- [Circle Image.](#Circle) ⭕
- [Curved Edge](#Curve) 🔲
- [Draw Center](#drawCenter) 📍
- [Other](#other) 🔗

#### What's new!!

##### New function

- [Draw Polygon](#Polygon) 📏
- [Resize Image](#ResizeImage) 🔧

##### Function changed

- [uploadImage => drawSquare](#Curve)

## Description

editor canvas is a simple package help you to edit your image and text.

## ResizeText

Resize text to not go out canvas image.

```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
const Canvas = require("canvas");
const editor = require("editor-canvas");

client.on("message", async message => {
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

## SplitText

Split text to not go out canvas image.

```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
const Canvas = require("canvas");
const editor = require("editor-canvas");

client.on("message", async message => {
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

## Circle

from an image to circle.

```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
const editor = require("editor-canvas");

client.on("message", async message => {
  if (message.content === "circle") {
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg",
      size: 2048
    });

    avatar = await editor.drawCircle({ image: avatar });

    message.channel.send({ files: [avatar] });
  }
});
```

## Curve

Curve the edge for image

```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
const editor = require("editor-canvas");

client.on("message", async message => {
  if (message.content === "curve") {
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg",
      size: 1024
    });

    avatar = await editor.drawSquare({ image: avatar });

    message.channel.send({ files: [avatar] });
  }
});
```

## drawCenter

draw image in a specify center point

```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
const Canvas = require("canvas");
const editor = require("editor-canvas");

client.on("message", async message => {
  var args = message.content.split(" ");
  if (args[0].toLowerCase() === "center") {
    var canvas = Canvas.createCanvas(512, 512),
      ctx = canvas.getContext("2d");

    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg",
      size: 1024
    });

    avatar = await editor.drawCircle({ image: avatar });
    editor.drawCenter(ctx, avatar, 200, 200, 100, 100);

    message.channel.send({ files: [canvas.toBuffer()] });
  }
});
```

# New

## Polygon

Draw any polygon with simple step

```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
const editor = require("editor-canvas");

client.on("message", async message => {
  if (message.content === "polygon") {
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg",
      size: 1024
    });

    avatar = await editor.drawPolygon({ image: avatar, angle: 10 });

    message.channel.send({ files: [avatar] });
  }
});
```

## ResizeImage

Resize your image with specific width & height

```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
const editor = require("editor-canvas");

client.on("message", async message => {
  var [cmd, width, height] = message.content.trim().split(/ +/);
  if (cmd === "resize") {
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg",
      size: 1024
    });

    avatar = await editor.resizeImage({
      image: avatar,
      width: width,
      height: height
    });

    message.channel.send({ files: [avatar] });
  }
});
```

## Other

functions and its options.

### drawCircle

> ```javascript
>
> • ({ image ,fill, stroke, weight })
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
> ```

### drawSquare

> ```javascript
>
> • ({ image, fill, stroke, weight, curve })
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
> ```

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

Thanks for using it ❤️.
