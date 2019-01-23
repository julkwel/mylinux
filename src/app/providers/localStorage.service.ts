import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    value: any;
    constructor() {}

    /**
     * Set localStorage
     * @param cle
     * @param nom
     */
    setLocalstorage(cle, nom) {
        localStorage.setItem(cle, JSON.stringify(nom));
    }

    /**
     * Get localStorage
     * @param cle
     */
    getLocalstorage(cle) {
        return JSON.parse(localStorage.getItem(cle));
    }

    /**
     * Remove localStorage
     * @param cle
     */
    delLocalStorage(cle) {
        localStorage.removeItem(cle);
    }
}
