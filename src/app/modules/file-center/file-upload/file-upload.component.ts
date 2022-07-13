import { AfterViewInit, Component, Injector } from '@angular/core';
import { TokenService } from 'src/app/account/services/token.service';
import { AppBaseComponent } from 'src/app/app-base.component';
declare var $: any;
declare var Dropzone: any;
@Component({
  selector: 'ocs-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent
  extends AppBaseComponent
  implements AfterViewInit
{
  constructor(injector: Injector) {
    super(injector);
  }
  ngAfterViewInit(): void {
    Dropzone.autoDiscover = false;

    var previewNode = document.querySelector('#template');
    previewNode!.id = '';
    var previewTemplate = previewNode!.parentNode!['innerHTML'];
    previewNode!['parentNode']?.removeChild(previewNode!);

    var myDropzone = new Dropzone(document.body, {
      url: this.baseUrl + '/api/File/Upload', // Set the url
      headers: { Authorization: 'Bearer ' + this.tokenService.getToken() },
      thumbnailWidth: 100,
      thumbnailHeight: 80,
      parallelUploads: 20,
      previewTemplate: previewTemplate,
      autoQueue: false,
      previewsContainer: '#previews',
      clickable: '.fileinput-button',
    });

    myDropzone.on('addedfile', function (file) {
      // Hookup the start button
      file.previewElement.querySelector('.start').onclick = function () {
        myDropzone.enqueueFile(file);
      };
    });

    // Update the total progress bar
    myDropzone.on('totaluploadprogress', function (progress) {
      document.querySelector('#total-progress .progress-bar')!['style.width'] =
        progress + '%';
    });

    myDropzone.on('sending', function (file) {
      document.querySelector('#total-progress')!['style.opacity'] = '1';
      file.previewElement
        .querySelector('.start')
        .setAttribute('disabled', 'disabled');
    });

    myDropzone.on('queuecomplete', function (progress) {
      document.querySelector('#total-progress')!['style.opacity'] = '0';
    });

    document.querySelector('#actions .start')!['onclick'] = function () {
      myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    };
    document.querySelector('#actions .cancel')!['onclick'] = function () {
      myDropzone.removeAllFiles(true);
    };
  }
}
