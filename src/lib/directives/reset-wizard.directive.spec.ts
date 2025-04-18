import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WizardComponent } from '../components/wizard.component';
import { checkWizardState } from '../util/test-utils';
import { ResetWizardDirective } from './reset-wizard.directive';
import {WizardStepComponent} from '../components/wizard-step.component';

@Component({
  selector: 'aw-test-wizard',
  imports: [
    WizardComponent,
    WizardStepComponent,
    ResetWizardDirective
  ],
  template: `
    <aw-wizard>
      <aw-wizard-step stepTitle='Steptitle 1'>
        Step 1
      </aw-wizard-step>
      <aw-wizard-step stepTitle='Steptitle 2'>
        Step 2
        <button type="button" awResetWizard>
          Reset (normal)
        </button>
        <button type="button" awResetWizard (finalize)='cleanup()'>
          Reset (cleanup)
        </button>
      </aw-wizard-step>
    </aw-wizard>
  `
})
class WizardTestComponent {

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;

  public eventLog: Array<string> = [];

  public cleanup(): void {
    this.eventLog.push('Cleanup done!');
  }
}

describe('ResetWizardDirective', () => {
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
    expect(wizardTestFixture.debugElement.query(By.directive(ResetWizardDirective))).toBeTruthy();
    expect(wizardTestFixture.debugElement.queryAll(By.directive(ResetWizardDirective)).length).toBe(2);
  });

  it('should reset the wizard correctly without finalize input', fakeAsync(() => {
    const resetButtonEls = wizardTestFixture.debugElement.queryAll(By.directive(ResetWizardDirective));

    wizard.goToStep(1);
    tick();
    wizardTestFixture.detectChanges();

    checkWizardState(wizard, 1, false, [0], false);
    expect(wizardTest.eventLog).toEqual([]);

    resetButtonEls[0].nativeElement.click();
    tick();
    wizardTestFixture.detectChanges();

    checkWizardState(wizard, 0, false, [], false);
    expect(wizardTest.eventLog).toEqual([]);
  }));

  it('should reset the wizard correctly with finalize input', fakeAsync(() => {
    const resetButtonEls = wizardTestFixture.debugElement.queryAll(By.directive(ResetWizardDirective));

    wizard.goToStep(1);
    tick();
    wizardTestFixture.detectChanges();

    checkWizardState(wizard, 1, false, [0], false);
    expect(wizardTest.eventLog).toEqual([]);

    resetButtonEls[1].nativeElement.click();
    tick();
    wizardTestFixture.detectChanges();

    checkWizardState(wizard, 0, false, [], false);
    expect(wizardTest.eventLog).toEqual(['Cleanup done!']);
  }));
});
