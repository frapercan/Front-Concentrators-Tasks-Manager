import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { StudyListComponent } from "./components/study/study-list.component";
import { StudyDetailsComponent } from "./components/study/study-details.component";
import { StudyFormComponent } from "./components/study/study-form.component";
import { ConcentratorListComponent } from "./components/concentrator/concentrator-list.component"
import { AuthGuard } from "./_helpers";

const routes: Routes = [
  { path: "", component: StudyListComponent, canActivate: [AuthGuard] },
  { path: "concentrator", component: ConcentratorListComponent, canActivate: [AuthGuard] },
  {
    path: "study/new",
    component: StudyFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "study/:id",
    component: StudyDetailsComponent,
    canActivate: [AuthGuard]
  },

  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
