### Define Controller ###
streamUIController = ($scope, $http) ->
  vm = @
  vm.icons = ['../assets/svg/account.svg',
  '../assets/svg/hangouts.svg', '../assets/svg/menu.svg']

  vm.streams = []

  $http.get('streams.json').then((streams) ->
    vm.streams = streams.data
    return
  )

  ### Function to convert string to date ###
  vm.toDate = (string) ->
    return new Date(string)

  return

angular
.module('streamUIApp')
.controller('streamUIController', ['$scope', '$http', streamUIController])
