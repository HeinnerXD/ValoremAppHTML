sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("valoremapp.ValoremAppHTML.controller.reportesFinancieros", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf valoremapp.ValoremAppHTML.view.mainMenu
		 */
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("reportesFinancieros").attachMatched(this._onRouteMatched, this);
            this.TileEstadoFinanciero = this.byId("TileEstadoFinanciero");
            this.TileNotasEstadoFinanciero = this.byId("TileNotasEstadoFinanciero");

        },
        resetTiles: function () {
            this.TileEstadoFinanciero.setVisible(false);
            this.TileNotasEstadoFinanciero.setVisible(false);
        },
        _onRouteMatched: function (oEvent) {
            this.arr = JSON.parse(oEvent.getParameter("arguments").roles);
            if (this.arr !== null) {
                this.resetTiles();
                // console.log(this.arr);
                this.arr.forEach(element => {
                    if (element === "Z_PORTAL_COMP_EEFF") { //Z_PORTAL_COMP_EEFF
                        this.TileEstadoFinanciero.setVisible(true);
                    }

                    if (element === "Z_PORTAL_COMP_NOTAS") { //Z_PORTAL_COMP_NOTAS
                        this.TileNotasEstadoFinanciero.setVisible(true);
                    }
                });
                if (this.TileEstadoFinanciero.getVisible() === false &&
                    this.TileNotasEstadoFinanciero.getVisible() === false) {
                    this.oRouter.navTo("mainMenu", { roles: JSON.stringify(this.arr) }, true);
                }
            }

        },
        handleUserItemPressed: function () {
            var that = this;
            that.oRouter.navTo("login", true);
        },
        press_notasFinancieros: function () {
            this.oRouter.navTo("NotasFinancieros", { roles: JSON.stringify(this.arr) }, true);
        },
        handlePressConfiguration: function () {
            var that = this;
            that.oRouter.navTo("mainMenu", { roles: JSON.stringify(this.arr) }, true);
        },
        press_estadosFinancieros: function () {
            var that = this;
            that.oRouter.navTo("estadosFinancieros", { roles: JSON.stringify(this.arr) }, true);
        }

    });

});