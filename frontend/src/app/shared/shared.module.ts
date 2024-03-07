import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AppEmailDirective } from './validators/app-email.directive';
import { SlicePipe } from './pipes/slice.pipe';

@NgModule({
  declarations: [LoaderComponent, AppEmailDirective, SlicePipe],
  imports: [CommonModule],
  exports: [LoaderComponent, AppEmailDirective, SlicePipe],
})
export class SharedModule {}
