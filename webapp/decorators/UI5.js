/**
 * Convert a class definition to the UI5 format of inheritance.
 * This decorator can only be used in a class that extends from another UI5 class.
 * If your class doesn't extends from any other, don't use this decorator or make your class extend from
 * sap.ui.base.Object
 * @param name Full name of the class. This parameter will be passed to BaseClass.extend(name, ...) method at runtime.
 */

export default function UI5(sClassName) {
  return function decorator(target) {
    let functionMembers = Object.getOwnPropertyNames(function() {});
    let staticMembers = Object.getOwnPropertyNames(target).filter(
      o => functionMembers.indexOf(o) === -1
    );
    let instanceMethods = Object.getOwnPropertyNames(target.prototype);

    let baseClass = Object.getPrototypeOf(target); // it is the same as: baseClass = target.__proto__;

    let thisClass = {};
    staticMembers.forEach(m => (thisClass[m] = target[m]));
    instanceMethods
      .filter(e => e !== 'constructor')
      .forEach(m => (thisClass[m] = target.prototype[m]));
    // instanceMethods.forEach(m => (thisClass[m] = target.prototype[m]));

    if (typeof baseClass.extend === 'function') {
      return baseClass.extend(sClassName, thisClass);
    } else {
      throw new Error("This class doesn't inherit from a UI5 class");
    }
  };
}
