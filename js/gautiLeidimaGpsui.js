// Funkcija, kuri tikrina, ar naršyklė palaiko geolokacijos funkciją
function requestGeolocationPermission() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // čia kažką galime daryti su vartotojo vietove tačiau čia dabar nieko nereikia
            },
            (error) => {
                // Parodome pranešimą prašant leidimo naudoti geolokaciją
                const alert = document.createElement('ion-alert');
                alert.header = 'Leidimas naudoti geolokaciją';
                alert.message = 'Norint naudoti vietovės funkciją, reikia leisti svetainei naudoti geolokacijos funkciją. Ar leidžiate?';
                alert.buttons = [
                    // {
                    // text: 'Atšaukti',
                    // role: 'cancel'
                    // },
                    {
                        text: 'Leisti',
                        handler: () => {
                            // prašome geolokacijos funkcijos leidimo
                            requestGeolocationPermission();
                        }
                    }
                ];
                document.body.appendChild(alert);
                alert.present();
            }
        );
    } else {
        console.log('Geolokacija nepalaikoma');
    }
}

// Iškviečiama funkcija, kuri patikrina geolokacijos leidimą
requestGeolocationPermission();