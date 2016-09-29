# Controller top - no function hoisting
translateController = ($scope, $http)->
    vm = @
    vm.languages = null

    vm.selection = 0
    vm.firstLanguage = 'test'
    vm.mainLanguage = ''
    vm.secondLanguage = ''

    # Get data from json file
    $http
    .get('data.json')
    .then (data)->
        vm.languages = data['data']
        assignSelection(vm.languages, 0)
        return

    # Function to assign languages based on selection
    assignSelection = (languages, selection) ->
        if !_.isEmpty(languages)
            vm.mainLanguage = languages[selection]['English']
            vm.firstLanguage = languages[selection]['French']
            vm.secondLanguage = languages[selection]['German']
        return

    return


angular
.module('translateApp')
.controller('translateController', ['$scope', '$http', translateController])

