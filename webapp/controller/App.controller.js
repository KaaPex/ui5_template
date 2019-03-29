import prototype from '../decorators/prototype';
import UI5 from '../decorators/UI5';
import * as Controller from 'sap/ui/core/mvc/Controller';

@prototype(Controller)
@UI5('ui5template.controller.App')
class App extends Controller {
  constructor() {
    super(arguments);
  }

  onInit() {
    jQuery.sap.log.debug('Init App');
  }
}

export default App;
