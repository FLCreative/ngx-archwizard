import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WizardComponent } from '../components/wizard.component';
import { checkWizardState } from '../util/test-utils';
import {WizardStepComponent} from '../components/wizard-step.component';
import {WizardStepSymbolDirective} from './wizard-step-symbol.directive';
import {WizardCompletionStepComponent} from '../components/wizard-completion-step.component';

@Component({
  selector: 'aw-test-wizard',
  imports: [
    WizardComponent,
    WizardStepComponent,
    WizardStepSymbolDirective,
    WizardCompletionStepComponent
  ],
  template: `
    <aw-wizard>
      <aw-wizard-step stepTitle='Step A'>
        <ng-template awWizardStepSymbol let-wizardStep="wizardStep">
          {{ wizardStep.completed ? 'D' : '' }}{{ wizardStep.editing ? 'E' : '' }}{{ wizardStep.selected ? 'S' : '' }}A
        </ng-template>
        Step A content
      </aw-wizard-step>
      <aw-wizard-step stepTitle='Step B'>
        <ng-template awWizardStepSymbol>
          B
        </ng-template>
        Step B content
      </aw-wizard-step>
      <aw-wizard-completion-step stepTitle='Step C'>
        <ng-template awWizardStepSymbol>
          C
        </ng-template>
        Step C content
      </aw-wizard-completion-step>
    </aw-wizard>
  `
})
class WizardTestComponent {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
}

describe('WizardStepSymbolDirective', () => {
  let wizardTestFixture: ComponentFixture<WizardTestComponent>;

  let wizardTest: WizardTestComponent;
  let wizard: WizardComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WizardTestComponent],
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
    const navigationSymbolEls = wizardTestFixture.debugElement.queryAll(By.css('aw-wizard-navigation-bar ul li .step-indicator'));

    checkWizardState(wizard, 0, false, [], false);

    expect(navigationSymbolEls.length).toBe(3);
    expect(navigationSymbolEls[0].nativeElement.textContent.trim()).toBe('SA');
    expect(navigationSymbolEls[1].nativeElement.textContent.trim()).toBe('B');
    expect(navigationSymbolEls[2].nativeElement.textContent.trim()).toBe('C');
  });

  it('should change first navigation symbol correctly upon completion state change', fakeAsync(() => {
    const navigationSymbolEls = wizardTestFixture.debugElement.queryAll(By.css('aw-wizard-navigation-bar ul li .step-indicator'));

    // go to second step
    wizard.goToNextStep();
    tick();
    wizardTestFixture.detectChanges();

    checkWizardState(wizard, 1, false, [0], false);

    // "SA" should become "DA"
    expect(navigationSymbolEls.length).toBe(3);
    expect(navigationSymbolEls[0].nativeElement.textContent.trim()).toBe('DA');
    expect(navigationSymbolEls[1].nativeElement.textContent.trim()).toBe('B');
    expect(navigationSymbolEls[2].nativeElement.textContent.trim()).toBe('C');
  }));

  it('should change first navigation symbol correctly upon editing state change', fakeAsync(() => {
    const navigationSymbolEls = wizardTestFixture.debugElement.queryAll(By.css('aw-wizard-navigation-bar ul li .step-indicator'));

    // go to second step
    wizard.goToNextStep();
    tick();
    wizardTestFixture.detectChanges();

    // go to first step
    wizard.goToPreviousStep();
    tick();
    wizardTestFixture.detectChanges();

    checkWizardState(wizard, 0, true, [0], false);

    // "SA" should become "DESA"
    expect(navigationSymbolEls.length).toBe(3);
    expect(navigationSymbolEls[0].nativeElement.textContent.trim()).toBe('DESA');
    expect(navigationSymbolEls[1].nativeElement.textContent.trim()).toBe('B');
    expect(navigationSymbolEls[2].nativeElement.textContent.trim()).toBe('C');
  }));

  it('should change first navigation symbol correctly upon entering the completion step', fakeAsync(() => {
    const navigationSymbolEls = wizardTestFixture.debugElement.queryAll(By.css('aw-wizard-navigation-bar ul li .step-indicator'));

    // go to second step
    wizard.goToNextStep();
    tick();
    wizardTestFixture.detectChanges();

    // go to third step
    wizard.goToNextStep();
    tick();
    wizardTestFixture.detectChanges();

    checkWizardState(wizard, 2, false, [0, 1, 2], true);

    // "SA" should become "DA"
    expect(navigationSymbolEls.length).toBe(3);
    expect(navigationSymbolEls[0].nativeElement.textContent.trim()).toBe('DA');
    expect(navigationSymbolEls[1].nativeElement.textContent.trim()).toBe('B');
    expect(navigationSymbolEls[2].nativeElement.textContent.trim()).toBe('C');
  }));
});
