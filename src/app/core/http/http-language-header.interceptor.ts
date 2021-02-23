import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { LocalizationService } from '../localization/localization.service';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

    constructor(private readonly localizationService: LocalizationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            headers: request.headers.set('Accept-Language', this.localizationService.currentLanguage.tag)
        });
        return next.handle(request);
    }
}