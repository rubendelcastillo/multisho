import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IModoEnvioMySuffix, ModoEnvioMySuffix } from 'app/shared/model/modo-envio-my-suffix.model';
import { ModoEnvioMySuffixService } from './modo-envio-my-suffix.service';

@Component({
  selector: 'jhi-modo-envio-my-suffix-update',
  templateUrl: './modo-envio-my-suffix-update.component.html'
})
export class ModoEnvioMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    modoEnvio: [null, [Validators.required]]
  });

  constructor(protected modoEnvioService: ModoEnvioMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modoEnvio }) => {
      this.updateForm(modoEnvio);
    });
  }

  updateForm(modoEnvio: IModoEnvioMySuffix): void {
    this.editForm.patchValue({
      id: modoEnvio.id,
      modoEnvio: modoEnvio.modoEnvio
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const modoEnvio = this.createFromForm();
    if (modoEnvio.id !== undefined) {
      this.subscribeToSaveResponse(this.modoEnvioService.update(modoEnvio));
    } else {
      this.subscribeToSaveResponse(this.modoEnvioService.create(modoEnvio));
    }
  }

  private createFromForm(): IModoEnvioMySuffix {
    return {
      ...new ModoEnvioMySuffix(),
      id: this.editForm.get(['id'])!.value,
      modoEnvio: this.editForm.get(['modoEnvio'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModoEnvioMySuffix>>): void {
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
