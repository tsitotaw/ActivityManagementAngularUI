import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeComponent } from './type/type.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { TypeDetailComponent } from './type/detail/detail.component';
import { CreateTypeComponent } from './type/create-type/create-type.component';
import {MatSelectModule} from '@angular/material/select';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { DetailComponent } from './category/detail/detail.component';

@NgModule({
  declarations: [
    TypeComponent,
    CategoryComponent,
    SubcategoryComponent,
    TypeDetailComponent,
    CreateTypeComponent,
    CreateCategoryComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'type', component:TypeComponent},
      {path: 'type/create', component:CreateTypeComponent},
      {path: 'type/:id', component:TypeDetailComponent},
      {path: 'category', component:CategoryComponent},
      {path: 'category/create', component:CreateCategoryComponent},
      {path: 'category/:id', component:DetailComponent},
      {path: 'subcategory', component:SubcategoryComponent},
    ]),
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class ActivityModule { }
