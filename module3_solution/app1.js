(function() {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
      var Ctrl = this;
      Ctrl.showItems = function(Ctrl.searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(Ctrl.searchTerm);
      promise.then(function(response) {
        Ctrl.found = response;
      })
      .catch(function(error) {
        console.log("Something's wrong!");
      })
      }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;

      service.getMatchedMenuItems = function(searchTerm) {
        var response = $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        }).then(function(result){
          var foundItems = [];
          var allItems = result.data.menu_items;
          for (var i = 0; i < allItems.length; i++) {
            var item = allItems[i].description;
            if (item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              foundItems.push(item);
            }
          }
          return foundItems;
        });
        return response;
      }
    }
})();
