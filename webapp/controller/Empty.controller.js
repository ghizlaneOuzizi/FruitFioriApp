sap.ui.define([
    'algo/fiori/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("algo.fiori.controller.Empty",{
        onInit: function() {
            BaseController.prototype.onInit.apply(this);
        }
    }

    );
    
});