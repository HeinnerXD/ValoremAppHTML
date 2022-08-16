sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History"
], function (Controller, MessageBox, History) {
    "use strict";

    return Controller.extend("valoremapp.ValoremAppHTML.controller.UnlockUser", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf valoremapp.ValoremAppHTML.view.CambiarClave
		 */
        onInit: function () {
            var urlServer = "https://valoremserverdev.cfapps.us10.hana.ondemand.com";
            // var urlServer = "http://localhost:3000"
            var page = this.byId("page3");
            page.setShowHeader(false);
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            var that = this;
            this.oRouter.getRoute("CambiarClave").attachPatternMatched(this._onObjectMatched2, this);

            $(document).on("click", "#Ubtnvolver", function (event) {

                that.goback();

            });

            //page.setShowHeader(false);

            $(document).on("click", "#btnUnlock", function (event) {

                var usuario = document.getElementById("Utxtuser").value;
                var email = document.getElementById("Utxtemail").value;
                var checkKoba = document.getElementById("oRTenantKobaUnlock").checked;

                if (usuario == "" || email == "") {
                    MessageBox.warning("Debes completar todos los campos", {
                        actions: [MessageBox.Action.OK],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {

                        }
                    });

                } else {
                    sap.ui.core.BusyIndicator.show();
                    $.post(urlServer + "/api/unlockUser", {
                        user: usuario,
                        email: email,
                        checkKoba: checkKoba
                    }).done(function () {
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.information("Usuario desbloqueado con exito", {
                            actions: [MessageBox.Action.OK],
                            emphasizedAction: MessageBox.Action.OK,
                            onClose: function (sAction) {
                                that.goback();
                            }
                        });
                    }).fail(function (xhr, ajaxOptions, thrownError) {
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.error("Error: " + xhr.responseText, {
                            actions: [MessageBox.Action.OK],
                            emphasizedAction: MessageBox.Action.OK,
                            onClose: function (sAction) { }
                        });

                    })
                }

            });

        },
        _onObjectMatched2: function () {

        },
        goback: function () {
            var that = this;
            that.oRouter.navTo("login", true);
        }

    });

});