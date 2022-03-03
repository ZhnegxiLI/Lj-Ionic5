import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadSalsOrderCategoriesPage } from './read-sals-order-categories.page';

describe('ReadSalsOrderCategoriesPage', () => {
  let component: ReadSalsOrderCategoriesPage;
  let fixture: ComponentFixture<ReadSalsOrderCategoriesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadSalsOrderCategoriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadSalsOrderCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
