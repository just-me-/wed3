import {NgModule, ModuleWithProviders, SkipSelf, Optional, forwardRef} from '@angular/core';

import {SharedModule} from '@app/shared';

@NgModule({
  declarations: [],
  imports: [SharedModule],
  exports: [/* nothing to add here */],
  providers: [/* nothing to add here */]
})
export class CoreModule {
  static forRoot(config?: {}): ModuleWithProviders {

    return {
      ngModule: CoreModule,
      providers: [
        // DI Multi-Providers (Services, Tokens, Factories...) to be used globally and instantiated only once.
        // For Single-Providers use {providedIn: 'root'} instead.
      ]
    };
  }

  // Only the root AppModule should import the CoreModule. Bad things happen if a lazy loaded module imports it.
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
