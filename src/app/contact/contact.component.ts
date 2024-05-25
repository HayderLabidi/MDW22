import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }


  public sendEmail(event: Event): void {
    event.preventDefault();
    
    emailjs.sendForm('service_nvf3t3t', 'template_4gnlq15', event.target as HTMLFormElement, 'ensVGC4FONLuL3Byc')
      .then((result) => {
        console.log(result.text);
        alert('Message sent successfully!');
      }, (error) => {
        console.log(error.text);
        alert('There was an error sending your message.');
      });
  }

}
