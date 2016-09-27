(function () {

    angular
        .module('ticTacToeApp')
        .controller('ticTacToeController', ['$mdBottomSheet', '$scope', '$mdSidenav', ticTacToeController]);

    function ticTacToeController($mdBottomSheet, $scope, $mdSidenav) {
        
        var vm = this;

        vm.listOfRectangles = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];


    } // end function ticTacToeController

})();
