// TODO: Remake this code, make custom GUI system, so I can add dynamic options,
// Like switching the color options between Solid Color, and Gradient
let iconImage;
const options = {
    backgroundColor: "#1b112b",
    outlineColor: "#9722ff",
    textColor: "#FFFFFF",
    fontSize: 64,
    textType: "bold",
    outlineWidth: 20,
    hasIcon: true,
    iconURL: "https://github.com/QuiltMC/art/blob/master/brand/512png/quilt_logo_transparent.png?raw=true",
    text: "Supported on \nQuilt Loader",
    "Refresh Image": function() {
        iconImage.remove();
        iconImage = createImg(options.iconURL);
        iconImage.hide();
    }
}
const gui = new dat.GUI();
gui.addColor(options, "backgroundColor")
gui.addColor(options, "outlineColor")
gui.addColor(options, "textColor")
gui.add(options, "fontSize")
gui.add(options, "textType", ["normal", "bold", "italic", "bold italic"])
gui.add(options, "outlineWidth")
gui.add(options, "text")
gui.add(options, "hasIcon")
gui.add(options, "iconURL")
gui.add(options, "Refresh Image")

function setup() {
    const canvas = createCanvas(859, 288)
    canvas.parent("canvas")
    iconImage = createImg(options.iconURL);
    iconImage.hide();
    imageMode(CENTER)
    textAlign(CENTER, CENTER)
}
function draw() {
    clear()
    textSize(options.fontSize);
    stroke(options.outlineColor)
    fill(options.backgroundColor)
    strokeWeight(options.outlineWidth)
    rect(options.outlineWidth/2, options.outlineWidth/2, width-options.outlineWidth, height-options.outlineWidth, 20)
    if (options.hasIcon) {
        image(iconImage, 859/2 - 859/3, height/2, 200, 200)
    }
    textStyle(options.textType)
    push();
    noStroke();
    fill(options.textColor)
    text(options.text, 252, 0, 607, 288)
    pop();
}