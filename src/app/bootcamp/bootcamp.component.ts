import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bootcamp',
  templateUrl: './bootcamp.component.html',
  styleUrls: ['./bootcamp.component.css']
})
export class BootcampComponent implements OnInit {
  courses = [
    {
      title: 'Front-end',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'assets/images/education1.png',
      author: 'Mark Wilson',
      authorImage: 'https://cdn-icons-png.flaticon.com/128/456/456212.png',
      price: 'TND 500'
    },
    {
      title: 'Graphic & Web Design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'assets/images/education2.png',
      author: 'Jessica',
      authorImage: 'https://cdn-icons-png.flaticon.com/128/456/456212.png',
      price: 'TND 300'
    },
    {
      title: 'E-commerce',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'assets/images/education3.png',
      author: 'Catherine',
      authorImage: 'https://cdn-icons-png.flaticon.com/128/456/456212.png',
      price: 'TND 600'
    },
    {
      title: 'Back-end Developer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'assets/images/education4.png',
      author: 'Mark Wilson',
      authorImage: 'https://cdn-icons-png.flaticon.com/128/456/456212.png',
      price: 'TND 300'
    },
    {
      title: 'Business & Management',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'assets/images/education5.png',
      author: 'Jessica',
      authorImage: 'https://cdn-icons-png.flaticon.com/128/456/456212.png',
      price: 'Free'
    }
  ];

  currentIndex = 0;
  cardsToShow = 3;

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.courses.length - this.cardsToShow) {
      this.currentIndex += 1;
    }
  }
  loggedInUserName: string = '';
  userRating: number = 0;
  reviewText: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  reviews: { rating: number, text: string, userName: string}[] = [];


  onStarClick(star: number): void {
    this.userRating = star;

    // Remove yellow class from all stars
    document.querySelectorAll('.star').forEach((s: any) => {
      s.classList.remove('yellow');
    });

    // Add yellow class to stars up to the clicked star
    document.querySelectorAll('.star').forEach((s: any, index: number) => {
      if (index < star) {
        s.classList.add('yellow');
      }
    });
  }
  constructor(private _http: HttpClient,private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  submitReview(): void {
    const loggedInUser = this._http.get<any>("http://localhost:3000/signup")
    .subscribe(users => {
      
      if (!this.userRating || !this.reviewText) {
        alert("Please select a rating and provide a review before submitting.");
        return;
      }

      this.reviews.push({ rating: this.userRating, text: this.reviewText, userName: this.loggedInUserName});

      // Reset values
      this.reviewText = '';
      this.userRating = 0;

      // Remove yellow class from all stars
      document.querySelectorAll('.star').forEach((s: any) => {
        s.classList.remove('yellow');
      });
    });
  }

  editReview(index: number): void {
    const editedReview = prompt("Edit your review:", this.reviews[index].text);
    if (editedReview !== null) {
      this.reviews[index].text = editedReview;
    }
  }

  deleteReview(index: number): void {
    const confirmDelete = confirm("Are you sure you want to delete this review?");
    if (confirmDelete) {
      this.reviews.splice(index, 1);
    }
  }

  // Function to convert rating to an array of stars
  getStars(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i + 1);
  }


}

