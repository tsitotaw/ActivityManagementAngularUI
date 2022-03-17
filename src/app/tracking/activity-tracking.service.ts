import { Injectable } from '@angular/core';
import { ConstantHelperService } from '../common/constant.service';
import { LocalHttpClient } from '../local-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ActivityTrackingService {
  constructor(
    private localHttpClient: LocalHttpClient,
    private constantHelperService: ConstantHelperService
  ) {}

  getActivityTracking() {
    return this.localHttpClient.get(
      this.constantHelperService.SERVER_API_URL + 'trackings'
    );
  }
  getActivityTrackingById(trackingId: string) {
    return this.localHttpClient.get(
      this.constantHelperService.SERVER_API_URL + 'trackings/' + trackingId
    );
  }

  getActivityTrackingDetailByTrackingId(trackingId: string) {
    return this.localHttpClient.get(
      this.constantHelperService.SERVER_API_URL +
        'trackings/' +
        trackingId +
        '/detail'
    );
  }

  addActivityTrackingDetail(trackingId: string, trackingDetail: any) {
    return this.localHttpClient.post(
      this.constantHelperService.SERVER_API_URL +
        'trackings/' +
        trackingId +
        '/detail',
      trackingDetail
    );
  }

  updateActivityTracking(trackingId: string, tracking: any) {
    return this.localHttpClient.put(
      this.constantHelperService.SERVER_API_URL + 'trackings/' + trackingId,
      tracking
    );
  }

  updateActivityTrackingDetail(
    trackingId: string,
    detailId: string,
    trackingDetail: any
  ) {
    return this.localHttpClient.put(
      this.constantHelperService.SERVER_API_URL +
        'trackings/' +
        trackingId +
        '/detail/' +
        detailId,
      trackingDetail
    );
  }

  saveActivityTracking(trackingDetail: any) {
    return this.localHttpClient.post(
      this.constantHelperService.SERVER_API_URL + 'trackings',
      trackingDetail
    );
  }
}
