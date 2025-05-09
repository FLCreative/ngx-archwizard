import { Component, forwardRef, Host, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WizardComponent } from '../components/wizard.component';
import { MovingDirection } from '../util/moving-direction.enum';
import { WizardStepDirective } from './wizard-step.directive';
import {OptionalStepDirective} from './optional-step.directive';

@Component({
  selector: 'aw-test-wizard-step',
  template: `
    Step 2
  `
})
class WizardStepTestComponent {
  constructor(@Host() private wizardStep: WizardStepDirective, wizard: WizardTestComponent) {
  }
}

@Component({
  selector: 'aw-test-wizard',
  imports: [
    WizardComponent,
    WizardStepDirective,
    OptionalStepDirective,
    WizardStepTestComponent
  ],
  template: `
    <aw-wizard>
      <div awWizardStep stepTitle='Steptitle 1' (stepEnter)="enterInto($event, 1)" (stepExit)="exitFrom($event, 1)">
        Step 1
      </div>
      <aw-test-wizard-step awWizardStep stepTitle='Steptitle 2' awOptionalStep>
        Step 2
      </aw-test-wizard-step>
      <div awWizardStep stepTitle='Steptitle 3' (stepEnter)="enterInto($event, 3)" (stepExit)="exitFrom($event, 3)">
        Step 3
      </div>
    </aw-wizard>
  `
})
class WizardTestComponent {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;

  @ViewChild(forwardRef(() => WizardStepTestComponent))
  public wizardStepTestComponent;

  public eventLog: Array<string> = [];

  public enterInto(direction: MovingDirection, destination: number): void {
    this.eventLog.push(`enter ${MovingDirection[direction]} ${destination}`);
  }

  public exitFrom(direction: MovingDirection, source: number): void {
    this.eventLog.push(`exit ${MovingDirection[direction]} ${source}`);
  }
}

describe('WizardStepDirective', () => {
  let wizardTestFixture: ComponentFixture<WizardTestComponent>;

  let wizardTest: WizardTestComponent;
  let wizard: WizardComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WizardTestComponent, WizardStepTestComponent]
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
    expect(wizardTestFixture.debugElement.queryAll(By.directive(WizardStepDirective)).length).toBe(3);
  });
});
