sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    //this file inherits from standard sap ui5 class
    return UIComponent.extend("algo.fiori.Component",{
        metadata:{
            manifest: "json"
        },
        init:function(){
            //call baseclass constructor
            UIComponent.prototype.init.apply(this);
            var oRouter = this.getRouter();
            oRouter.initialize();
        },
        // createContent:function(){
        //     // create the object of our Root view
        //     var oView = new sap.ui.view({
        //         id:"idRoot",
        //         viewName:"algo.fiori.view.App",
        //         type: "XML"
        //     });
        // // create objects for view1 and view2

        // var oView1 = new sap.ui.view({
        //     id:"idView1",
        //     viewName:"algo.fiori.view.View1",
        //     type: "XML"
        // });
        // var oView2 = new sap.ui.view({
        //     id:"idView2",
        //     viewName:"algo.fiori.view.View2",
        //     type: "XML"
        // });

        // var oAppCon = oView.byId("idAppCon");
        // oAppCon.addMasterPage(oView1).addDetailPage(oView2);

        //     return oView;
        //     // return new sap.m.Button({text:"hello there"});
        // },
        destroy:function(){}
    });
});