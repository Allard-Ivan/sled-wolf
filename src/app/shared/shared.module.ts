import { CommonModule, JsonPipe } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PrettyJsonModule } from 'angular2-prettyjson';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    PrettyJsonModule 
  ]
})
export class SharedModule {
  // 加入forRoot，這裡未來會放一些只會在app.module建立的service，因為我們這個module會多次注入，如果你直接在上面寫providers(注入service)，會產生多個service實體，這不是我們要的，因此我們會把service包裝在forRoot方法中
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [
        // 放service
      ]
    };
  }
}
