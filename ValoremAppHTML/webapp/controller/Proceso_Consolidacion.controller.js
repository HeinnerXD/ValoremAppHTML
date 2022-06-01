sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("valoremapp.ValoremAppHTML.controller.Proceso_Consolidacion", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf valoremapp.ValoremAppHTML.view.Proceso_Consolidacion
		 */
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("Proceso_Consolidacion").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            this.arr = JSON.parse(oEvent.getParameter("arguments").roles);
        },
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf valoremapp.ValoremAppHTML.view.Proceso_Consolidacion
		 */
        //	onBeforeRendering: function() {
        //
        //	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf valoremapp.ValoremAppHTML.view.Proceso_Consolidacion
		 */
        //	onAfterRendering: function() {
        //
        //	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf valoremapp.ValoremAppHTML.view.Proceso_Consolidacion
		 */
        //	onExit: function() {
        //
        //	}
        handlePressConfiguration: function () {
            var that = this;
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            that.oRouter.navTo("mainMenu", { roles: JSON.stringify(this.arr) }, true);
            // if (sPreviousHash !== undefined) {
            // 	// window.history.go(-1);
            // } else {
            // 	that.oRouter.navTo("login", true);
            // }
        },

        handleUserItemPressed: function () {
            var that = this;
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            that.oRouter.navTo("login", true);
            // if (sPreviousHash !== undefined) {
            // 	// window.history.go(-1);
            // } else {
            // 	that.oRouter.navTo("login", true);
            // }
        }
    });

});