import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WizardComponent } from '../components/wizard.component';
import { MovingDirection } from '../util/moving-direction.enum';
import { WizardCompletionStepDirective } from './wizard-completion-step.directive';
import {WizardStepComponent} from '../components/wizard-step.component';
import {OptionalStepDirective} from './optional-step.directive';

@Component({
  selector: 'aw-test-wizard',
  imports: [
    WizardComponent,
    WizardStepComponent,
    OptionalStepDirective,
    WizardCompletionStepDirective
  ],
  template: `
    <aw-wizard>
      <aw-wizard-step stepTitle='Steptitle 1' (stepEnter)="enterInto($event, 1)" (stepExit)="exitFrom($event, 1)">
        Step 1
      </aw-wizard-step>
      <aw-wizard-step stepTitle='Steptitle 2' [canExit]="isValid" awOptionalStep (stepEnter)="enterInto($event, 2)"
                      (stepExit)="exitFrom($event, 2)">
        Step 2
      </aw-wizard-step>
      <div awWizardCompletionStep stepTitle='Completion steptitle 3' (stepEnter)="enterInto($event, 3)">
        Step 3
      </div>
    </aw-wizard>
  `
})
class WizardTestComponent {

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;

  public isValid: any = true;

  public eventLog: Array<string> = [];

  public enterInto(direction: MovingDirection, destination: number): void {
    this.eventLog.push(`enter ${MovingDirection[direction]} ${destination}`);
  }

  public exitFrom(direction: MovingDirection, source: number): void {
    this.eventLog.push(`exit ${MovingDirection[direction]} ${source}`);
  }
}

describe('WizardCompletionStepDirective', () => {
  let wizardTestFixture: ComponentFixture<WizardTestComponent>;

  let wizardTest: WizardTestComponent;
  let wizard: WizardComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WizardTestComponent]
    }).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    wizardTestFixture = TestBed.createComponent(WizardTestComponent);
    wizardTestFixture.detectChanges();

    wizardTest = wizardTestFixture.componentInstance;
    wizard = wizardTest.wizard;

    // wait a tick to ensure that the initialization has been completed
    tick();
    wizardTestFixture.detectChanges();
  }));

  it('should create', () => {
    expect(wizardTest).toBeTruthy();
    expect(wizardTestFixture.debugElement.queryAll(By.css('aw-wizard-step')).length).toBe(2);
    expect(wizardTestFixture.debugElement.queryAll(By.directive(WizardCompletionStepDirective)).length).toBe(1);
  });
});
