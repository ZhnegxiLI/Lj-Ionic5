import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/common/utils.service';
import { OrderValidationService } from 'src/app/service/order-validation.service';

@Component({
  selector: 'app-read-sals-order',
  templateUrl: './read-sals-order.page.html',
  styleUrls: ['./read-sals-order.page.scss'],
})
export class ReadSalsOrderPage implements OnInit {
  categoryId: string;
  commandTypeId: string;
  commandTypeLabel: string;
  labelColor: string;
  loading = false;
  public step = 7;
  public counter = 0;
  public totalCount: number;
  private salsOrders: any[] = [];
  private userId: string;
  private hasChangeData = false;

  constructor(
    public orderService: OrderValidationService,
    public utilsService: UtilsService,
    private route: ActivatedRoute,
  ) {
  }

  get disableInfiniteScroll() {
    return this.totalCount && this.totalCount <= this.step * this.counter;
  }

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    this.categoryId = params.cateogryId;
    this.commandTypeId = params.commandTypeId;
    this.commandTypeLabel = params.commandTypeLabel;
    this.labelColor = this.commandTypeId === 'O' ? 'primary' : 'secondary';
    this.loadData(null);
  }

  async loadData(infiniteScroll) {
    this.userId = localStorage.getItem('userId');
    this.loading = true;

    const f = await this.orderService.getOrdersByUserId(this.userId, this.categoryId,
      this.commandTypeId, this.step, this.counter).toPromise();
    if (f.Success) {
      this.totalCount = f?.Data?.totalCount;
      if (!this.disableInfiniteScroll) {
        this.salsOrders = this.salsOrders.concat(f.Data.data != null ? f.Data.data : []);
        infiniteScroll?.target.complete();
      }
    } else {
      this.utilsService.createErrorToast(f.Msg);
    }
    this.loading = false;
  }

  async ionViewDidEnter() {
    if (this.hasChangeData) {
      await this.loadData(null);
    }
  }

  async doInfinite(infiniteScroll) {
    this.counter = this.counter + 1;
    await this.loadData(infiniteScroll);
  }
}
