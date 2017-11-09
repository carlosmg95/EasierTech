/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    onDeviceReady: function() {
        var storage = window.localStorage;

        // Se inscribe en el topic asociado al usuario
        if (storage.user && storage.getItem('user') === 'admin') {
            FCMPlugin.unsubscribeFromTopic('client');
            FCMPlugin.subscribeToTopic('admin');
        } else if (storage.user && storage.getItem('user') === 'client') {
            FCMPlugin.unsubscribeFromTopic('admin');
            FCMPlugin.subscribeToTopic('client');
        }

        //FCMPlugin.getToken( successCallback(token), errorCallback(err) );
        //Keep in mind the function will return null if the token has not been established yet.
        FCMPlugin.getToken(function(token){
            console.log('Token: ' + token);
            storage.setItem('token', token);
        });

        this.pushNotification();
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    },
    pushNotification: function() {
        FCMPlugin.onNotification(function(data){
            if(!data.wasTapped){
                alert('New message');
            }
            var db = window.openDatabase('mydb', '1.0', 'DataBase', 2 * 1024 * 1024);
            if (data.status === 'waiting') {
                db.transaction(function (tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS ADMIN (id unique, sug, status, token)');
                    tx.executeSql(
                        'INSERT INTO ADMIN (id, sug, status, token) VALUES (' + data.n + ', "' + data.sug + '", "waiting", "' + data.token + '")',
                        [],
                        function(tx, result) {
                            location.reload(true);
                        }
                    );
                });
            } else {
                var storage = window.localStorage;
                db.transaction(function (tx) {
                    if (storage.getItem('user') === 'client') {
                        tx.executeSql(
                            'UPDATE SUGGESTIONS SET status="' + data.status + '" WHERE id=' + data.n,
                            [],
                            function(tx, result) {
                                location.reload(true);
                            }
                        );
                    } else if (storage.getItem('user') === 'admin') {
                        tx.executeSql(
                            'UPDATE ADMIN SET status="' + data.status + '" WHERE id=' + data.n,
                            [],
                            function(tx, result) {
                                location.reload(true);
                            }
                        );
                    }
                });
            }
        });
    }
    // Code based in https://devmerz.github.io/notificaciones-push-android-apache-cordova-fcm
};

app.initialize();