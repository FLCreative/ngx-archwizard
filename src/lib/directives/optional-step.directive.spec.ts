import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WizardComponent } from '../components/wizard.component';
import { OptionalStepDirective } from './optional-step.directive';
import {WizardStepComponent} from '../components/wizard-step.component';

@Component({
  selector: 'aw-test-wizard',
  imports: [
    WizardComponent,
    WizardStepComponent,
    OptionalStepDirective
  ],
  template: `
    <aw-wizard>
      <aw-wizard-step stepTitle='Steptitle 1'>
        Step 1
      </aw-wizard-step>
      <aw-wizard-step stepTitle='Steptitle 2' awOptionalStep>
        Step 2
      </aw-wizard-step>
      <aw-wizard-step stepTitle='Steptitle 3' [awOptionalStep]="false">
        Step 3
      </aw-wizard-step>
    </aw-wizard>
  `
})
class WizardTestComponent {

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
}

describe('OptionalStepDirective', () => {
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

  it('should create an instance', () => {
    expect(wizardTestFixture.debugElement.query(By.directive(OptionalStepDirective))).toBeTruthy();
    expect(wizardTestFixture.debugElement.queryAll(By.directive(OptionalStepDirective)).length).toBe(2);
  });

  it('should set optional correctly', () => {
    expect(wizard.getStepAtIndex(0).optional).toBe(false);
    expect(wizard.getStepAtIndex(1).optional).toBe(true);
    expect(wizard.getStepAtIndex(2).optional).toBe(false);
  });
});
