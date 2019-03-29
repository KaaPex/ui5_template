import * as Base from './Base.controller';
import UI5 from '../decorators/UI5';

@UI5('ui5template.controller.Main')
class Main extends Base {
  static get metadata() {
    return {
      final: true
    };
  }

  constructor() {
    super(arguments);
  }

  onInit() {
    jQuery.sap.log.debug('Init Main');
  }
}

export default Main;
