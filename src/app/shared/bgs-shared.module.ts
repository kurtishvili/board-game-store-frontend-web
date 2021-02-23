import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { LocalizePipe } from '../core/localization/localize.pipe';
import { FileUploadModule } from 'primeng/fileupload';
import { SecureUrlPipe } from '../core/secure-url.pipe';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedTagsComponent } from './shared-tags/shared-tags.component';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
    declarations: [
        LocalizePipe,
        SecureUrlPipe,
        SharedTagsComponent
    ],
    exports: [
        FormsModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        DropdownModule,
        LocalizePipe,
        FileUploadModule,
        SecureUrlPipe,
        CalendarModule,
        DialogModule,
        ConfirmDialogModule,
        TableModule,
        PaginatorModule
    ],
    providers: [
        ConfirmationService
    ]
})
export class BgsSharedModule { }