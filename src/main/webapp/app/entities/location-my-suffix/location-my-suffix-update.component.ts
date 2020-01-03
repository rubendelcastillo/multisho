import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILocationMySuffix, LocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from './location-my-suffix.service';
import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { RegionMySuffixService } from 'app/entities/region-my-suffix';
import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from 'app/entities/client-my-suffix';

@Component({
  selector: 'jhi-location-my-suffix-update',
  templateUrl: './location-my-suffix-update.component.html'
})
export class LocationMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;

  countries: IRegionMySuffix[];

  clients: IClientMySuffix[];

  editForm = this.fb.group({
    id: [],
    streetAddress: [],
    complementaryInfo: [],
    number: [],
    mainDoor: [],
    flatDoor: [],
    level: [],
    stair: [],
    postalCode: [],
    city: [],
    stateProvince: [],
    countryId: [],
    clientId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected locationService: LocationMySuffixService,
    protected regionService: RegionMySuffixService,
    protected clientService: ClientMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);
    });
    this.regionService
      .query({ filter: 'location-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IRegionMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRegionMySuffix[]>) => response.body)
      )
      .subscribe(
        (res: IRegionMySuffix[]) => {
          if (!!this.editForm.get('countryId').value) {
            this.countries = res;
          } else {
            this.regionService
              .find(this.editForm.get('countryId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IRegionMySuffix>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IRegionMySuffix>) => subResponse.body)
              )
              .subscribe(
                (subRes: IRegionMySuffix) => (this.countries = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.clientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClientMySuffix[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClientMySuffix[]>) => response.body)
      )
      .subscribe((res: IClientMySuffix[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(location: ILocationMySuffix) {
    this.editForm.patchValue({
      id: location.id,
      streetAddress: location.streetAddress,
      complementaryInfo: location.complementaryInfo,
      number: location.number,
      mainDoor: location.mainDoor,
      flatDoor: location.flatDoor,
      level: location.level,
      stair: location.stair,
      postalCode: location.postalCode,
      city: location.city,
      stateProvince: location.stateProvince,
      countryId: location.countryId,
      clientId: location.clientId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const location = this.createFromForm();
    if (location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  private createFromForm(): ILocationMySuffix {
    return {
      ...new LocationMySuffix(),
      id: this.editForm.get(['id']).value,
      streetAddress: this.editForm.get(['streetAddress']).value,
      complementaryInfo: this.editForm.get(['complementaryInfo']).value,
      number: this.editForm.get(['number']).value,
      mainDoor: this.editForm.get(['mainDoor']).value,
      flatDoor: this.editForm.get(['flatDoor']).value,
      level: this.editForm.get(['level']).value,
      stair: this.editForm.get(['stair']).value,
      postalCode: this.editForm.get(['postalCode']).value,
      city: this.editForm.get(['city']).value,
      stateProvince: this.editForm.get(['stateProvince']).value,
      countryId: this.editForm.get(['countryId']).value,
      clientId: this.editForm.get(['clientId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocationMySuffix>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRegionById(index: number, item: IRegionMySuffix) {
    return item.id;
  }

  trackClientById(index: number, item: IClientMySuffix) {
    return item.id;
  }
}
