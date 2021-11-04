const Canvas = require("canvas");

///// Error log /////
var error = err => {
  throw new Error(err);
};

///// Resize Text /////
function resizeText(ctx, { text, width, font }) {
  try {
    if (!ctx || !ctx.canvas) return error("resizeText: ctx not defined");
    if (!text) return error("resizeText: text can't be empty");
    if (!width || isNaN(width)) width = ctx.canvas.width;
    text = text.toString();
    if (!font || isNaN(font)) font = 20;
    let fontSize = font;
    do {
      ctx.font = `${(fontSize -= 2)}px `;
    } while (ctx.measureText(text).width > width);
    return ctx.font;
  } catch (e) {
    return error(`resizeText:\n ${e}`);
  }
}

///// Split Text /////
function splitText(ctx, { text, width, maxLine }) {
  try {
    if (!ctx || !ctx.canvas) return error("splitText: ctx not defined");
    if (!text) return error("splitText: text can't be empty");
    if (!width || isNaN(width)) width = ctx.canvas.width;
    text = text.toString();
    var Width = ctx.measureText(text).width;
    var end = "";
    width = width - 10;
    var newText = text;
    if (Width > width) {
      newText = "";
      var times = Width / width;
      if (!maxLine || isNaN(maxLine)) maxLine = times;
      var Times = Math.ceil(text.length / times);
      if (maxLine && times > maxLine) {
        times = maxLine;
        end += "…";
      }
      for (let i = 0; i < times; i++) {
        newText += `${text.slice(
          i * Times,
          i == times ? text.length : Times * (i + 1)
        )}\n`;
      }
    }
    return `${newText.slice(0, -2)}${end}`;
  } catch (e) {
    return error(`splitText:\n ${e}`);
  }
}

///// Draw Circle /////
async function drawCircle(
  { image, stroke, fill, weight } = {
    fill: "BLACK",
    stroke: "BLACK",
    weight: 5
  }
) {
  try {
    stroke = stroke ? stroke : null;
    fill = fill ? fill : null;
    weight = weight && !isNaN(weight) ? weight : 5;

    var canvas = new Canvas.createCanvas(1024, 1024),
      ctx = canvas.getContext("2d");
    var x, y, w, h;
    x = y = weight;
    w = canvas.width - weight * 2;
    h = canvas.height - weight * 2;
    ctx.lineWidth = weight;
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, Math.PI * 2, true);
    if (stroke) ctx.stroke();
    if (fill) ctx.fill();
    ctx.clip();

    if (image) {
      try {
        image = await Canvas.loadImage(image);
      } catch (e) {
        image = false;
      }
      if (image) ctx.drawImage(image, x, y, w, h);
    }

    return canvas.toBuffer();
  } catch (e) {
    return error(`drawCircle:\n ${e}`);
  }
}

///// Draw Center /////
function drawCenter(ctx, img, x, y, w, h) {
  try {
    if (!ctx || !ctx.drawImage) return error("drawCenter: ctx not defined");
    if (!img || !isNaN(img)) return error("drawCenter: img not defined");
    var check =
      typeof x == typeof y &&
      typeof w == typeof h &&
      typeof x == typeof h &&
      typeof x == "number";

    if (!check)
      return error("drawCenter: coordinates can't be string or empty");
    if (img) {
      x -= w / 2;
      y -= h / 2;
      ctx.drawImage(img, x, y, w, h);
    }
  } catch (e) {
    return error(`drawCenter:\n ${e}`);
  }
}

///// Upload Image /////
async function uploadImage(
  { image, curve, stroke, fill, weight } = {
    curve: 20,
    stroke: "BLACK",
    fill: "BLACK",
    weight: 10
  }
) {
  try {
    curve = curve && !isNaN(curve) ? curve : 20;
    stroke = stroke ? stroke : null;
    fill = fill ? fill : null;
    weight = weight && !isNaN(weight) ? weight : 5;

    var x, y, w, h;
    var canvas = new Canvas.createCanvas(1024, 1024),
      ctx = canvas.getContext("2d");
    x = y = weight;
    w = canvas.width - weight * 2;
    h = canvas.height - weight * 2;

    ctx.lineWidth = weight;

    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;

    if (curve > w || curve > h) curve = Math.floor(Math.min(w, h) / 2);

    ctx.beginPath();
    ctx.moveTo(x + curve, y);

    ctx.lineTo(x + w - curve, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + curve);

    ctx.lineTo(x + w, y + h - curve);
    ctx.quadraticCurveTo(x + w, y + h, x + w - curve, y + h);

    ctx.lineTo(x + curve, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - curve);

    ctx.lineTo(x, y + curve);
    ctx.quadraticCurveTo(x, y, x + curve, y);
    if (stroke) ctx.stroke();
    if (fill) ctx.fill();
    ctx.clip();

    if (image) {
      try {
        image = await Canvas.loadImage(image);
      } catch (e) {
        image = false;
      }
      if (image) ctx.drawImage(image, x, y, w, h);
    }
    return canvas.toBuffer();
  } catch (e) {
    return error(`uploadImage:\n ${e}`);
  }
}

module.exports.resizeText = resizeText;
module.exports.splitText = splitText;
module.exports.drawCircle = drawCircle;
module.exports.drawCenter = drawCenter;
module.exports.uploadImage = uploadImage;
