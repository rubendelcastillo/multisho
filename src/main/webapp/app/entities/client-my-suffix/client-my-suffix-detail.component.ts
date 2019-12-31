import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';

@Component({
  selector: 'jhi-client-my-suffix-detail',
  templateUrl: './client-my-suffix-detail.component.html'
})
export class ClientMySuffixDetailComponent implements OnInit {
  client: IClientMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.client = client;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
