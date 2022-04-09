import { Component, OnInit} from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PROFILE } from 'src/app/app.model';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  isLoggedIn: string | null = localStorage.getItem('isUserLoggedIn')
  userId:string | null = localStorage.getItem('userId')
  
  constructor(private apiService: ApiServiceService, private router: Router, private route:ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.apiService.setJwtToken()
  }

  logout():void {
    localStorage.clear()
    location.reload()
  }

  profile():void
  {
    this.router.navigate([PROFILE],{relativeTo:this.route})
  }
}
