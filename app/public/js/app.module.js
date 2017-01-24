(function() {
    'use strict';

    angular.module('app', [])
        .component('items', {
            controller: controller,
            templateUrl: './template.html'
        })


    function controller($http) {

        controller.$inject = ['$http']
        const vm = this
        vm.$onInit = function() {
            vm.getExpense()
        }

        vm.getExpense = function() {
            $http.get('/api/expenses').then(function(response) {
                vm.expenses = response.data
            })
        }

        vm.addExpense = function() {
            vm.addObj = {
                category: vm.category,
                amount: vm.amount
            }
            $http.post('/api/expenses', vm.addObj).then(function(response, error) {
                vm.$onInit();
            })
        }

        vm.updateExpenseForm = function(expense) {
            vm.updateId = expense.id;
            vm.updateCategory = expense.category;
            vm.updateAmount = expense.amount;
        }

        vm.submitUpdate = function() {
            console.log("submitUpdate()");
            vm.updateObj = {
                id: vm.updateId,
                category: vm.updateCategory,
                amount: vm.updateAmount
            }
            $http.patch(`/api/expenses/${vm.updateId}`, vm.updateObj).then(function(response, error) {
                vm.$onInit();
            })
        }

        vm.deleteExpense = function(expense) {
            $http.delete(`/api/expenses/${expense.id}`).then(function(response) {
                vm.$onInit();
            })
        };
    }
}());
