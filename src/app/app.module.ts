import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalHeaderComponent } from './global-header/global-header.component';
import { GlobalFooterComponent } from './global-footer/global-footer.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchInterviewQuestionsPipe } from './pipes/search-interview-questions.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GlobalHeaderComponent,
    GlobalFooterComponent,
    UserHomeComponent,
    SearchInterviewQuestionsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
