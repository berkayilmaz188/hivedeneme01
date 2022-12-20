import React from 'react';
import SockJS from 'socketjs-client';
import {over} from 'stompjs';

function Chat () {
    var stompClient = null;
    var baseAddress = 'http://localhost:8080';

    function setConnected(connected) {
        document.getElementById('connect').disabled = connected;
        document.getElementById('disconnect').disabled = !connected;
        document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
        document.getElementById('response').innerHTML = '';
    }

    function connect() {
        var socket = new SockJS(baseAddress + '/chat');
        stompClient = over(socket);
        stompClient.connect({}, function(frame) {
            setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic', function (message) {
                handleReceivedMessage(JSON.parse(message.body));
            });
        });
    }

    function disconnect() {
        if(stompClient != null) {
            stompClient.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    }

    function sendMessage() {
        var from = document.getElementById('from').value;
        var text = document.getElementById('text').value;
        stompClient.send("/chat", {},
            JSON.stringify({'sender':from, 'message':text}));
    }

    function handleReceivedMessage(message) {
        var response = document.getElementById('response');
        var p = document.createElement('p');
        p.style.wordWrap = 'break-word';
        p.appendChild(document.createTextNode(message.sender + ": " + message.message ));
        response.appendChild(p);
    }
    return (
        <html>
<head>
    <title>Chat WebSocket</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.js"></script>
    <script type="text/javascript">

    </script>
</head>
<body onload="disconnect()">
<div>
    <div>
        <input type="text" id="from" placeholder="Kullanici Adi"/>
    </div>
    <br />
    <div>
        <button id="connect" onClick= {() => connect()}>Baglan</button>
        <button id="disconnect" disabled="disabled" onClick= {() => disconnect()}>
            Cikis
        </button>
    </div>
    <br />
    <div id="conversationDiv">
        <input type="text" id="text" placeholder="Mesaj.."/>
        <button id="sendMessage" onClick= {() => sendMessage()}>Send</button>
        <p id="response"></p>
    </div>
</div>

</body>
</html>
    )
}
export default Chat;