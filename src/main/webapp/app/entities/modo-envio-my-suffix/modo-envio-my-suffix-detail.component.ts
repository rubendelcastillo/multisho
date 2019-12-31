import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IModoEnvioMySuffix } from 'app/shared/model/modo-envio-my-suffix.model';

@Component({
  selector: 'jhi-modo-envio-my-suffix-detail',
  templateUrl: './modo-envio-my-suffix-detail.component.html'
})
export class ModoEnvioMySuffixDetailComponent implements OnInit {
  modoEnvio: IModoEnvioMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modoEnvio }) => {
      this.modoEnvio = modoEnvio;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
