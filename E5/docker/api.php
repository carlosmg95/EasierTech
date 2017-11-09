<?php

echo '<h1>There isn\'t a web version</h1>';

// Se recogen los parametros enviados en la peticion POST
$n = $_POST['n'];
$value = $_POST['value'];
$user = $_POST['user'];
$status = $_POST['status'];
$token = $_POST['token'];

// Se ejecuta el programa en Python que envia el mensaje
shell_exec('python api.py ' . $n . ' \'' . $value . '\' ' . $user . ' ' . $status . ' ' . $token);

?>