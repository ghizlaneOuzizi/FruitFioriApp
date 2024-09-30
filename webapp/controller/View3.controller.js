sap.ui.define([
    'algo/fiori/Controller/BaseController',
    'sap/ui/core/routing/History'
], function(BaseController, History) {
    return BaseController.extend("algo.fiori.controller.View3",{
     //reusable variable
     onInit: function(){
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("supplier").attachMatched(this.herculis.bind(this));
     },
     herculis : function (oEvent) {
        var suppId = oEvent.getParameter("arguments").suppId;
        var sPath = "/suppliers/" + suppId;
        this.getView().bindElement(sPath);
     },
    //  onGoBack: function(){
    //     var oAppCon= this.getView().getParent();
    //      oAppCon.to("idView1");
    //  },
    onGoBack: function() {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if(sPreviousHash !== undefined){
            window.history.go(-1);
        }else{
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail",{idFruit: 0},true);
        }
     }
    });
    
});