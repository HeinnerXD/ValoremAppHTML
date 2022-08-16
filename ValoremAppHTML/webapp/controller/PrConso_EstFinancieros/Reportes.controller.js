sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox"
], function (Controller, History) {
    "use strict";
    return Controller.extend("valoremapp.ValoremAppHTML.controller.PrConso_EstFinancieros.Reportes", {
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("FReportes").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            this.arr = JSON.parse(oEvent.getParameter("arguments").roles);
        },
        handlePressConfiguration: function () {
            var that = this;
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            if (localStorage.getItem('FromFinancieros') === 'true') {
                that.oRouter.navTo("reportesFinancieros", { roles: JSON.stringify(this.arr) }, true);
            } else {
                that.oRouter.navTo("mainMenuEstFinanciero", { roles: JSON.stringify(this.arr) }, true);
            }
            localStorage.setItem('FromFinancieros', 'false')
        },
        handleUserItemPressed: function () {
            var that = this;
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            that.oRouter.navTo("login", true);
            localStorage.setItem('FromFinancieros', 'false')
        },
        onDowload: function (filename) {
            var urlServer = "https://valoremserverdev.cfapps.us10.hana.ondemand.com";
            var oView = this.getView();
            var oResourceBundle = oView.getModel("i18n").getResourceBundle();
            var url = oResourceBundle.getText("urlServer").toString().trim();
            sap.ui.core.BusyIndicator.show();
            $.post(urlServer + "/api/downloadFile", {
                name: "DMSShuttle",
                username: "lgarcia@valorem.com.co",
                url: "01. CONSOLIDACION/PRODUCCION/5. Reportes/",
                fileName: filename
            }).done(function (data) {
                
                window.open(url + '/' + filename);
                jQuery.sap.delayedCall(650, this, function () {
                    $.post(urlServer + "/api/cleanServer")
                        .done(function (response) {
                            
                            sap.ui.core.BusyIndicator.hide();
                        }).fail(function (xhr, ajaxOptions, thrownError) {
                            sap.ui.core.BusyIndicator.hide();
                        });
                });
            }).fail(function (xhr, ajaxOptions, thrownError) {

                sap.ui.core.BusyIndicator.hide();

                MessageBox.error("Error: " + xhr.responseText, {
                    actions: [MessageBox.Action.OK],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) { }
                });

            });
        },
        onDowloadReal: function (filename) {
            var urlServer = "https://valoremserverdev.cfapps.us10.hana.ondemand.com";
            var oView = this.getView();
            var oResourceBundle = oView.getModel("i18n").getResourceBundle();
            var url = oResourceBundle.getText("urlServer").toString().trim();
            sap.ui.core.BusyIndicator.show();
            $.post(urlServer + "/api/downloadFile", {
                name: "DMSShuttle",
                username: "lgarcia@valorem.com.co",
                url: "03. INFORME DE JUNTA/PRODUCCION/01. Cargue Inicial/1.2. Real",
                fileName: filename
            }).done(function (data) {
                
                window.open(url + '/' + filename);
                jQuery.sap.delayedCall(650, this, function () {
                    $.post(urlServer + "/api/cleanServer")
                        .done(function (response) {
                            
                            sap.ui.core.BusyIndicator.hide();
                        }).fail(function (xhr, ajaxOptions, thrownError) {
                            sap.ui.core.BusyIndicator.hide();
                        });
                });
            }).fail(function (xhr, ajaxOptions, thrownError) {

                sap.ui.core.BusyIndicator.hide();

                MessageBox.error("Error: " + xhr.responseText, {
                    actions: [MessageBox.Action.OK],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) { }
                });

            });
        }
    });
});