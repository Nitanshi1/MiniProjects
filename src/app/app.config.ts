import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { WebMemoryApiService } from './web-memory-api.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(WebMemoryApiService,{dataEncapsulation:false})),
    provideRouter(routes)]
};
