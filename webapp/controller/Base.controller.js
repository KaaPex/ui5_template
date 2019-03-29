import prototype from '../decorators/prototype';
import UI5 from '../decorators/UI5';
import * as Controller from 'sap/ui/core/mvc/Controller';
import * as JSONModel from 'sap/ui/model/json/JSONModel';
import * as MessageBox from 'sap/m/MessageBox';
import * as MessageToast from 'sap/m/MessageToast';

@prototype(Controller)
@UI5('ui5template.controller.Base')
class Base extends Controller {
  JSONModel = JSONModel;
  MB = MessageBox;
  MT = MessageToast;
  RB = null;

  static get metadata() {
    return {
      final: true
    };
  }

  constructor() {
    super(arguments);
  }

  onInit() {
    jQuery.sap.log.debug('Init Base');

    this.RB = this.getModel('i18n').getResourceBundle();
  }
}

export default Base;
