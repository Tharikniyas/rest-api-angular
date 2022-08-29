import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl ,FormBuilder,Validators} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  myFormGroupName!: FormGroup;
  posts: any = [];
  user: any = []
  value: any;
  primaryId: any={};
  submitted = false;
  constructor(
    private userService: UserService,
    private fb: FormBuilder) { }
  ngOnInit(): void {
    this.getUser();
    this.myFormGroupName = this.fb.group({
      userId: ["",[Validators.required,Validators.maxLength(3)]],
      title: ["",[Validators.required,Validators.minLength(10),]],
      completed: ['', Validators.required]
    })
  }
  getUser() {
    this.userService.getUser().subscribe(data => {
      this.posts = data;
    });
  }
  createUser() {
    this.submitted=true;
    if(this.myFormGroupName.valid){
    this.userService.createUser(this.myFormGroupName.value).subscribe(value => {
      console.log(this.posts);
      console.log(value);
      this.posts.push(value);
      alert("User Added Successfully")
    })
  }
  else{
    alert("Fill the all Elements")
  }
  }
  deleteUser(id: number) {
    for (var j in this.posts) {
      if (this.posts[j].id == id) {
        this.posts.splice(j, 1)
      }
    }
    // var index = this.posts.findIndex((e: any) => e.id == id)
    // if (index > -1) {
    //   this.posts.splice(index, 1);
    // }
    this.userService.deleteUser(id).subscribe(data => {
      alert("User Deleted Successfuly!!")
    })
  }
  updateUser(id: any) {
    this.primaryId = id;
    console.log(this.primaryId);
    console.log(this.posts[id]);
    let post = this.posts[id];
    this.myFormGroupName.patchValue({
      userId: post.userId,
      title: post.title,
      completed: post.completed
    })
    this.userService.readUserDetails(id).subscribe((res: any) => {
      console.log(res);
     });
  }
  updateUserDetails() {
    this.userService.updateUser(this.myFormGroupName.value, this.primaryId).subscribe(data => {
      console.log(data);
      alert("User updated successfully!")
    })
  }
  get myFormControls () {
    return this.myFormGroupName.controls;
  }
}

