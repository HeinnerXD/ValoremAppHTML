sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("valoremapp.ValoremAppHTML.controller.InformesCaracol", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf valoremapp.ValoremAppHTML.view.Proceso_Consolidacion
		 */
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("InformesCaracol").attachMatched(this._onRouteMatched, this);
            this.TileGenerarConcepto = this.byId("TileGenerarConcepto");
            this.TileIndicadoresFinancieros = this.byId("TileIndicadoresFinancieros");
            this.TileGenerarVesionFinal = this.byId("TileGenerarVesionFinal");
		},
        resetTiles: function () {
            this.TileGenerarConcepto.setVisible(false);
            this.TileIndicadoresFinancieros.setVisible(false);
            this.TileGenerarVesionFinal.setVisible(false);
        },
        _onRouteMatched: function (oEvent) {
            this.arr = JSON.parse(oEvent.getParameter("arguments").roles);
            if (this.arr !== null) {
                this.resetTiles();
                this.arr.forEach(element => {
                    if (element === "Z_PORTAL_JC_CONCEPTO") { // Z_PORTAL_JC_CONCEPTO
                        this.TileGenerarConcepto.setVisible(true);
                    }
                    if (element === "Z_PORTAL_JC_INDICADORES") { // Z_PORTAL_JC_INDICADORES
                        this.TileIndicadoresFinancieros.setVisible(true);
                    }
                    if (element === "Z_PORTAL_JC_VFINAL") { // Z_PORTAL_JC_VFINAL
                        this.TileGenerarVesionFinal.setVisible(true);
                    }
                });
                if (this.TileGenerarConcepto.getVisible() === false &&
                    this.TileIndicadoresFinancieros.getVisible() === false &&
                    this.TileGenerarVesionFinal.getVisible() === false) {
                    this.oRouter.navTo("mainMenu", { roles: JSON.stringify(this.arr) }, true);
                }
            }
        },
		handlePressConfiguration: function () {
            var that = this;
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			that.oRouter.navTo("mainMenu",{roles: JSON.stringify(this.arr)}, true);
		},
		handleUserItemPressed : function () {
			var that = this;
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			that.oRouter.navTo("login", true);
        },
        press_generarConcepto: function () {
            var that = this;
            that.oRouter.navTo("GenerarConcepto", { roles: JSON.stringify(this.arr) }, true);
        },
        press_indicadoresFinancieros: function () {
            var that = this;
            that.oRouter.navTo("IndicadoresFinancieros", { roles: JSON.stringify(this.arr) }, true);
        },
        press_generarVersionFinal: function () {
            var that = this;
            that.oRouter.navTo("GenerarFinal", { roles: JSON.stringify(this.arr) }, true);
        }
	});

});