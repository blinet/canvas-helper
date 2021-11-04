# Easy to edit image.

## Content

- [Description.](#description) ✏️
- [Resize Text.](#ResizeText) 📄
- [Split Text.](#SplitText) 📝
- [Circle Image.](#Circle) ⭕
- [Curved Edge](#Curve) 🔲
- [Draw Center](#drawCenter) 📍
- [Other](#other) 🔗

## Description

helper canvas is a simple package help you to edit, circle your image or resize, split your text.

## ResizeText

Resize text to not go out canvas image.

```javascript
const Discord = require("discord.js");
const Canvas = require("canvas");
const editor = require("editor-canvas");
const client = new Discord.Client();

client.on("message", async message => {
  var args = message.content.split(" ");
  if (args[0].toLowerCase() === "write") {
    var canvas = Canvas.createCanvas(512, 512),
      ctx = canvas.getContext("2d");

    var words = args.slice(1);
    ctx.font = editor.resizeText(ctx, { text: words });
    ctx.fillText(words, 100, 0);

    var attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "Circle.png"
    );
    message.channel.send({ files: [attachment] });
  }
});
```

## SplitText

Split text to not go out canvas image.

```javascript
const Discord = require("discord.js");
const Canvas = require("canvas");
const editor = require("editor-canvas");
const client = new Discord.Client();

client.on("message", async message => {
  var args = message.content.split(" ");
  if (args[0].toLowerCase() === "write") {
    var canvas = Canvas.createCanvas(512, 512),
      ctx = canvas.getContext("2d");

    var words = args.slice(1);
    ctx.font = "20px ";
    words = editor.splitText(ctx, { text: words });
    ctx.fillText(words, 100, 0);

    var attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "Circle.png"
    );
    message.channel.send({ files: [attachment] });
  }
});
```

## Circle

form an image to circle.

```javascript
const Discord = require("discord.js");
const editor = require("editor-canvas");
const client = new Discord.Client();

client.on("message", async message => {
  if (message.content === "circle") {
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg"
    });

    avatar = await editor.drawCircle({ image: avatar });

    var attachment = new Discord.MessageAttachment(avatar, "Circle.png");
    message.channel.send({ files: [attachment] });
  }
});
```

## Curve

Curve the edge for image

```javascript
const Discord = require("discord.js");
const editor = require("editor-canvas");
const client = new Discord.Client();

client.on("message", async message => {
  if (message.content === "circle") {
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg"
    });

    avatar = await editor.uploadImage({ image: avatar });

    var attachment = new Discord.MessageAttachment(avatar, "Curved.png");
    message.channel.send({ files: [attachment] });
  }
});
```

## drawCenter

draw image in a specify center point

```javascript
const Discord = require("discord.js");
const Canvas = require("canvas");
const editor = require("editor-canvas");
const client = new Discord.Client();

client.on("message", async message => {
  var args = message.content.split(" ");
  if (args[0].toLowerCase() === "center") {
    var canvas = Canvas.createCanvas(512, 512),
      ctx = canvas.getContext("2d");
    var avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "jpg"
    });

    avatar = await editor.drawCircle({ image: avatar });
    editor.drawCenter(ctx, avatar, 200, 200, 100, 100);

    var attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "Center.png"
    );
    message.channel.send({ files: [attachment] });
  }
});
```

## Other

functions and its options.

### drawCircle

> ```javascript
> • ({ image ,fill, stroke, weight })
>
> image // specific image , optional
>
> fill // if don't want image , u can draw circle with specific color, optional
> // fill: "RED"
>
> stroke // draw a fram among image or circle, with specific color, optional
> // stroke: "GRAY"
>
> weight // fram width, optional
> //weight: 30
> ```

### uploadImage

> ```javascript
> • ({ image, fill, stroke, weight, curve })
>
> image // specific image , optional
>
> fill // if don't want image , u can draw circle with specific color, optional
> // fill: "RED"
>
> stroke // draw a fram among image or circle, with specific color, optional
> // stroke: "GRAY"
>
> weight // fram width, optional
> //weight: 5
>
> curve // curve the edge, optional
> //curve: 30
> ```

### resizeText

> ```javascript
> • ({ text, width, font })
> text // specific text , required
>
> width // when text go out the spefic width  will resize , optional
> // width: 200
>
> font // text font to start with it, optional
> // font: 20
>
> ```

### splitText

> ```javascript
> • ({ text, width, maxLine })
> text // specific text , required
>
> width // when text go out the spefic width  will resize , optional
> // width: 200
>
> maxLine // max line reached when text is big, optional
> // maxLine: 2
>
> ```

Thanks for using it ❤️.
