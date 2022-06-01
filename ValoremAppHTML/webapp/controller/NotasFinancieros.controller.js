sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox"
], function (Controller, History, MessageBox) {
    "use strict";

    return Controller.extend("valoremapp.ValoremAppHTML.controller.NotasFinancieros", {

        onInit: function () {
            if (localStorage.getItem('periodos') === "false") {
                // console.log("ENTRÓ CON FALSE");
                this.byId('periodoLabel').setText('Sin periodo a reportar');
                this.byId('hastaLabel').setText('Sin fecha limite Reporte');
            } else {
                // console.log("ENTRÓ CON ARRAY");
                var data = JSON.parse(localStorage.getItem('periodos'));
                this.byId('periodoLabel').setText('Periodo a reportar: ' + data.PERIODO + '');
                this.byId('hastaLabel').setText('Fecha Limite Reporte: ' + data.HASTA);
            }
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("NotasFinancieros").attachMatched(this._onRouteMatched, this);
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
        goprueba: function () {
            alert("fdg");
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
                url: "02. NOTAS EEFF/PRODUCCION/INDIVIDUALES",
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