import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationModule } from './core/authorization/authorization.module';
import { BgsSharedModule } from './shared/bgs-shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MessageService } from 'primeng/api';
import { ProductService } from './features/products/product.service';
import { AppConfigurationService } from './core/app-configuration/app.configuration.service';
import { HttpJwtHandlerInterceptor } from './core/http/http-jwt-handler.interceptor';
import { HttpHeadersInterceptor } from './core/http/http-language-header.interceptor';
import { HttpErrorHandlerInterceptor } from './core/http/http-error-handler.interceptor';
import { NavigationComponent } from './header/navigation/navigation.component';
import { LanguageComponent } from './header/language/language.component';
import { UserProfileComponent } from './header/user-profile/user-profile.component';
import { CartService } from './features/cart/cart.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LanguageComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthorizationModule,
    BgsSharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (settings: AppConfigurationService) => async () => await settings.init(),
      deps: [AppConfigurationService],
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpJwtHandlerInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true
    },
    MessageService,
    ProductService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
