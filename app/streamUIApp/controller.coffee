### Define Controller ###
streamUIController = ($scope) ->
    vm = @
    vm.icons = ['../assets/svg/account.svg', '../assets/svg/hangouts.svg', '../assets/svg/menu.svg']

    return

angular
.module('streamUIApp')
.controller('streamUIController', ['$scope', streamUIController])
