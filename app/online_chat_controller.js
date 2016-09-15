(function() {

    angular
        .module('chatApp')
        .controller('ChatController', ['$mdBottomSheet', '$scope', ChatController]);

    function ChatController($mdBottomSheet, $scope) {

        var vm = this;

        vm.chats = [
            { name: 'Darrel Royston', comment: 'Hey guys sup?', image: 'assets/images/01.jpeg', time: '1:22 PM', color: '#6688AA', online: true },
            { name: 'Dominica Oelke', comment: 'looks good', image: 'assets/images/02.jpeg', time: '2:17 PM', color: '#3E6677', online: false },
            { name: 'Sabra Vassell', comment: 'Nice looking', image: 'assets/images/03.jpg', time: '2:34 PM', color: '#879996', online: false },
            { name: 'Vincenzo Messina', comment: 'neat!', image: 'assets/images/04.jpg', time: '2:35 PM', color: '#FFDDBB', online: true },
            { name: 'Lilly Sallis', comment: 'cool!', image: 'assets/images/05.jpg', time: '3:12 PM', color: '#5D9647', online: false },
            { name: 'Austin Brocious', comment: 'Top, angular material stuff', image: 'assets/images/06.jpeg', time: '4:00 PM', color: '#CC4ECC', online: true },
        ];

        vm.numberUsersOnline = 0;

        vm.chats.forEach(function(value) {
            if (value.online) {
                vm.numberUsersOnline++;
            }
        });

        // Declare socket io
        var socket = io.connect('http://192.168.1.112:3000');

        // Chat name
        vm.username = '';

        // Typed message
        vm.message = '';

        // Number of people online
        vm.numberUsersOnline = 0;

        // Welcome Message
        vm.welcome = 'Welcome';

        var chatName = 'Enter User Name...';
        var typeMessage = 'Type Message...';

        var typing = false;
        var timeout = null;

        vm.hasUserName = false;
        vm.placeholder = chatName;

        // Store username in local storage
        if (localStorage.getItem('chat.username')) {
            vm.username = localStorage.getItem('chat.username');
            vm.hasUserName = true;
            vm.placeholder = typeMessage;

            // Update welcome message
            vm.welcome = vm.username;
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
                localStorage.setItem('chat.username', vm.username);

                // Once client has username, officially connected to socket server
                socket.emit('connected', vm.username);

            } else if (vm.hasUserName) {
                socket.emit('chat message', {
                    username: vm.username,
                    message: vm.message
                });
            } // end if

            vm.message = '';
            return false;
        }; // end vm.submit

        // Check who is online
        socket.emit('who online', { username: vm.username });
        socket.on('online', function(msg) {

            // Get number of clients connected and update view
            vm.numberUsersOnline = msg.clientsOnline;
            $scope.$apply('vm.numberUsersOnline');
        });

        // When received message
        socket.on('chat message', function(msg) {
            // console.log('received emit');
            // $('#messages').append($('<li>').text(msg));
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
            socket.emit('typingStop', { username: vm.username });
        }

        // Emits typing whenever user types a key
        vm.onKeyDownNotEnter = function(keyEvent) {
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
                socket.emit('typing', { username: vm.username });
                timeout = setTimeout(timeoutFunction, 5000);
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(timeoutFunction, 5000);
            }
        };

        // On user typing
        socket.on('is typing', function(msg) {
            if (msg !== '' && msg !== vm.username) {
                // $('#whoIsTyping').append($('<li class="' + msg + '">').text(msg + ' is typing...'));
            }

        });

        // On user stop typing
        socket.on('stop typing', function(msg) {
            try {
                // $('.' + msg).remove();
            } catch (exception) {}
        });

    } // end function ChatController

})();
