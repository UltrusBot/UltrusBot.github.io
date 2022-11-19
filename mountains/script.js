
const options = {
    end: '#cba5b2',
    middle: '#2f244f',
    start: '#0e0920',
    skyTop: '#93839e',
    skyBottom: '#e8ae9a',
    skyMultiplier: 5,
    xChangeMin: 5,
    xChangeMax: 30,
    yChangeMin: -10,
    yChangeMax: 10,
    ranges: 4,
    "Refresh Image": function() {
        generateMountains();
    },
    "Save Image": function() {
        saveCanvas("mountains", "png");
    },
    "Copy Shareable Link": function() {
        writeOptionsToUrl();
        navigator.clipboard.writeText(window.location.href);
    }
}
let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams)
for (let option of Object.keys(options)) {
    if (urlParams.has(option)) {
        if (option == "end" || option == "middle" || option == "start" || option == "skyTop" || option == "skyBottom") {
            options[option] = "#" + urlParams.get(option);
        } else {
            options[option] = +urlParams.get(option);
        }
    }
}
const gui = new dat.GUI();
let guiOptions = [
    gui.addColor(options, "end"),
    gui.addColor(options, "middle"),
    gui.addColor(options, "start"),
    gui.addColor(options, "skyTop"),
    gui.addColor(options, "skyBottom"),
    gui.add(options, "skyMultiplier"),
    gui.add(options, "xChangeMin"),
    gui.add(options, "xChangeMax"),
    gui.add(options, "yChangeMin"),
    gui.add(options, "yChangeMax"),
    gui.add(options, "ranges"),
    gui.add(options, "Refresh Image"),
    gui.add(options, "Save Image"),
    gui.add(options, "Copy Shareable Link")
]
function writeOptionsToUrl() {
    let url = "?";
    for (let option of guiOptions) {
        if (option.property !== "Refresh Image" && option.property !== "Save Image" && option.property !== "Copy Shareable Link") {
            let opt = (options[option.property]);
            if (typeof opt === "string" && opt.startsWith("#")) {
                opt = opt.substring(1);
            }
            url += option.property + "=" + opt + "&";
        }
    }
    window.history.pushState({}, "", url);
}
function tripleLerpColor(col1, col2,col3, percent) {
    if (percent < 0.5) {
        return lerpColor(col1, col2, percent*2);
    } else {
        return lerpColor(col2, col3, (percent-0.5)*2);
    }
}
function setup() {
    createCanvas(displayWidth, displayHeight);
    strokeWeight(3)
    generateMountains()
}
function generateMountains() {
    for (let y = 0; y < height; y++) {
        stroke(lerpColor(color(options.skyTop), color(options.skyBottom), (float)(y * options.skyMultiplier)/height));
        line(0, y, width, y);
    }
    noStroke();
    for (let i = 0; i < options.ranges; i++) {
        let curY = (height/3) + ((height/(options.ranges*2)) * Math.pow(i, 1.1));
        let curX = 0;
        fill(tripleLerpColor(color(options.start), color(options.middle), color(options.end), (options.ranges - i)/options.ranges));
        let trees = i > options.ranges - 3;
        treePoints = [];
        beginShape();
        vertex(0, height);
        vertex(curX, curY);
        while (curX < width) {
            let prevX = curX;
            let prevY = curY;
            curY += random(options.yChangeMin, options.yChangeMax);
            curX += random(options.xChangeMin, options.xChangeMax);
            vertex(curX, curY);
            if (trees) {
                treePoints.push(createVector(prevX, prevY));
            }
        }
        vertex(width, height);
        endShape(CLOSE);
        for (let point of treePoints) {
            let treeWidth = random(15, 30);
            triangle(point.x - treeWidth/2, point.y + 10, point.x, point.y - 30, point.x + treeWidth/2, point.y + 10);
        }
    }
}
function keyPressed() {
    if (keyCode === 32) {
        generateMountains();
    }
}