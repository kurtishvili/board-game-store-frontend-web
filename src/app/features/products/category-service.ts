import { Injectable } from "@angular/core";
import { HttpService } from 'src/app/core/http/http.service';
import { Artist, Designer, Mechanic } from 'src/app/models/categories.model';

const apiBaseUrl="http://localhost:56902/api/Category"

@Injectable()
export class Categoryservice {


    constructor(private readonly httpService : HttpService){}


    getArtists() {
        return this.httpService.get<Artist[]>(`${apiBaseUrl}/getArtists`)
    }

    getDesigners() {
        return this.httpService.get<Designer[]>(`${apiBaseUrl}/getDesigners`)
    }

    getMechanics() {
        return this.httpService.get<Mechanic[]>(`${apiBaseUrl}/getMechanics`)
    }

}