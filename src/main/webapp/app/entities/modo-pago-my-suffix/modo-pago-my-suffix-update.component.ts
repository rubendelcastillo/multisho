import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IModoPagoMySuffix, ModoPagoMySuffix } from 'app/shared/model/modo-pago-my-suffix.model';
import { ModoPagoMySuffixService } from './modo-pago-my-suffix.service';

@Component({
  selector: 'jhi-modo-pago-my-suffix-update',
  templateUrl: './modo-pago-my-suffix-update.component.html'
})
export class ModoPagoMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idModoPago: [],
    descripcion: []
  });

  constructor(protected modoPagoService: ModoPagoMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modoPago }) => {
      this.updateForm(modoPago);
    });
  }

  updateForm(modoPago: IModoPagoMySuffix): void {
    this.editForm.patchValue({
      id: modoPago.id,
      idModoPago: modoPago.idModoPago,
      descripcion: modoPago.descripcion
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const modoPago = this.createFromForm();
    if (modoPago.id !== undefined) {
      this.subscribeToSaveResponse(this.modoPagoService.update(modoPago));
    } else {
      this.subscribeToSaveResponse(this.modoPagoService.create(modoPago));
    }
  }

  private createFromForm(): IModoPagoMySuffix {
    return {
      ...new ModoPagoMySuffix(),
      id: this.editForm.get(['id'])!.value,
      idModoPago: this.editForm.get(['idModoPago'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModoPagoMySuffix>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
