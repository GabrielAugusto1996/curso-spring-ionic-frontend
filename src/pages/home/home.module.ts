import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    imports: [
        IonicPageModule.forChild(HomePage)
    ],
    declarations: [
        HomePage
    ]
})
export class HomeModule { }
