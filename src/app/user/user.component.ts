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
    for (var i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == id) {
        this.posts.splice(i, 1);
        break;
      }
    }
      // this.posts.findIndex((e: any) => e.id == id)
      // console.log(index);
    // this.posts = this.posts.filter((posts: any) => posts.id !== id);
    this.userService.deleteUser(id).subscribe(data => {
      alert("User Deleted Successfuly!!")
      // console.log(data);
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
      // this.myFormGroupName = res;// ERROR TypeError: this.form.get is not a function
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
  get userId() {
    // console.log(this.myFormGroupName.get('userId'));
    
    return this.myFormGroupName.get('userId')!;
} 

}









    // this.id=id
    // console.log(this.posts[id]);
    // let post = this.posts[id];
    // this.myFormGroupName.patchValue({
    //   userid: post.userId,
    //   title: post.title,
    //   completed: post.completed
    // this.updateUserDetails();
  // updateUserDetails(value:any){
  //   this.userService.updateUser().subscribe(data=>{
  //    alert("Updated successs")
  //   })


    

    // this.userService.readUserDetails(id).subscribe((res: any) => {
    //   console.log(res);
    //   this.myFormGroupName=res;
    //   this.myFormGroupName.patchValue(
      // {userid:res.userId,
      // title:res.title,
      // completed:res.completed})


    //  this.updateUserDetails(this.value);
      // this.forms.controls["userid"].setValue(res.userId);
      // this.forms.controls["title"].setValue(res.title)
  // this.forms.controls["completed"].setValue(res.completed)
    // })
  
// }


// this.userService.updateUser(id,value).subscribe(data=>{
//   console.log(data);
//   alert("User updated successfully!")
// })