// Get the total-downloads element
var totalDownloads = document.getElementById('total-downloads');
// Grab the json from https://raw.githubusercontent.com/UltrusBot/DownloadCounter/main/out/ultrusbot.json and parse it
fetch('https://raw.githubusercontent.com/UltrusBot/DownloadCounter/main/out/ultrusbot.json')
    .then(response => response.json())
    .then(data => {
        // Set the total-downloads element's innerHTML to the total downloads
        let total = 0;
        for (let mod in data) {
            total += data[mod];
        }
        totalDownloads.innerHTML = total.toLocaleString();
    }
);