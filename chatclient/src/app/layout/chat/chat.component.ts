import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  userList: Array<any>;
  users: Array<any>;
  sendForm: FormGroup;
  public username: string;
  constructor(
    public userService: UserService,
    public chatService: ChatService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(data => {
        this.username = data.data.userName;
        console.log(this.username);
        this.chatService.connect(this.username, () => {
          this.getUsersList();
        });
      });
    this.sendForm = this.formBuilder.group({
      message: ['', Validators.required],
    });

  }
  getUsersList(): void {
    this.userService.getUserList()
      .subscribe(data => {
        this.users = data;
        console.log(this.users);
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].userName == this.username) {
            this.users.splice(i, 1);
          }
        }
        console.log(this.users);
        this.userList = this.users;
        console.log(this.userList);
    
        this.chatService.getActiveList();
      });


  }

  
}
