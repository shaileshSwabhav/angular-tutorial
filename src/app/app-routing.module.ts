import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendMailComponent } from './send-mail/send-mail.component';

const routes: Routes = [
  // { path: "send-mail", loadComponent: () => SendMailComponent },
  { path: "send-mail", component: SendMailComponent },
  {
    path: "voice-db",
    loadComponent: () => import('./standalone-components/voicedb/voicedb.component').then(v => v.VoicedbComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
