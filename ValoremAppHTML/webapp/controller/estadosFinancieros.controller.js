sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox"
], function (Controller, History, MessageBox) {
    "use strict";

    return Controller.extend("valoremapp.ValoremAppHTML.controller.estadosFinancieros", {

        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("estadosFinancieros").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            this.arr = JSON.parse(oEvent.getParameter("arguments").roles);
        },
        handlePressConfiguration: function () {
            var that = this;
            that.oRouter.navTo("reportesFinancieros", { roles: JSON.stringify(this.arr) }, true);
        },

        handleUserItemPressed: function () {
            var that = this;
            that.oRouter.navTo("login", true);
        },
        onDowload: function (filename) {
            var urlServer = "https://valoremservernodejs.cfapps.us10.hana.ondemand.com";
            var oView = this.getView();
            var oResourceBundle = oView.getModel("i18n").getResourceBundle();
            var url = oResourceBundle.getText("urlServer").toString().trim();
            sap.ui.core.BusyIndicator.show();

            $.post(urlServer + "/api/downloadFile", {
                name: "DMSShuttle",
                username: "lgarcia@valorem.com.co",
                url: "01. CONSOLIDACION/PRODUCCION/2. Carga de Datos/",
                fileName: filename
            }).done(function (data) {
                // console.log(data)
                window.open(url + '/' + filename);
                jQuery.sap.delayedCall(650, this, function () {
                    $.post(urlServer + "/api/cleanServer")
                        .done(function (response) {
                            // console.log(response)
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