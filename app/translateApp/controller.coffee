### Controller top - no function hoisting ###
translateController = ($scope, $http)->
    vm = @
    vm.languages = null

    vm.selection = 0
    vm.firstLanguage = 'test'
    vm.mainLanguage = ''
    vm.secondLanguage = ''

    vm.date = _.now()

    ### Get data from json file ###
    $http
    .get('data.json')
    .then (data)->
        vm.languages = data['data']
        assignSelection(vm.languages, vm.selection)
        return

    ### Function to assign languages based on selection ###
    assignSelection = (languages, selection) ->
        if !_.isEmpty(languages)
            vm.mainLanguage = languages[selection]['English']
            vm.firstLanguage = languages[selection]['French']
            vm.secondLanguage = languages[selection]['German']
        return

    ### Function to increment selection ###
    vm.incrementSelection = () ->
        # if selection is greater than the length of languages
        if vm.selection >= vm.languages.length - 1
            vm.selection = 0
        else
            vm.selection++
        return

    ### Watch for changes in selection ###
    $scope.$watch('vm.selection', (oldValue, newValue) ->
        if oldValue isnt newValue
            assignSelection(vm.languages, newValue)
            return
    )

    return


angular
.module('translateApp')
.controller('translateController', ['$scope', '$http', translateController])

