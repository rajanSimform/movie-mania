import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicHook]',
})
export class DynamicHookDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
