// Funkcija, kuri inicializuoja žemėlapio rodymą
function initMap() {
    let latitude = null; // Inicializuojama kintamąjį latitude, kuris vėliau bus naudojamas rodyti vartotojo koordinates
    let longitude = null; // Inicializuojama kintamąjį longitude, kuris vėliau bus naudojamas rodyti vartotojo koordinates
    // Kartotinai vykdomas kodas kas 10 sekundžių
    setInterval(() => {
        if (navigator.geolocation) { // Tikrinama ar naršyklė palaiko geolokacijos funkcijas
            navigator.geolocation.getCurrentPosition((position) => { // Gaunamos vartotojo koordinatės
                latitude = position.coords.latitude; // Išsaugomos vartotojo koordinatės
                longitude = position.coords.longitude; // Išsaugomos vartotojo koordinatės

                // URL žemėlapio iframe konstravimas su žemėlapio išmatavimais, žymekliu ir geografinėmis koordinatėmis
                const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.001},${latitude - 0.001},${longitude + 0.001},${latitude + 0.001}&amp;layer=mapnik&amp;marker=${latitude},${longitude}`;

                // Sukuriamas naujas iframe elementas, kuriame bus rodomas žemėlapis
                const mapFrame = document.createElement('iframe');
                mapFrame.setAttribute('src', mapUrl); // Nurodomas iframe URL
                mapFrame.setAttribute('width', '100%'); // Nurodoma iframe plotis
                mapFrame.setAttribute('height', '300px'); // Nurodoma iframe aukštis
                mapFrame.setAttribute('frameborder', '0'); // Nurodomas rėmelio stilius
                mapFrame.setAttribute('scrolling', 'no'); // Nurodomas slinkimo stilius

                // Ieškoma HTML elementas su id 'map' ir išvalomas jo turinys
                const mapDiv = document.getElementById('map');
                mapDiv.innerHTML = '';

                // Sukuriamas naujas div elementas, kuriame bus rodomas žemėlapis ir žymeklis
                const wrapperDiv = document.createElement('div');
                wrapperDiv.setAttribute('style', 'position: relative; width: 100%; height: 300px;');
                mapDiv.appendChild(wrapperDiv);

                wrapperDiv.appendChild(mapFrame); // Pridedamas žemėlapis

                // Sukuriamas naujas div elementas, kuriame bus rodomas žymeklis
                const markerDiv = document.createElement('div');
                markerDiv.setAttribute('style', 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; border-radius: 50%; background-color: blue; z-index: 1;');

                // Sukuriamas naujas div elementas, kuriame bus rodomas žymeklio apvadas
                const markerWrapperDiv = document.createElement('div');
                //uždedama žyma žemėlapio centre  
                markerWrapperDiv.setAttribute('style', 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.5); z-index: 0;');

                wrapperDiv.appendChild(markerDiv);
                wrapperDiv.appendChild(markerWrapperDiv);

            });
        }
        // kas 10 sek perkraunam
    }, 10000);
}

window.onload = function () {
    initMap();
};
//kviečiame funkciją žemėlapiui
initMap();