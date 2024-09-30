sap.ui.define([
    'algo/fiori/Controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, MessageBox, MessageToast, Fragment, Filter, FilterOperator) {
    return BaseController.extend("algo.fiori.controller.View2",{
     //reusable variable
     onInit: function(){
        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter.getRoute("detail").attachMatched(this.herculis.bind(this));
     },
     herculis : function (oEvent) {
        var idFruit = oEvent.getParameter("arguments").idFruit;
        var sPath = "/fruit/" + idFruit;
        this.getView().bindElement(sPath);
     },
     onGoBack: function(){
        var oAppCon= this.getView().getParent();
         oAppCon.to("idView1");
     },
     onSave:function(){
        MessageBox.confirm("Do you want to save",{
            title: "Wow",
            onClose: function(status){
                if(status ==="OK"){
                    MessageToast.show("your order has been saved"); 
                }else{
                    MessageBox.alert("canceled");  
                }
            }
        });
     },
     onCancel: function(){
        MessageBox.error("oops! action has canceled")
     },
     onSupplierSelect: function (oEvent) {
        var sPath = oEvent.getParameter("listItem").getBindingContextPath();
        var sIndex = sPath.split("/")[sPath.split("/").length - 1];
        debugger;
        this.oRouter.navTo("supplier",{
            suppId: sIndex
        });
     },
     supplierPopup: null,
     onFilterSupplier: function (){
      if(!this.supplierPopup){
        Fragment.load(
            {id: 'supplier',
            name: 'algo.fiori.fragment.popup',
            type: 'XML',
            controller: this
        }
         ).then(function(oFragment){
               this.supplierPopup = oFragment; 
               this.supplierPopup.setTitle("supplier");
               this.getView().addDependent(this.supplierPopup,this);
               this.supplierPopup.bindAggregation("items", {
                  path: '/suppliers',
                  template: new sap.m.ObjectListItem({
                    title: '{name}',
                    intro: '{city}',
                    icon: 'sap-icon://supplier'
                  })

               });
               this.supplierPopup.open();
           }.bind(this));}else{
               this.supplierPopup.open();
            }
     },
     cityPopup: null,
     oField: null,
     onF4Help: function (oEvent){
        this.oField = oEvent.getSource();
        if(!this.supplierPopup){
            Fragment.load(
                {id: 'city',
                name: 'algo.fiori.fragment.popup',
                type: 'XML',
                controller: this
            }
             ).then(function(oFragment){
                   this.supplierPopup = oFragment; 
                   this.supplierPopup.setTitle("cities");
                   this.getView().addDependent(this.supplierPopup,this);
                   this.supplierPopup.bindAggregation("items", {
                      path: '/cities',
                      template: new sap.m.ObjectListItem({
                        title: '{name}',
                        intro: '{state}',
                        icon: 'sap-icon://home'
                      })
    
                   });
                   this.supplierPopup.open();
               }.bind(this));}else{
                   this.supplierPopup.open();
                } 
     },
    onConfirm: function(oEvent){
        var sId = oEvent.getSource().getId();
        var aFilter = [];
        if(sId.indexOf("city") !== -1){
            var oSelectedItem = oEvent.getParameter("selectedItem");
            var sval = oSelectedItem.getTitle();
            this.oField.setValue(sval);
        }else{
            var aItems = oEvent.getParameter("selectedItems");
            for(let i =0; i= aItems.length; i++){
                const element = aItems[i];
                aFilter.push(new Filter("name", FilterOperator.EQ, element.getTitle()));
            }
            var oFilter = new Filter(
                {
                    filters: aFilter,
                    and: false
                }
            );
            var oTable = this.getView().byId("idTable");
            oTable.getBinding("items").filter(oFilter);
        }
      
    }
    });
    
});