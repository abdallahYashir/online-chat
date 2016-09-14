(function(){

    angular
        .module('chatApp')
        .controller('ChatController', ['$mdBottomSheet', ChatController]);

        function ChatController($mdBottomSheet) {

            var vm = this;

            vm.chats = [
                {name: 'Darrel Royston', comment: 'Hey guys sup?', image: 'assets/images/01.jpeg', time: '1:22 PM'},
                {name: 'Dominica Oelke', comment: 'looks good', image: 'assets/images/02.jpeg', time: '2:17 PM'},
                {name: 'Sabra Vassell', comment: 'Nice looking', image: 'assets/images/03.jpg', time: '2:34 PM'},
                {name: 'Vincenzo Messina', comment: 'neat!', image: 'assets/images/04.jpg', time: '2:35 PM'},
                {name: 'Lilly Sallis', comment: 'cool!', image: 'assets/images/05.jpg', time: '3:12 PM'},
                {name: 'Austin Brocious', comment: 'Top, angular material stuff', image: 'assets/images/06.jpeg', time: '4:00 PM'},
            ];

        }

})();