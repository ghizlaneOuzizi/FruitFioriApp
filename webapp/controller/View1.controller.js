sap.ui.define([
    'algo/fiori/Controller/BaseController',
    'sap/m/MessageBox',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, MessageBox, Filter, FilterOperator) {
    return BaseController.extend("algo.fiori.controller.View1",{
     //reusable variable
    onInit: function(){
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("detail").attachMatched(this.herculis.bind(this));
     },
     herculis : function (oEvent) {
        var idFruit = oEvent.getParameter("arguments").idFruit;
        var sPath = "/fruit/"+idFruit;
        var oList = this.getView().byId("idList");
        var aItems = oList.getItems();
        for(let i=0; i<aItems.length; i++){
            const element = aItems[i];
            var sItemPath=element.getBindingContextPath();
            if(sItemPath === sPath){
                oList.setSelectedItem(sPath);
                return;
            }
        }

     },
    onGoTo: function(sIndex){
        this.oRouter.navTo("detail",{
            idFruit:sIndex
        })
    //    var oAppCon= this.getView().getParent();
    //    oAppCon.to("idView2")
    },
    onItemPress: function(oEvent) {
        var oSelectedItem = oEvent.getParameter("listItem");
        var sPath = oSelectedItem.getBindingContextPath();
        // var oView2 = this.getView().getParent().getParent().getDetailPages()[0];
        // oView2.bindElement(sPath);
 
        var sIndex= sPath.split("/")[sPath.split("/").length-1];
        this.onGoTo(sIndex); 
    },
    onItemDelet: function(oEvent) {
       var onItemToBeDeleted = oEvent.getParameter("listItem");
       var oList = oEvent.getSource();
       oList.removeItem(onItemToBeDeleted);
    },
    onItemsDelete : function() {
       var oList = this.getView().byId("idList");
       var aSelItems = oList.getSelectedItems();
       for(let i = 0 ; i < aSelItems.length; i++){
            const element = aSelItems[i];
            oList.removeItem(element);
       }
    },
    onSearch : function (oEvent) {
        var sVal = oEvent.getParameter("query");
        var oFilter = new Filter("name", FilterOperator.Contains, sVal);
        var oFiltercol = new Filter("color", FilterOperator.Contains, sVal);
        var aFilter = [oFilter,oFiltercol];
        var oFilterMain =  new Filter({
            filters: aFilter,
            and: false
        });
        var oBinding = this.getView().byId("idList").getBinding("items");
        oBinding.filter(oFilterMain);   
    }
    });
    
});