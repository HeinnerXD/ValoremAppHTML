sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History"
], function (Controller, MessageBox, History) {
    "use strict";

    return Controller.extend("valoremapp.ValoremAppHTML.controller.CambiarClave", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf valoremapp.ValoremAppHTML.view.CambiarClave
		 */
        onInit: function () {
            var urlServer = "https://valoremservernodejs.cfapps.us10.hana.ondemand.com";

            var page = this.byId("page2");
            page.setShowHeader(false);
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            var that = this;
            this.oRouter.getRoute("CambiarClave").attachPatternMatched(this._onObjectMatched2, this);

            $(document).on("click", "#btnvolver", function (event) {

                that.goback();

            });

            //page.setShowHeader(false);

            $(document).on("click", "#btncambiarpass", function (event) {

                var usuario = document.getElementById("txtusuarioclave").value;
                var pass = document.getElementById("txtpassclave").value;
                var passnueva1 = document.getElementById("txtpassclavenueva1").value;
                var passnueva2 = document.getElementById("txtpassclavenueva2").value;

                if (usuario == "" || pass == "" || passnueva1 == "" || passnueva2 == "") {
                    MessageBox.warning("Debes completar todos los campos", {
                        actions: [MessageBox.Action.OK],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {

                        }
                    });

                } else if (passnueva1 !== passnueva2) {
                    MessageBox.warning("Las contraseñas no coinciden", {
                        actions: [MessageBox.Action.OK],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {

                        }
                    });

                } else {
                    // console.log(usuario);
                    sap.ui.core.BusyIndicator.show();
                    $.post(urlServer + "/api/password", {
                        user: usuario,
                        password: pass,
                        newPassword: passnueva1

                        // function (data, status) {
                        // 	alert("Data: " + data + "\nStatus: " + status);
                    }).done(function () {
                        sap.ui.core.BusyIndicator.hide();
                        MessageBox.information("Contraseña actualizada con éxito", {
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

            // var oHistory = History.getInstance();
            // var sPreviousHash = oHistory.getPreviousHash();

            // if (sPreviousHash !== undefined) {
            // 	window.history.go(-1);
            // } else {

            // }
        }

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf valoremapp.ValoremAppHTML.view.CambiarClave
		 */
        //	onBeforeRendering: function() {
        //
        //	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf valoremapp.ValoremAppHTML.view.CambiarClave
		 */
        //	onAfterRendering: function() {
        //
        //	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf valoremapp.ValoremAppHTML.view.CambiarClave
		 */
        //	onExit: function() {
        //
        //	}

    });

});