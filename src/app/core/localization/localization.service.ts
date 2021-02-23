import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Constants } from '../constants';
import { Language } from './langauge';

@Injectable({
    providedIn: 'root'
})

export class LocalizationService {
    private defaultLanguage: Language = { id: 1, name: 'ქართული', tag: 'ka-GE' };
    currentLangauge$: BehaviorSubject<Language> = new BehaviorSubject<Language>(this.defaultLanguage);

    get currentLanguage() {
        return this.currentLangauge$.value
    }

    setLanguage(langauge: Language): void {
        localStorage.setItem(Constants.KEY_LANGUAGE, JSON.stringify(langauge));

        window.location.reload();
    }
}