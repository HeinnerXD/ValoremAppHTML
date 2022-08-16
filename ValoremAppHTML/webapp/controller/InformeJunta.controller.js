sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("valoremapp.ValoremAppHTML.controller.InformeJunta", {

		onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("InformeJunta").attachMatched(this._onRouteMatched, this);
            this.TileCargueInicial = this.byId("TileCargueInicial");
            this.TileGenerarInformeJunta = this.byId("TileGenerarInformeJunta");
            this.TileComentariosAreas = this.byId("TileComentariosAreas");
            this.TileComentariosGenerales = this.byId("TileComentariosGenerales");
            this.TileRedondeoCifras = this.byId("TileRedondeoCifras");
            this.TileInformeJunta = this.byId("TileInformeJunta");
            this.TileParametrizacion = this.byId("TileParametrizacion");
        },
        resetTiles: function () {
            this.TileCargueInicial.setVisible(false);
            this.TileGenerarInformeJunta.setVisible(false);
            this.TileComentariosAreas.setVisible(false);
            this.TileComentariosGenerales.setVisible(false);
            this.TileRedondeoCifras.setVisible(false);
            this.TileInformeJunta.setVisible(false);
            this.TileParametrizacion.setVisible(false);
        },
        _onRouteMatched: function (oEvent) {
            this.arr = JSON.parse(oEvent.getParameter("arguments").roles);
            if (this.arr !== null) {
                this.resetTiles();
                this.arr.forEach(element => {
                    if (element === "Z_PORTAL_JV_CARGUE") { // Z_PORTAL_JV_CARGUE
                        this.TileCargueInicial.setVisible(true);
                    }
                    if (element === "Z_PORTAL_JV_REAL") { // Z_PORTAL_JV_REAL
                        this.TileGenerarInformeJunta.setVisible(true);
                    }
                    if (element === "Z_PORTAL_JV_COMAREAS") { // Z_PORTAL_JV_COMAREAS
                        this.TileComentariosAreas.setVisible(true);
                    }
                    if (element === "Z_PORTAL_JV_COMGEN") { // Z_PORTAL_JV_COMGEN
                        this.TileComentariosGenerales.setVisible(true);
                    }
                    if (element === "Z_PORTAL_JV_REDONDEO") { // Z_PORTAL_JV_REDONDEO
                        this.TileRedondeoCifras.setVisible(true);
                    }
                    if (element === "Z_PORTAL_JV_SAC") { // Z_PORTAL_JV_SAC
                        this.TileInformeJunta.setVisible(true);
                    }
                    if (element === "Z_PORTAL_JV_PARAMETRIZACION") { // Z_PORTAL_JV_SAC
                        this.TileParametrizacion.setVisible(true);
                    }
                });
                if (this.TileCargueInicial.getVisible() === false &&
                    this.TileGenerarInformeJunta.getVisible() === false &&
                    this.TileComentariosAreas.getVisible() === false &&
                    this.TileComentariosGenerales.getVisible() === false &&
                    this.TileRedondeoCifras.getVisible() === false &&
                    this.TileInformeJunta.getVisible() === false &&
                    this.TileParametrizacion.getVisible() === false) {
                    this.oRouter.navTo("mainMenu", { roles: JSON.stringify(this.arr) }, true);
                }
            }
        },
        handlePressConfiguration: function () {
            var that = this;
			that.oRouter.navTo("mainMenu", {roles:JSON.stringify(this.arr)}, true);
		},
		handleUserItemPressed: function () {
			var that = this;
			that.oRouter.navTo("login", true);
		},
        press_cargueInicial: function () {
            var that = this;
            that.oRouter.navTo("cargueInicial", { roles: JSON.stringify(this.arr) }, true);
        },
        press_generarInformeJunta: function () {
            var that = this;
            that.oRouter.navTo("generarInformeJunta", { roles: JSON.stringify(this.arr) }, true);
        },
        press_comentariosAreas: function () {
            var that = this;
            that.oRouter.navTo("comentariosAreas", { roles: JSON.stringify(this.arr) }, true);
        },
        press_comentariosGenerales: function () {
            var that = this;
            that.oRouter.navTo("comentariosGenerales", { roles: JSON.stringify(this.arr) }, true);
        },
        press_redondeoCifras: function () {
            var that = this;
            that.oRouter.navTo("redondeoCifras", { roles: JSON.stringify(this.arr) }, true);
        },
        press_informeJunta: function () {
            window.open("https://valorem.br10.sapanalytics.cloud", "_blank");
        },
        press_parametrizacion: function () {
            var that = this;
            that.oRouter.navTo("parametrizacion", { roles: JSON.stringify(this.arr) }, true);
        }
        
	});

});