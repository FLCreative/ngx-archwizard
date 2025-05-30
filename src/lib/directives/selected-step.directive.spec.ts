import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WizardComponent } from '../components/wizard.component';
import { SelectedStepDirective } from './selected-step.directive';
import {WizardStepComponent} from '../components/wizard-step.component';

@Component({
  selector: 'aw-test-wizard',
  imports: [
    WizardComponent,
    WizardStepComponent,
    SelectedStepDirective
  ],
  template: `
    <aw-wizard navigationMode="free">
      <aw-wizard-step stepTitle='Steptitle 1'>
        Step 1
      </aw-wizard-step>
      <aw-wizard-step stepTitle='Steptitle 2' awSelectedStep>
        Step 2
      </aw-wizard-step>
      <aw-wizard-step stepTitle='Steptitle 3'>
        Step 3
      </aw-wizard-step>
    </aw-wizard>
  `
})
class WizardTestComponent {

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
}

describe('SelectedStepDirective', () => {
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
    expect(wizardTestFixture.debugElement.query(By.directive(SelectedStepDirective))).toBeTruthy();
    expect(wizardTestFixture.debugElement.queryAll(By.directive(SelectedStepDirective)).length).toBe(1);
  });

  it('should set optional correctly', () => {
    expect(wizard.defaultStepIndex).toBe(1);
    expect(wizard.currentStepIndex).toBe(1);
  });

  it('should reset correctly to the default selected step', fakeAsync(() => {
    wizard.goToStep(0);
    tick();
    wizardTestFixture.detectChanges();

    expect(wizard.currentStepIndex).toBe(0);

    wizard.reset();
    wizardTestFixture.detectChanges();

    expect(wizard.currentStepIndex).toBe(1);
  }));
});
