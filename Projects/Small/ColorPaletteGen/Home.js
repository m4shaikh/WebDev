let introCard = document.getElementById('intro-card')
let colorCard = document.getElementById('color-card')
let selectCount = document.getElementById('color-count-selector')
let colorContent = document.getElementById('color-content')
let colors = []
let count 
function generate() {

    introCard.style.display = 'none'
    colorCard.style.display = 'block'
    count = selectCount.value

    generateColors()
}

function generateColors() {

    let h = Math.random()
    let goldenRatio = 0.6180339887;

    for (let i = 0; i < count; i++) {
        h = (h + goldenRatio) % 1;
        colors.push(hsvToHex(h, 0.4, 0.90))
    }

    for (let i = 0; i < count; i++) {
        let color = document.createElement('div');
        color.id = `color-container`
        color.className = "chiled"
        color.innerHTML = `<div id='color${i}'class='colors'></div>
                           <div class="color-code" id = '${i}' onclick='copyColor(this.id)'>
                            <span>${colors[i]}</span>
                            <span> <img width="16" height="16" src="https://img.icons8.com/ios-glyphs/30/copy.png" alt="copy"/></span>
                           </div>`

        colorContent.appendChild(color)
    }
    for (let i = 0; i < count; i++) {
        document.getElementById(`color${i}`).style.background = `${colors[i]}`

    }

}

function regenerate(){
    colorContent.innerHTML = ""
    colors = []
    let h = Math.random()
    let goldenRatio = 0.6180339887;

    for (let i = 0; i < count; i++) {
        h = (h + goldenRatio) % 1;
        colors.push(hsvToHex(h, 0.4, 0.90))
    }

    for (let i = 0; i < count; i++) {
        let color = document.createElement('div');
        color.id = `color-container`
        color.innerHTML = `<div id='color${i}'class='colors'></div>
                           <div class="color-code" id = '${i}' onclick='copyColor(this.id)'>
                            <span>${colors[i]}</span>
                            <span> <img width="16" height="16" src="https://img.icons8.com/ios-glyphs/30/copy.png" alt="copy"/></span>
                           </div>`

        colorContent.appendChild(color)
    }
    for (let i = 0; i < count; i++) {
        document.getElementById(`color${i}`).style.background = `${colors[i]}`

    }
}


function copyColor(i) {
    navigator.clipboard.writeText(colors[i])
 
}

function hsvToHex(hue, saturation, value) {

    // Step 1: convert hue to sector (0–5)
    let sector = Math.floor(hue * 6);

    // Step 2: position inside the sector
    let fraction = hue * 6 - sector;

    // Step 3: intermediate values
    let p = value * (1 - saturation);
    let q = value * (1 - fraction * saturation);
    let t = value * (1 - (1 - fraction) * saturation);

    let red, green, blue;

    // Step 4: assign RGB based on sector
    switch (sector % 6) {
        case 0: red = value; green = t; blue = p; break;
        case 1: red = q; green = value; blue = p; break;
        case 2: red = p; green = value; blue = t; break;
        case 3: red = p; green = q; blue = value; break;
        case 4: red = t; green = p; blue = value; break;
        case 5: red = value; green = p; blue = q; break;
    }

    // Step 5: convert to 0–255
    red = Math.round(red * 255);
    green = Math.round(green * 255);
    blue = Math.round(blue * 255);

    // Step 6: convert to HEX
    return "#" + [red, green, blue]
        .map(num => num.toString(16).padStart(2, "0"))
        .join("");
}