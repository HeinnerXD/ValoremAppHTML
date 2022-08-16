sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("valoremapp.ValoremAppHTML.controller.PlaneacionFinanciera.PlaneacionFinanciera", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf valoremapp.ValoremAppHTML.view.mainMenu
		 */
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("PlaneacionFinanciera").attachMatched(this._onRouteMatched, this);
            this.TileInformeJunta = this.byId("TileInformeJunta");
            this.TileEva = this.byId("TileEva");
        },
        _onRouteMatched: function (oEvent) {
            this.arr = JSON.parse(oEvent.getParameter("arguments").roles);
            if (this.arr !== null) {
                this.resetTiles();
                this.arr.forEach(element => {
                    if (element === "Z_PORTAL_CF_ADMIN") { //Z_PORTAL_CF_ADMIN
                        this.TileInformeJunta.setVisible(true);
                    }
                    if (element === "Z_PORTAL_CF_CARGAS") { //Z_PORTAL_CF_CARGAS
                        this.TileEva.setVisible(true);
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
        press_InformeJunta: function () {
            this.oRouter.navTo("PlaneacionFinancieraJunta", {roles: JSON.stringify(this.arr)}, true);
        },
        press_EVA: function () {
            this.oRouter.navTo("PlaneacionFinancieraEva", {roles: JSON.stringify(this.arr)}, true);
        },
        resetTiles: function () {
            this.TileInformeJunta.setVisible(false);
            this.TileEva.setVisible(false);
        }

    });

});