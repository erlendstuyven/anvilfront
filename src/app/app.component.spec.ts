/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CalculationComponent} from "./calculation/calculation.component";
import {CalculationService} from "./calculation/calculation.service";
import {Http, ConnectionBackend, RequestOptions, BaseRequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      providers: [CalculationService],
      declarations: [
        AppComponent,
        CalculationComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
