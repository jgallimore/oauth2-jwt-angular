import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MainComponent } from './components/main/main.component';
import { MovieModalComponent } from './components/movie-modal/movie-modal.component';
import { MovieComponent } from './components/movie/movie.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { GravatarPipe } from './pipes/gravatar.pipe';
import { AuthGuard } from './services/auth-guard.service';
import { HeaderInterceptors } from './services/header.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MovieModalComponent,
    MainComponent,
    MovieComponent,
    NotFoundComponent,
    LogoutComponent,
    GravatarPipe,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard,
    HeaderInterceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class CustomHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    public resources: { prefix: string, suffix: string } = { prefix: '/assets/i18n/', suffix: '.json' }
  ) { }
  public getTranslation(lang: string): any {
    return this.http.get(`${this.resources.prefix}${lang}${this.resources.suffix}`);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new CustomHttpLoader(http, environment.test ? undefined : { prefix: './app/assets/i18n/', suffix: '.json' });
}
