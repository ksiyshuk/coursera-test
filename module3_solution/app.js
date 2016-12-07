(function() {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    function FoundItems() {
      var ddo = {
        templateUrl: 'foundItems.html',
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
      var origTitle = "Items found: "
      Ctrl.showItems = function() {
        var promise = MenuSearchService.getMatchedMenuItems(Ctrl.searchTerm);
        promise.then(function(response) {
          Ctrl.found = response;
          Ctrl.title = origTitle + Ctrl.found.length;
        })
        .catch(function(error) {
          console.log("Something's wrong!");
        })
      }
      Ctrl.removeItem = function(itemIndex) {
        Ctrl.found.splice(itemIndex, 1);
        Ctrl.title = origTitle + Ctrl.found.length;
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
