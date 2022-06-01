sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("valoremapp.ValoremAppHTML.controller.mainMenu", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf valoremapp.ValoremAppHTML.view.mainMenu
		 */
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("mainMenu").attachMatched(this._onRouteMatched, this);
            this.TileConsolidacion = this.byId("TileConsolidacion");
            this.TileIndividuales = this.byId("TileIndividuales");
            this.TileConsolidadas = this.byId("TileConsolidadas");
            this.TileInformeJuntas = this.byId("TileInformeJuntas");
            this.TilePlaneacion = this.byId("TilePlaneacion");
            this.TileOtrosInformesValorem = this.byId("TileOtrosInformesValorem");
            this.TileInformesRefocosta = this.byId("TileInformesRefocosta");
            this.TileOtrosKoba = this.byId("TileOtrosKoba");
            this.TileOtrosCaracol = this.byId("TileOtrosCaracol");
        },
        _onRouteMatched: function (oEvent) {
            this.arr = JSON.parse(oEvent.getParameter("arguments").roles);
            if (this.arr !== null) {
                this.resetTiles();
                // console.log(this.arr);
                this.arr.forEach(element => {
                    if (element === "Z_PORTAL_CONSOLIDACION") { //Z_PORTAL_CONSOLIDACION
                        this.TileConsolidacion.setVisible(true);
                    }

                    if (element === "Z_PORTAL_NOTASIND") { //Z_PORTAL_NOTASIND
                        this.TileIndividuales.setVisible(true);
                    }

                    if (element === "Z_PORTAL_NOTASCONS") { //Z_PORTAL_NOTASCONS
                        this.TileConsolidadas.setVisible(true);
                    }

                    if (element === "Z_PORTAL_INFORMEJUNTA") { //Z_PORTAL_INFORMEJUNTA
                        this.TileInformeJuntas.setVisible(true);
                    }

                    if (element === "Z_PORTAL_PLANEACION") { //Z_PORTAL_PLANEACION
                        this.TilePlaneacion.setVisible(true);
                    }

                    if (element === "Z_PORTAL_OTROSVALOREM") { //Z_PORTAL_OTROSVALOREM
                        this.TileOtrosInformesValorem.setVisible(true);
                    }

                    if (element === "Z_PORTAL_OTROSREFO") { //Z_PORTAL_OTROSREFO
                        this.TileInformesRefocosta.setVisible(true);
                    }

                    if (element === "Z_PORTAL_OTROSKOBA") { //Z_PORTAL_OTROSKOBA
                        this.TileOtrosKoba.setVisible(true);
                    }
                    //Z_PORTAL_JC_GENERAL
                    if (element === "Z_PORTAL_JC_GENERAL") { //Z_PORTAL_JC_GENERAL
                        this.TileOtrosCaracol.setVisible(true);
                    }
                });
            }

            if (this.TileConsolidacion.getVisible() === false && this.TileIndividuales.getVisible() === false &&
                this.TileConsolidadas.getVisible() === false && this.TileInformeJuntas.getVisible() === false &&
                this.TilePlaneacion.getVisible() === false && this.TileOtrosInformesValorem.getVisible() === false &&
                this.TileInformesRefocosta.getVisible() === false && this.TileOtrosKoba.getVisible() === false &&
                this.TileOtrosCaracol.getVisible() === false) {
                this.oRouter.navTo("login", true);
            }
        },
        handleUserItemPressed: function () {
            var that = this;
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            that.oRouter.navTo("login", true);
        },
        press_consolidacion: function () {
           
            this.oRouter.navTo("mainMenuEstFinanciero", {roles: JSON.stringify(this.arr)}, true);
        },
        press_notasFinancieros: function () {
            this.oRouter.navTo("reportesFinancieros", {roles: JSON.stringify(this.arr)}, true);
        },
        press_informeJunta: function () {
            this.oRouter.navTo("InformeJunta", {roles: JSON.stringify(this.arr)}, true);
          
        },
        press_informesValorem: function () {
            this.oRouter.navTo("InformesValorem", {roles: JSON.stringify(this.arr)}, true);
        },
        press_notasConsolidadas: function () {
            this.oRouter.navTo("NotasConsolidadas", {roles: JSON.stringify(this.arr)}, true);
        },
        press_informesCaracol: function (){
            this.oRouter.navTo("InformesCaracol", {roles: JSON.stringify(this.arr)}, true);    
        },
        resetTiles: function () {
            this.TileConsolidacion.setVisible(false);
            this.TileIndividuales.setVisible(false);
            this.TileConsolidadas.setVisible(false);
            this.TileInformeJuntas.setVisible(false);
            this.TilePlaneacion.setVisible(false);
            this.TileOtrosInformesValorem.setVisible(false);
            this.TileInformesRefocosta.setVisible(false);
            this.TileOtrosKoba.setVisible(false);
            this.TileOtrosCaracol.setVisible(false);
        }

    });

});