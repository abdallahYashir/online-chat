### Define Controller ###
streamUIController = ($scope, $http) ->
    vm = @
    vm.icons = ['../assets/svg/account.svg', '../assets/svg/hangouts.svg', '../assets/svg/menu.svg']

    vm.streams = []

    $http.get('streams.json').then((streams) ->
        vm.streams = streams
        console.log JSON.stringify(vm.streams)
        return
    )

    return

angular
.module('streamUIApp')
.controller('streamUIController', ['$scope', '$http', streamUIController])
