import { Component, OnInit } from '@angular/core';
import { OrderStatus } from 'src/app/enums/order.status.enum';
import { PaginatorModel } from 'src/app/models/paginator.model';
import { UserOrderItem } from 'src/app/models/user-models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  orders: UserOrderItem[] = [];

  paginator: PaginatorModel = new PaginatorModel(0, 15)
  order: UserOrderItem = {
    pageNumber: this.paginator.pageNumber,
    pageSize: this.paginator.pageSize
  }

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.getOrderItems();
    this.getOrdersCount();
  }

  getColor(statusId) {
    switch (statusId) {
      case OrderStatus.Pending:
        return '#2b78e4'
      case OrderStatus.Shiped:
        return '#e69138'
      case OrderStatus.Delivered:
        return '#009e0f'
    }
  }

  private getOrdersCount() {
    this.userService.getOrdersCount().subscribe(
      response => {
        this.paginator.totalRecords = response
      }
    )
  }

  onPaginate(event: { page: number, rows: number }) {
    this.paginator.pageNumber = event.page;
    this.paginator.pageSize = event.rows;

    this.getOrderItems();
  }



  private getOrderItems() {
    this.order.pageNumber = this.paginator.pageNumber;
    this.order.pageSize = this.paginator.pageSize;
    this.userService.getOrderItems(this.paginator.pageNumber, this.paginator.pageSize).subscribe(
      response => {
        this.orders = response;
      }
    )
  }
}
