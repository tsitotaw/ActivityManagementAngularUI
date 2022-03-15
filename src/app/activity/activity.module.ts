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
import { DetailSubCategoryComponent } from './subcategory/detail/detail-sub-category.component';

@NgModule({
  declarations: [
    TypeComponent,
    CategoryComponent,
    SubcategoryComponent,
    TypeDetailComponent,
    CreateTypeComponent,
    DetailSubCategoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'type', component:TypeComponent},
      {path: 'type/create', component:CreateTypeComponent},
      {path: 'type/:id', component:TypeDetailComponent},
      {path: 'category', component:CategoryComponent},
      {path: 'subcategory', component:SubcategoryComponent},
      {path: 'subcategory/:typeid/detail/:categoryid/subcategory/:subcategoryid', component:DetailSubCategoryComponent},
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
