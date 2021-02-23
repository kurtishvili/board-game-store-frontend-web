import { Pipe, PipeTransform } from "@angular/core";
import { AppConfigurationService } from '../app-configuration/app.configuration.service';

@Pipe({
    name : 'localize'
})
export class LocalizePipe implements PipeTransform{

    constructor(private appConfigService : AppConfigurationService ) {}

    transform (value : string){
        if(!value)
            return;
        
            return this.appConfigService.getDictionary(value);
    }
}