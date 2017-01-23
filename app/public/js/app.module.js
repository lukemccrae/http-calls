(function() {
    'use strict';

    angular.module('app')
        .component('expenses', {
            controller: controller,
            templateUrl: './template.html'
        })
    const vm = this

    function controller($http) {
        controller.$inject = ['$http']
        vm.$onInit = function() {
            console.log("hi");
            $http.get('/api/expenses').then(function(response) {
                vm.things = response.data
                console.log(vm.things);
                console.log(response);
            })
        }
    }

}());
