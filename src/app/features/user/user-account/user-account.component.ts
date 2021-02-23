import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ChangeUserPassword, UserAccount, UserAddress, UserAttachment, UserDetails, UserPaymentDetails } from 'src/app/models/user-models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  balance: number;

  userPassword: ChangeUserPassword = {};

  userAccount: UserAccount = {};

  get userAddress(): UserAddress {
    return this.userAccount.userAddress;
  }

  get userPayment(): UserPaymentDetails {
    return this.userAccount.paymentDetails
  }

  get userDetails() {
    return this.userAccount.userDetails;
  }

  attachment: UserAttachment = {};

  displayPasswordDialog: boolean = false;

  displayBalanceDialog: boolean = false;

  displayUploadDialog: boolean = false;

  month: SelectItem[] = [];

  yearOptions: SelectItem[] = [];

  @ViewChild('cardNumber2Input')
  cardNumber2Input: ElementRef;

  @ViewChild('cardNumber3Input')
  cardNumber3Input: ElementRef;

  @ViewChild('cardNumber4Input')
  cardNumber4Input: ElementRef;

  constructor(private readonly userService: UserService,
    private readonly messageService: MessageService) { }

  ngOnInit(): void {
    for (var item = 1; item <= 12; item++) {
      this.month.push({ value: item, label: item.toString() })
    }

    for (var item = 2020; item <= 2030; item++) {
      this.yearOptions.push({ value: item, label: item.toString() })
    }

    this.getUserAccount();
  }

  changePassword() {
    if (this.userPassword.newPassword != this.userPassword.repeatNewPassword) {
      this.messageService.add({ severity: 'error', detail: 'Passwords do not match', summary: 'Error' })
    }
    this.changeUserPassword();
  }

  uploadClick() {
    this.displayUploadDialog = true;
  }

  uploadAttachemnts(event: any) {
    this.userService.uploadUserAvatar(event.files[0]).subscribe(
      response => {
        this.userAccount.userDetails.avatarUrl = response.avatarUrl;
        this.displayUploadDialog = false;
      }
    )
  }

  removeClick() {
    this.removeAvatar();
  }

  balanceClick() {
    this.displayBalanceDialog = true;
  }

  addBalance() {
    this.addUserBalanace();
    this.displayBalanceDialog = false;
  }

  changePasswordClick() {
    this.displayPasswordDialog = true;
  }

  saveUserDetailsClick() {
    this.saveUserDetails();
  }

  saveUserAddressClick() {
    this.saveUserAddress();
  }

  saveUserPaymentDetailsClick() {
    this.saveUserPaymentDetails();
  }



  keyupCardNumber1(event: KeyboardEvent) {
    const inputElement = <HTMLInputElement>event.target;
    if (inputElement.value.length == 4) {
      (<HTMLInputElement>this.cardNumber2Input.nativeElement).focus();
      (<HTMLInputElement>this.cardNumber2Input.nativeElement).select();
    }
  }

  keyupCardNumber2(event: KeyboardEvent) {
    const inputElement = <HTMLInputElement>event.target;
    if (inputElement.value.length == 4) {
      (<HTMLInputElement>this.cardNumber3Input.nativeElement).focus();
      (<HTMLInputElement>this.cardNumber3Input.nativeElement).select();
    }
  }

  keyupCardNumber3(event: KeyboardEvent) {
    const inputElement = <HTMLInputElement>event.target;
    if (inputElement.value.length == 4) {
      (<HTMLInputElement>this.cardNumber4Input.nativeElement).focus();
      (<HTMLInputElement>this.cardNumber4Input.nativeElement).select();
    }
  }

  private removeAvatar() {
    this.userService.removeAvatar().subscribe(
      response => {
        this.userAccount.userDetails.avatarUrl = 'https://image.flaticon.com/icons/png/512/21/21294.png';
      }
    )
  }





  saveUserPaymentDetails() {
    this.userService.saveUserPaymentDetails(this.userPayment).subscribe(
      response => {

      }
    )
  }



  saveUserAddress() {
    this.userService.saveUserAddress(this.userAddress).subscribe(
      response => {

      }
    )
  }

  private addUserBalanace() {
    this.userService.addUserBalance(this.balance).subscribe(
      response => {
        this.getUserBalance();
      }
    )
  }

  private getUserBalance() {
    this.userService.getUserBalance().subscribe(
      resposne => {
        this.userAccount.userDetails.balance = resposne;
      }
    )
  }

  private changeUserPassword() {
    this.userService.changeUserPassword(this.userPassword).subscribe(
      response => {

      }
    )
  }

  private saveUserDetails() {
    this.userService.saveUserDetails(this.userAccount.userDetails).subscribe(
      response => {

      }
    )
  }


  private getUserAccount() {
    this.userService.getUserAccount().subscribe(
      response => {
        this.userAccount = response;
        if (this.userAccount.userDetails.avatarUrl == null) {
          this.userAccount.userDetails.avatarUrl = 'https://image.flaticon.com/icons/png/512/21/21294.png'
        }
      }
    )
  }
}
