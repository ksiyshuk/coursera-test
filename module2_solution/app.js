(function(){
  'use strict';

  angular.module("ShoppingListCheckoff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckoffService", ShoppingListCheckoffService);

  ToBuyController.$inject = ["ShoppingListCheckoffService"];
  function ToBuyController(ShoppingListCheckoffService) {
    var buyCtrl = this;
    buyCtrl.toBuy = ShoppingListCheckoffService.gettoBuyItems();
    
    buyCtrl.makePurchase = function(itemIndex){
      ShoppingListCheckoffService.makePurchase(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckoffService"];
  function AlreadyBoughtController(ShoppingListCheckoffService) {
    var boughtCtrl = this;
    boughtCtrl.bought = ShoppingListCheckoffService.getboughtItems();

  }

  function ShoppingListCheckoffService() {
    var service = this;
    var toBuyItems = [{name: "apples", quantity: 5},
                      {name: "bananas", quantity: 3},
                      {name: "melons", quantity: 2},
                      {name: "kiwis", quantity: 7},
                      {name: "pomegranates", quantity: 4}];
    var boughtItems = [];

    service.makePurchase = function(itemIndex) {
      boughtItems.push(toBuyItems[itemIndex]);
      toBuyItems.splice(itemIndex, 1);
    };

    service.gettoBuyItems = function() {
      return toBuyItems;
    };

    service.getboughtItems = function() {
      return boughtItems;
    };
  }

})();
