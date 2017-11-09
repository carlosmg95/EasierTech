#!/usr/bin/python
import requests
import json
import sys

# Definimos la URL
url = 'https://fcm.googleapis.com/fcm/send'

# Definimos la cabecera y el diccionario con los datos
cabecera = {'Content-type': 'application/json', 'Authorization' : 'key=AIzaSyCIzQFr93iitBFootG626TE9fIBl2kml_4'};

# Se define el destino del mensaje
if (sys.argv[3] == 'admin'):  # Si el mensaje es para un admin:
    to = '/topics/' + sys.argv[3]  # El destino son todos los usuarios registrados en el topic 'admin'
else:  # Si no:
    to = '/' + sys.argv[5]  # El destino es un usuario concreto

data = {
  'notification': {
    'title': 'New update',  # Titulo del mensaje push
    'body': 'There is a new update.',  # Cuerpo del mensaje cuando se abre
    'sound': 'default',
    'click_action': 'FCM_PLUGIN_ACTIVITY',
    'icon': 'fcm_push_icon'
  },
  'data': {  # Datos de la sugerencia que va en el mensaje
    'n': sys.argv[1],  # ID de la sugerencia
    'sug': sys.argv[2],  # Sugerencia
    'status': sys.argv[4],  # Estado: 'Waiting', 'Accept' o 'Deny'
    'token': sys.argv[5]  # Token unico del usuario
  },
    'to': to,
    'priority': 'high',
    'restricted_package_name': ''
}

# Se envia la peticion post a Firebase que luego enviara en mensaje a la app
solicitud = requests.post(url, headers = cabecera, data = json.dumps(data))
if solicitud.status_code == 200:
    print solicitud.text