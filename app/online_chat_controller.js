(function() {

    angular
        .module('chatApp')
        .controller('ChatController', ['$mdBottomSheet', '$scope', ChatController]);

    function ChatController($mdBottomSheet, $scope) {

        var vm = this;

        vm.chats = [
            { username: 'Darrel Royston', message: 'Hey guys sup?', image: 'assets/images/01.jpeg', time: '1:22 PM', color: '#6688AA', online: true },
            { username: 'Dominica Oelke', message: 'looks good', image: 'assets/images/02.jpeg', time: '2:17 PM', color: '#3E6677', online: false },
            { username: 'Sabra Vassell', message: 'Nice looking', image: 'assets/images/03.jpg', time: '2:34 PM', color: '#879996', online: false },
            { username: 'Vincenzo Messina', message: 'neat!', image: 'assets/images/04.jpg', time: '2:35 PM', color: '#FFDDBB', online: true },
            { username: 'Lilly Sallis', message: 'cool!', image: 'assets/images/05.jpg', time: '3:12 PM', color: '#5D9647', online: false },
            { username: 'Austin Brocious', message: 'Top, angular material stuff', image: 'assets/images/06.jpeg', time: '4:00 PM', color: '#CC4ECC', online: true },
        ];

        // Use of random images and colors
        var listOfImages = ['assets/images/01.jpeg', 'assets/images/02.jpeg', 'assets/images/03.jpg', 'assets/images/04.jpg', 'assets/images/05.jpg', 'assets/images/06.jpeg', 'assets/images/07.jpg', 'assets/images/08.jpg', 'assets/images/09.jpg', 'assets/images/10.jpg', 'assets/images/11.jpg', 'assets/images/12.jpeg', 'assets/images/13.jpeg', 'assets/images/14.jpeg'];
        var listOfColors = ['#6688AA', '#3E6677', '#879996', '#FFDDBB', '#5D9647', '#CC4ECC', '#c2cbc6', '#6084be', '#145fbc', '#cfd2a4', '#bba8bc'];

        // TODO: remove variable and forEach below
        vm.numberUsersOnline = 0;

        vm.chats.forEach(function(value) {
            if (value.online) {
                vm.numberUsersOnline++;
            }
        });

        // Declare socket io
        var socket = io.connect('http://192.168.1.111:3000');

        // Chat name
        vm.username = '';

        // Typed message
        vm.message = '';

        // Number of people online
        vm.numberUsersOnline = 0;

        // Welcome Message
        vm.welcome = 'Welcome';

        // List of online clients
        vm.listOnlineClients = [];

        var chatName = 'Enter User Name...';
        var typeMessage = 'Type Message...';

        var typing = false;
        var timeout = null;

        vm.hasUserName = false;
        vm.placeholder = chatName;

        vm.clientsTyping = [];

        // Connected local Client Object - socketId, username, image, icon
        vm.connectedClient = {};
        // List of Messages history
        vm.listOfMessages = [];

        // Store username in local storage
        if (localStorage.getItem('chat.username')) {

            vm.username = localStorage.getItem('chat.username');
            vm.connectedClient.socketId = socket.id;
            vm.connectedClient.image = localStorage.getItem('chat.image');
            vm.connectedClient.color = localStorage.getItem('chat.color');

            vm.hasUserName = true;
            vm.placeholder = typeMessage;

            // Update welcome message
            vm.welcome = vm.username;

            // Update client connected
            // assignPersonality(listOfImages, listOfColors, vm.connectedClient, socket.id, vm.username, true);

            // Emit connected to server
            socket.emit('connected', vm.username);

        }

        // On submit
        vm.submit = function() {

            // if nothing is inputted, return
            if (_.isEmpty(vm.message)) {
                return;
            }

            // if first time, enter chatName
            if (!vm.hasUserName) {

                vm.hasUserName = true;
                vm.username = vm.message;
                vm.welcome = vm.username;

                vm.placeholder = typeMessage;
                // Update client connected
                vm.connectedClient = assignPersonality(listOfImages, listOfColors, socket.id, vm.username, true);

                localStorage.setItem('chat.username', vm.username);
                localStorage.setItem('chat.image', vm.connectedClient.image);
                localStorage.setItem('chat.color', vm.connectedClient.color);

                // Once client has username, officially connected to socket server
                socket.emit('connected', vm.username);

            } else if (vm.hasUserName) {
                socket.emit('chat message', {
                    username: vm.username,
                    message: vm.message,
                    time: _.now(),
                    image: vm.connectedClient.image,
                    color: vm.connectedClient.color,
                    online: true
                });
            } // end if

            vm.message = '';
            return false;
        }; // end vm.submit

        // Check who is online
        socket.emit('who online', { username: vm.username });

        socket.on('online', function(msg) {

            // Get number of clients connected and update view
            vm.listOnlineClients = msg.clients;
            $scope.$apply();
        });

        // When received message
        socket.on('chat message', function(msg) {
            // console.log('received emit');
            // $('#messages').append($('<li>').text(msg));
            console.log('chat message - msg: ', msg);
            vm.chats.push(msg);
            $scope.$apply('vm.chats');
        });

        // Detect when tab/window is going to close
        window.onbeforeunload = function() {
            socket.emit('disconnect', { username: vm.username });
        };

        // Received all previous messages in the group chat
        socket.on('messages', function(msg) {
            // if message is not empty and user has entered user name
            if (msg !== null && msg !== '') {

                // Parse string to array
                msg = JSON.parse(msg);

                if (msg.length > 0) {
                    msg.forEach(function(message) {
                        // $('#messages').append($('<li>').text(message));
                    });
                }
            }
        }); // end socket.on messages

        // Detect user typing on and shows
        // show typing no longer 
        function timeoutFunction() {
            typing = false;
            socket.emit('typingStop', { socketId: socket.id, username: vm.username });
        }

        // Emits typing whenever user types a key
        vm.onKeyDownNotEnter = function(keyEvent) {

            // if not yet login, do not show typing
            if (!vm.hasUserName) {
                return;
            }

            // if vm.message only 1 and escape is pressed, send stop typing
            if (vm.message.length <= 1 && keyEvent.keyCode === 8) {
                timeoutFunction();
                return;
            }

            // if Enter key is pressed, launch timeout directly
            if (keyEvent.keyCode === 13) {
                timeoutFunction();
                // $('.' + $scope.username).remove();
                typing = false;
                return;
            }
            // if typing false
            if (!typing) {
                typing = true;
                socket.emit('typing', { socketId: socket.id, username: vm.username });
                timeout = setTimeout(timeoutFunction, 5000);
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(timeoutFunction, 5000);
            }
        };

        // On user typing
        socket.on('is typing', function(msg) {

            // If message is not empty
            if (!_.isEmpty(msg)) {
                // Check if msg with socket and username not already exist
                // vm.clientsTyping = msg;
                addClientTyping(vm.clientsTyping, msg);
                $scope.$apply('vm.clientsTyping');
                console.log('vm.clientsTyping:', JSON.stringify(vm.clientsTyping));
            }

        });

        // On user stop typing
        socket.on('stop typing', function(msg) {
            try {
                removeClientTyping(vm.clientsTyping, msg);
                $scope.$apply('vm.clientsTyping');
            } catch (exception) {}
        });

        // Check if object is already present before adding
        function addClientTyping(clients, client) {

            var contains = false;

            // Check if value already exists
            _.forEach(clients, function(c) {
                if (c === client) {
                    contains = true;
                }
            });

            // Add value if clients list is empty
            if (clients.length === 0 || contains) {
                clients.push(client);
            }

        } // end addClientTyping

        // Remove client from clients typing list
        function removeClientTyping(clients, client) {
            return _.remove(clients, client);
        } // end removeClient

        // Assign (random) image and color
        function assignPersonality(listOfImages, listOfColors, socketId, username, online) {

            var image = _.random(0, listOfImages.length - 1);
            var color = _.random(0, listOfColors.length - 1);

            var client = {
                socketId: socketId,
                username: username,
                image: listOfImages[image],
                color: listOfColors[color],
                online: online
            };

            return client;
        } // end assignPersonality

    } // end function ChatController

})();
