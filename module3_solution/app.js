(function() {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        restrict: 'E',
        scope: {
          foundItems: '<',
          myTitle: '@title',
          onRemove: '&'
        }
      };
      return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
      var Ctrl = this;
      var origTitle = " Match(es) Found"
      Ctrl.showResult = function() {
        if (Ctrl.searchTerm === undefined || Ctrl.searchTerm.trim() === "") {
          Ctrl.found = [];
          return;
        }
        MenuSearchService.getMatchedMenuItems(Ctrl.searchTerm)
        .then(function(response) {
          Ctrl.found = response;
          Ctrl.title = Ctrl.found.length + origTitle;
        })
        .catch(function(error) {
          console.log("Something went wrong...");
        })
      }

      Ctrl.removeItem = function(itemIndex) {
        Ctrl.found.splice(itemIndex, 1);
        Ctrl.title = Ctrl.found.length + origTitle;
      };

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;

      service.getMatchedMenuItems = function(searchTerm) {
        return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        }).then(function(response){
          var foundItems = [];
          var allItems = response.data.menu_items;
          for (var i = 0; i < allItems.length; i++) {
            var item = allItems[i].description;
            if (item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              foundItems.push(allItems[i]);
            }
          }
          return foundItems;
        });
      }
    }
})();
