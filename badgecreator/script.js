
let iconImage;
const options = {
    backgroundColor: "#1b112b",
    outlineColor: "#9722ff",
    textColor: "#FFFFFF",
    fontSize: 80,
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
    createCanvas(1024, 281)
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
        image(iconImage, 1024/2 - 1024/3, height/2, 200, 200)
    }
    textStyle(options.textType)
    push();
    noStroke();
    fill(options.textColor)
    text(options.text, 300, options.outlineWidth * 2, 724, 200)
    pop();
}