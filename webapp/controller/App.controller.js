sap.ui.define([
    'algo/fiori/controller/BaseController'
], function(BaseController) {
    return BaseController.extend("algo.fiori.controller.App", {
       onInit: function(){
          BaseController.prototype.onInit.apply(this)
       }
    });
});