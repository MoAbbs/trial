const FUNCTION_REGEX = /react(\d+)?./i;

export function classComponent(params, component) {
  return (
    String(component.$$typeof) === 'Symbol(react.lazy)' || (component.prototype && !!component.prototype.isReactComponent)
  );
}
export function functionComponent(params, component) {
  return (
    typeof component === 'function' &&
    String(component).includes('return') &&
    !!String(component).match(FUNCTION_REGEX) &&
    String(component).includes('.createElement')
  );
}
export function checkComponent(params, component) {
  return classComponent(params, component)
}