import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ILocationMySuffix, LocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from './location-my-suffix.service';
import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { RegionMySuffixService } from 'app/entities/region-my-suffix/region-my-suffix.service';
import { IClientMySuffix } from 'app/shared/model/client-my-suffix.model';
import { ClientMySuffixService } from 'app/entities/client-my-suffix/client-my-suffix.service';

type SelectableEntity = IRegionMySuffix | IClientMySuffix;

@Component({
  selector: 'jhi-location-my-suffix-update',
  templateUrl: './location-my-suffix-update.component.html'
})
export class LocationMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  countries: IRegionMySuffix[] = [];

  clients: IClientMySuffix[] = [];

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
    protected locationService: LocationMySuffixService,
    protected regionService: RegionMySuffixService,
    protected clientService: ClientMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);

      this.regionService
        .query({ filter: 'location-is-null' })
        .pipe(
          map((res: HttpResponse<IRegionMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IRegionMySuffix[]) => {
          if (!location.countryId) {
            this.countries = resBody;
          } else {
            this.regionService
              .find(location.countryId)
              .pipe(
                map((subRes: HttpResponse<IRegionMySuffix>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRegionMySuffix[]) => {
                this.countries = concatRes;
              });
          }
        });

      this.clientService
        .query()
        .pipe(
          map((res: HttpResponse<IClientMySuffix[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IClientMySuffix[]) => (this.clients = resBody));
    });
  }

  updateForm(location: ILocationMySuffix): void {
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      streetAddress: this.editForm.get(['streetAddress'])!.value,
      complementaryInfo: this.editForm.get(['complementaryInfo'])!.value,
      number: this.editForm.get(['number'])!.value,
      mainDoor: this.editForm.get(['mainDoor'])!.value,
      flatDoor: this.editForm.get(['flatDoor'])!.value,
      level: this.editForm.get(['level'])!.value,
      stair: this.editForm.get(['stair'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      city: this.editForm.get(['city'])!.value,
      stateProvince: this.editForm.get(['stateProvince'])!.value,
      countryId: this.editForm.get(['countryId'])!.value,
      clientId: this.editForm.get(['clientId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocationMySuffix>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
