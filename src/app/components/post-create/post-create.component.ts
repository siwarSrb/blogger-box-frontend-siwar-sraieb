import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../data/category';
import { CategoryService } from '../../services/categoryService';
import { PostService } from '../../services/post.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  availableCategories: Category[] = [];
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private postService: PostService,
    private router: Router
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150)
      ]],
      categoryId: ['', Validators.required],
      content: ['', [
        Validators.required,
        Validators.maxLength(2500)
      ]]
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.availableCategories = categories;
    });
  }

  get title() { return this.postForm.get('title'); }
  get categoryId() { return this.postForm.get('categoryId'); }
  get content() { return this.postForm.get('content'); }

  onSubmit(): void {
    if (this.postForm.invalid) {
      Object.keys(this.postForm.controls).forEach(key => {
        const control = this.postForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    const { title, categoryId, content } = this.postForm.value;

    this.postService.createPost(title, content, categoryId).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: Error) => {
        console.error('Error creating post', error);
        this.isSubmitting = false;
      }
    });
  }
}
