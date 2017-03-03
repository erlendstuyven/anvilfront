/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ChildAllowanceComponent} from "./childallowance/child-allowance.component";
import {ChildAllowanceService} from "./childallowance/child-allowance.service";
import {Http, ConnectionBackend, RequestOptions, BaseRequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      providers: [ChildAllowanceService],
      declarations: [
        AppComponent,
        ChildAllowanceComponent
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
