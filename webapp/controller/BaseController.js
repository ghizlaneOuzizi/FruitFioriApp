sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'algo/fiori/util/formatter'
], function(Controller, Formatter) {
    'use strict';
    return Controller.extend("algo.fiori.controller.BaseController",{
     //reusable variable
     formatter : Formatter,
     ghizlane: 3.14,
     myReuseFunction: function(){
        alert("this my reuse function")
     },
     onview:null,
     onInit: function(){
        this.oview=this.getView()
    },
    });
    
});