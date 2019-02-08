sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
  ],
  function(
    Controller,
    JSONModel,
    MessageBox,
    MessageToast
  ) {
    "use strict";

    return Controller.extend("evola.controller.Base", {
      JSONModel: JSONModel,
      MB: MessageBox,
      MT: MessageToast,
      RB: null,

      /**
       * Main init controller
       *
       */
      onInit: function() {
        jQuery.sap.log.debug("Init Base");

        this.RB = this.getModel("i18n").getResourceBundle();


      }

    });
  }
);
