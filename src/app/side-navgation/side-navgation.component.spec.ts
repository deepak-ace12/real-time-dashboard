
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavgationComponent } from './side-navgation.component';

describe('SideNavgationComponent', () => {
  let component: SideNavgationComponent;
  let fixture: ComponentFixture<SideNavgationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [SideNavgationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavgationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
