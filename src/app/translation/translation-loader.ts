import { HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslationObject } from "@ngx-translate/core";
import { Observable } from "rxjs";

export class TranslationLoader implements TranslateLoader{
   constructor(private http:HttpClient){}

     getTranslation(lang: string): Observable<TranslationObject> {
        return this.http.get(`assets/i18n/${lang}.json`);
    }
    
}