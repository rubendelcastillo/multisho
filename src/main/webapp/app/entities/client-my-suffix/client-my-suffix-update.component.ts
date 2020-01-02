import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IClientMySuffix, ClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from './client-my-suffix.service';

@Component({
  selector: 'jhi-client-my-suffix-update',
  templateUrl: './client-my-suffix-update.component.html'
})
export class ClientMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  endDateDp: any;

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    creationDate: [],
    endDate: [],
    documentId: [],
    documentType: []
  });

  constructor(protected clientService: ClientMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);
    });
  }

  updateForm(client: IClientMySuffix): void {
    this.editForm.patchValue({
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phoneNumber: client.phoneNumber,
      creationDate: client.creationDate != null ? client.creationDate.format(DATE_TIME_FORMAT) : null,
      endDate: client.endDate,
      documentId: client.documentId,
      documentType: client.documentType
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  private createFromForm(): IClientMySuffix {
    return {
      ...new ClientMySuffix(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      creationDate:
        this.editForm.get(['creationDate'])!.value != null
          ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
          : undefined,
      endDate: this.editForm.get(['endDate'])!.value,
      documentId: this.editForm.get(['documentId'])!.value,
      documentType: this.editForm.get(['documentType'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClientMySuffix>>): void {
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
