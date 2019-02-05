import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as shell from "shelljs"
import * as exec from 'shelljs.exec'
import {NgForm} from "@angular/forms";
import {Commande} from "../../utils/Commande";
import {LocalStorageService} from "../../providers/localStorage.service";
import {test} from "shelljs";
import {AppGit} from "../../utils/AppGit";
import * as root from 'sudo-prompt'
import {element} from "protractor";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    file: any;
    removeFile: any;
    dossier: any;
    name: any;
    path: any;
    option: any;
    angular: boolean;
    react: boolean;
    electron: boolean;
    my_apps: any;
    app_name: any;
    listFile : any;
    listdir = [];
    headElements = ['directory','action'];

    constructor(private router: Router,
                private localStorage: LocalStorageService) {
    }

    ngOnInit() {
        document.body.style.overflow = "visible";
        this.name = this.localStorage.getLocalstorage('nom');
    }

    home() {
        this.router.navigate(['']);
    }

    createApp(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var nameApp = target.attributes.name.value;

        if (nameApp == 0) {
            this.angular = true;
            this.react = false;
            this.electron = false;
        } else if (nameApp == 1) {
            this.react = true;
            this.angular = false;
            this.electron = false;
        } else {
            this.electron = true;
            this.react = false;
            this.angular = false;
        }
        this.my_apps = nameApp;
    }

    logout() {
        exec('logout');
    }


    /**
     * execution sudo commande
     */
    testeRoot(){
        var  options = {
            name: 'jul',
        };
        root.exec("reboot",options,function (error, stdout,stderr) {
          if (error)   throw error;
          console.log('stdout:' + stdout);
        })
    }
    /**
     * Création fichiers
     * @param form
     */
    create(form: NgForm) {
        shell.touch(this.file);
        form.reset();
    }

    /**
     * Suppression fichier
     * @param form
     */
    fafao(form: NgForm) {
        exec('rm -rf ' + this.removeFile, {silent: true});
        form.reset();
    }

    searchFile(){
       this.listdir = shell.ls(this.listFile);
    }

    deleteDir(el){
        exec('rm -rf '+ this.listFile+'/'+el, {silent: true});
    }

    /**
     * Create application
     * @param form
     */
    createApps(form: NgForm) {
        if (test('-d', this.path) && test('-e', this.path)) {
            shell.cd(this.path);
            if (!shell.which('git')) {
                window.alert('Sorry, this script requires git');
                shell.exit(1);
            } else {
                if (this.my_apps == 1) {
                    var url_app = AppGit.react
                } else if (this.my_apps == 2) {
                    var url_app = AppGit.electron
                } else {
                    var url_app = AppGit.angular
                }
                console.log(url_app);
                const {stdout, stderr, code} = exec(url_app + ' ' + this.app_name, {async: true});
                let mylinux_retour = {stdout, stderr, code};
                if (mylinux_retour.code == 0) {
                    shell.cd(this.app_name);
                    exec('npm install', {silent: true, async: true});
                    window.alert("Your app is ready");
                } else {
                    window.alert("An error occured, would your system have a git or angular-cli? ")
                }
            }
            form.reset();
        } else {
            window.alert("Path not exist or" + this.path + "is not a directory");
        }
        form.reset();
    }

    /**
     * Mamorona dossier
     */
    mamorona(form: NgForm) {
        shell.mkdir('-p', this.dossier);
        form.reset();
    }

    startApache() {
        exec(Commande.apache, {silent: true});
    }

    startStorm() {
        exec(Commande.phpstorm, {silent: true});
    }

    startChrome() {
        exec(Commande.chrome, {silent: true});
    }

    systReboot() {
        exec(Commande.mamelona_indray, {silent: true});
    }

    systShutdown() {
        exec(Commande.mamono, {silent: true});
    }

    startAll() {
        this.startChrome();
        this.startApache();
        this.startStorm();
    }
}
