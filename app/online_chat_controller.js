(function() {

    angular
        .module('chatApp')
        .controller('ChatController', ['$mdBottomSheet', ChatController]);

    function ChatController($mdBottomSheet) {

        var vm = this;

        vm.chats = [
            { name: 'Darrel Royston', comment: 'Hey guys sup?', image: 'assets/images/01.jpeg', time: '1:22 PM', color: '#6688AA', online: true },
            { name: 'Dominica Oelke', comment: 'looks good', image: 'assets/images/02.jpeg', time: '2:17 PM', color: '#3E6677', online: false },
            { name: 'Sabra Vassell', comment: 'Nice looking', image: 'assets/images/03.jpg', time: '2:34 PM', color: '#879996', online: false },
            { name: 'Vincenzo Messina', comment: 'neat!', image: 'assets/images/04.jpg', time: '2:35 PM', color: '#FFDDBB', online: true },
            { name: 'Lilly Sallis', comment: 'cool!', image: 'assets/images/05.jpg', time: '3:12 PM', color: '#5D9647', online: false },
            { name: 'Austin Brocious', comment: 'Top, angular material stuff', image: 'assets/images/06.jpeg', time: '4:00 PM', color: '#CC4ECC', online: true },
        ];

    }

})();
