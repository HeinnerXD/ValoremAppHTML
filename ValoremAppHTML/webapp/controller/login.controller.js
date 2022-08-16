sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History"
], function (Controller, MessageBox, History) {
    "use strict";
    var boolean = false;

    return Controller.extend("valoremapp.ValoremAppHTML.controller.login", {

        onInit: function () {
            if (boolean == false) {
                this.inicializar();
            }
            history.pushState(null, document.title, location.href);
            window.addEventListener('popstate', function (event) {
                history.pushState(null, document.title, location.href);
            });
        },
        _onObjectMatched: function (oEvent) {
            document.getElementById("txtusuario").value = "";
            document.getElementById("txtpass").value = "";
        },
        inicializar: function () {
            var urlServer = "https://valoremserverdev.cfapps.us10.hana.ondemand.com";
            // var urlServer = "http://localhost:3000"
            var page = this.byId("page");
            page.setShowHeader(false);
            var that = this;
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("login").attachPatternMatched(this._onObjectMatched, this);
            if (boolean)
                $.get(urlServer, function (data) {
                });
            $(document).on("click", "#btnRegistrar", function (event) {
                var usuario = document.getElementById("txtusuario").value;
                var pass = document.getElementById("txtpass").value;

                if (usuario == "" || pass == "") {
                    MessageBox.warning("Debes llenar todos los campos", {
                        actions: [MessageBox.Action.OK],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {

                        }
                    });
                } else {
                    sap.ui.core.BusyIndicator.show();
                    $.post(urlServer + "/api/connect", {
                        user: usuario,
                        password: pass
                    }).done(function (data) {
                        ;
                        var roles = [];
                        data.role.forEach(element => {
                            roles.push(element.ROLE_NAME);
                        });
                        sap.ui.core.BusyIndicator.hide();
                        if (data.data.length === 0) {
                            localStorage.setItem('periodos', "false")
                            localStorage.setItem('periodosStatus', "false")
                            that.oRouter.navTo("mainMenu", { roles: JSON.stringify(roles) }, true);
                        } else {
                            localStorage.setItem('periodos', JSON.stringify(data.data[0]))
                            localStorage.setItem('periodosStatus', JSON.stringify(data.periodos[0]))
                            const userStatusData = data.status[0]
                            MessageBox.information(`Estado del usuario ${userStatusData.USUARIO}: ${userStatusData.NM_ESTADO} `, {
                                details: `Fecha de vencimiento: ${userStatusData.FECHA_VENCIMIENTO}`,
                                actions: [MessageBox.Action.OK],
                                emphasizedAction: MessageBox.Action.OK,
                                onClose: function (sAction) {
                                    that.oRouter.navTo("mainMenu", { roles: JSON.stringify(roles) }, true);
                                }
                            });
                        }
                    }).fail(function (xhr, ajaxOptions, thrownError) {
                        sap.ui.core.BusyIndicator.hide();
                        var { error } = JSON.parse(xhr.responseText)
                        if (error.message === 'authentication failed') {
                            MessageBox.error("Error de autenticación, por favor verifique los datos.", {
                                actions: [MessageBox.Action.OK],
                                emphasizedAction: MessageBox.Action.OK,
                                onClose: function (sAction) { }
                            });
                        } else {
                            MessageBox.error("Error: " + xhr.responseText, {
                                actions: [MessageBox.Action.OK],
                                emphasizedAction: MessageBox.Action.OK,
                                onClose: function (sAction) { }
                            });
                        }
                    })
                }

            });
            $(document).on("click", "#btnCambiarClave", function (event) {
                that.oRouter.navTo("CambiarClave", true);
            });
            $(document).on("click", "#btnUnlockUser", function (event) {
                that.oRouter.navTo("UnlockUser", true);
            });

        }

    });
});