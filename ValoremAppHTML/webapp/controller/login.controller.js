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
            // var that=this;
            // var oHistory = History.getInstance();
            // var sPreviousHash = oHistory.getPreviousHash();
            // if (sPreviousHash !== undefined) {

            // }
        },
        _onObjectMatched: function (oEvent) {
            document.getElementById("txtusuario").value = "";
            document.getElementById("txtpass").value = "";
        },
        inicializar: function () {
            var urlServer = "https://valoremservernodejs.cfapps.us10.hana.ondemand.com";
            var page = this.byId("page");
            page.setShowHeader(false);
            var that = this;
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView());
            this.oRouter.getRoute("login").attachPatternMatched(this._onObjectMatched, this);
            if (boolean)
                $.get(urlServer, function (data) {
                    // console.log('Entró a la petición');
                    // console.log(JSON.stringify(data));
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
                    // console.log(boolean);
                    sap.ui.core.BusyIndicator.show();
                    $.post(urlServer + "/api/connect", {
                        user: usuario,
                        password: pass

                        // function (data, status) {
                        // 	alert("Data: " + data + "\nStatus: " + status);
                    }).done(function (data) {
                        // console.log(data);
                        var roles = [];
                        data.role.forEach(element => {
                            roles.push(element.ROLE_NAME);
                        });
                        sap.ui.core.BusyIndicator.hide();
                        // console.log(data.data[0]);
                        if (data.data.length === 0) {
                            // console.log("ENVIANDO FALSE");
                            localStorage.setItem('periodos', "false")
                            that.oRouter.navTo("mainMenu", { roles: JSON.stringify(roles) }, true);
                        } else {
                            // console.log("ENVIANDO ARRAY");
                            localStorage.setItem('periodos', JSON.stringify(data.data[0]))
                            that.oRouter.navTo("mainMenu", { roles: JSON.stringify(roles) }, true);
                        }

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
            $(document).on("click", "#btnCambiarClave", function (event) {
                that.oRouter.navTo("CambiarClave", true);
            });
            $(document).on("click", "#btnUnlockUser", function (event) {
                // console.log("Usando la función de desbloquear usuario");
                that.oRouter.navTo("UnlockUser", true);
            });

        }

    });
});