export function AutoUnsubscribe(blackList: string[] = []) {
  // tslint:disable-next-line: only-arrow-functions
  return function (constructor: any) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      for (const prop of Object.keys(this)) {
        const property = this[prop];
        if (!blackList.includes(prop)) {
          if (property && typeof property.unsubscribe === 'function') {
            property.unsubscribe();
          }
        }
      }
      // tslint:disable-next-line:no-unused-expression
      original && typeof original === 'function' && original.apply(this, arguments);
    };
  };
}
