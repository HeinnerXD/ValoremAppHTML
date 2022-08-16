sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("valoremapp.ValoremAppHTML.controller.Koba.OtrosKoba", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf valoremapp.ValoremAppHTML.view.mainMenu
		 */
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("OtrosKoba").attachMatched(this._onRouteMatched, this);
            this.TileFI = this.byId("TileFI");
            this.TileMM = this.byId("TileMM");
        },
        _onRouteMatched: function (oEvent) {
            this.arr = JSON.parse(oEvent.getParameter("arguments").roles);
            if (this.arr !== null) {
                this.resetTiles();
                this.arr.forEach(element => {
                    if (element === "Z_PORTAL_OTROSKOBA") {
                        this.TileFI.setVisible(true);
                        this.TileMM.setVisible(true);
                    }
                });
            }
        },   
        handlePressConfiguration: function () {
            var that = this;
			that.oRouter.navTo("mainMenu", {roles:JSON.stringify(this.arr)}, true);
		},
        handleUserItemPressed: function () {
            var that = this;
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            that.oRouter.navTo("login", true);
        },
        press_FI: function () {
            this.oRouter.navTo("OtrosKobaFi", {roles: JSON.stringify(this.arr)}, true);
        },
        press_MM: function () {
            this.oRouter.navTo("OtrosKobaMm", {roles: JSON.stringify(this.arr)}, true);
        },
        resetTiles: function () {
            this.TileFI.setVisible(false);
            this.TileMM.setVisible(false);
        }
    });
});