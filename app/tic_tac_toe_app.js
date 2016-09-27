angular
    .module('ticTacToeApp', ['ngMaterial'])
    .run(function($log) {
        $log.debug("starterApp + ngMaterial running... Tic Tac Toe");
    });
