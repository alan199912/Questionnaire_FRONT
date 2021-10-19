import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { InitialCounterComponent } from './initial-counter/initial-counter.component';
import { PlayQuestionnaireComponent } from './play-questionnaire/play-questionnaire.component';

@NgModule({
  declarations: [
    EnterNameComponent,
    InitialCounterComponent,
    PlayQuestionnaireComponent,
  ],
  imports: [CommonModule, PlayRoutingModule, SharedModule],
})
export class PlayModule {}
