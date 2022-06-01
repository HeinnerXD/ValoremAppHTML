sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("valoremapp.ValoremAppHTML.controller.PrConso_EstFinancieros.MainViewEstFinanciero", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf valoremapp.ValoremAppHTML.view.mainMenu
		 */
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("mainMenuEstFinanciero").attachMatched(this._onRouteMatched, this);
            this.TileFAdministracion = this.byId("TileFAdministracion");
            this.TileFCargaDatos = this.byId("TileFCargaDatos");
            this.TileFConciliacion = this.byId("TileFConciliacion");
            this.TileFConsolidacion = this.byId("TileFConsolidacion");
            this.TileFReportes = this.byId("TileFReportes");
        },
        _onRouteMatched: function (oEvent) {
            this.arr = JSON.parse(oEvent.getParameter("arguments").roles);
            if (this.arr !== null) {
                this.resetTiles();
                this.arr.forEach(element => {
                    if (element === "Z_PORTAL_CF_ADMIN") { //Z_PORTAL_CF_ADMIN
                        this.TileFAdministracion.setVisible(true);
                    }

                    if (element === "Z_PORTAL_CF_CARGAS") { //Z_PORTAL_CF_CARGAS
                        this.TileFCargaDatos.setVisible(true);
                    }

                    if (element === "Z_PORTAL_CF_CONCILIACION") { //Z_PORTAL_CF_CONCILIACION
                        this.TileFConciliacion.setVisible(true);
                    }

                    if (element === "Z_PORTAL_CF_CONSOLIDACION") { //Z_PORTAL_CF_CONSOLIDACION
                        this.TileFConsolidacion.setVisible(true);
                    }

                    if (element === "Z_PORTAL_CF_REPORTES") { //Z_PORTAL_CF_REPORTES
                        this.TileFReportes.setVisible(true);
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
        press_FAdministracion: function () {
           
            this.oRouter.navTo("FAdministracion", {roles: JSON.stringify(this.arr)}, true);
        },
        press_FCargaDatos: function () {
            this.oRouter.navTo("FCargaDatos", {roles: JSON.stringify(this.arr)}, true);
        },
        press_FConciliacion: function () {
            this.oRouter.navTo("FConciliacion", {roles: JSON.stringify(this.arr)}, true);
          
        },
        press_FConsolidacion: function () {
            this.oRouter.navTo("FConsolidación", {roles: JSON.stringify(this.arr)}, true);
        },
        press_FReportes: function () {
            this.oRouter.navTo("FReportes", {roles: JSON.stringify(this.arr)}, true);
        },
        resetTiles: function () {
            this.TileFAdministracion.setVisible(false);
            this.TileFCargaDatos.setVisible(false);
            this.TileFConciliacion.setVisible(false);
            this.TileFConsolidacion.setVisible(false);
            this.TileFReportes.setVisible(false);
        }

    });

});