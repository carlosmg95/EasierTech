# Exercise 1

#Web:
```
https://carlosmg95.neocities.org/easierTech/introduction
```

# Exercise 2

#Webs:
```
Front-end: https://carlosmg95.neocities.org/easierTech/playedSongs
Back-end: https://songs-played.herokuapp.com
```

#Design documents for part 3:
```
Una manera de actualizar la página cada vez que alguien sube una nueva canción es mediante un sistema de notificaciones, así, cada vez que alguien sube una canción al servidor, éste le envía una notificación a los navegadores y éstos recargan la página.
```

# Exercise 5

#Instructions:
```
El motor de notificaciones está subido en Heroku que se conecta con Firebase de Google, por lo que no hace falta hacer nada con esta parte para que funcione. Sólo hay que descargar el archivo APK e instalarlo.
La primera pantalla que aparece deja al usuario loguearse, al ser un prototipo hay dos botones para loguearse como "Admin" o como "Client".
Si el usuario se loguea como cliente le aparecerá una pantalla con varios botones: "enviar petición", "comprobar tus peticiones" y "desloguearse". La pantalla de "enviar petición" muestra un campo de texto donde escribir y un botón para enviar, al enviar se muestra un diálogo que te deja volver atrás o escribir otra petición. Esta petición sólo llega a los usuarios registrados como "Admin".
En la pantalla de comprobar peticiones aparecen todas las peticiones hechas por el usuario marcadas con un código de colores según su estado: amarillo->esperando, verde->aceptada y rojo->denegada.
En la pantalla del admin aparecen las peticiones en estado de espera junto a dos botones para aceptarla o denegarla. Cuando el admin responde a una petición le envía un mensaje al usuario que escribió la petición y al resto de admins para que se borre de su base de datos.
```
