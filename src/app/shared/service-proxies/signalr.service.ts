import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { data } from 'jquery';
import { checkMargins } from 'ngx-bootstrap/positioning';
import { GlobalModelService } from 'src/app/account/services/global-model.service';
import { QueueMonitorFileListViewModel } from 'src/app/service-proxies/service-proxies';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(private globalModelSergvice: GlobalModelService) {}
  public hubConnection: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7232/LoadEngin')
      .build();
    this.createConnection();
    this.hubConnection.onclose(() => {
      alert('Starting');
      setTimeout(() => {
        this.createConnection();
      }, 2000);
    });
  };

  public createConnection() {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public serviceLogDetected = () => {
    this.hubConnection.on('logService', (data) => {
      this.globalModelSergvice.logs.push(data);
    });
  };

  public LoadEnginServiceStoped = () => {
    this.hubConnection.on('LoadEnginServiceStoped', (data) => {
      this.globalModelSergvice.loadEnginStarted = false;
    });
  };
  public LoadEnginServiceStarted = () => {
    this.hubConnection.on('LoadEnginServiceStarted', (data) => {
      this.globalModelSergvice.loadEnginStarted = true;
    });
  };

  public ocrAgentStoped = () => {
    this.hubConnection.on('OcrAgentStoped', (data) => {
      this.globalModelSergvice.ocrAgentStarted = false;
    });
  };

  public ocrAgentStarted = () => {
    this.hubConnection.on('OcrAgentStarted', (data) => {
      this.globalModelSergvice.ocrAgentStarted = true;
    });
  };

  public addressRecognitionStarted = () => {
    this.hubConnection.on('AddressRecognitionEngineStarted', (data) => {
      this.globalModelSergvice.addressRecognitionEngineStarted = true;
    });
  };

  public addressRecognitionSttoped = () => {
    this.hubConnection.on('AddressRecognitionEngineStoped', (data) => {
      this.globalModelSergvice.addressRecognitionEngineStarted = false;
    });
  };

  public scanQueueListener = () => {
    this.hubConnection.on('ScanQueue_Changed', (data) => {
      this.globalModelSergvice.scanQueue = data;
    });
  };
  public ocrQueueListener = () => {
    this.hubConnection.on('OCRQueue_Changed', (data) => {
      this.globalModelSergvice.ocrQueue = data;
    });
  };
  public addressQueueListener = () => {
    this.hubConnection.on('AddressQueue_Changed', (data) => {
      this.globalModelSergvice.addressQueue = data;
    });
  };
  public ocrEngineStarted = () => {
    this.hubConnection.on('OcrEngineStarted', (data) => {
      this.globalModelSergvice.ocrEngineStarted = true;
    });
  };
  public ocrEngineStoped = () => {
    this.hubConnection.on('OcrEngineStoped', (data) => {
      this.globalModelSergvice.ocrEngineStarted = false;
    });
  };

  public addressRecognitionOutQueueChangeListener = () => {
    this.hubConnection.on('AddressRecognitionOUteQueue_Changed', (data) => {
      this.globalModelSergvice.addressReqognitionOutQueue = data;
    });
  };

  public addressEngineStarted = () => {
    this.hubConnection.on('AddressEngineStarted', (data) => {
      this.globalModelSergvice.addressEngineStarted = true;
    });
  };
  public addressEngineStoped = () => {
    this.hubConnection.on('AddressEngineStoped', (data) => {
      this.globalModelSergvice.addressEngineStarted = false;
    });
  };

  public addressEngineQueueChangeListener = () => {
    this.hubConnection.on('AddressEngineQueue_Changed', (data) => {
      debugger;
      this.globalModelSergvice.addressEngineQueue = data;
    });
  };

  public sendMailEngineStarted = () => {
    this.hubConnection.on('SendMailEngineStarted', (data) => {
      this.globalModelSergvice.sendMailEngineStarted = true;
    });
  };
  public sendMailEngineStoped = () => {
    this.hubConnection.on('SendMailEngineStoped', (data) => {
      this.globalModelSergvice.sendMailEngineStarted = false;
    });
  };
  public sendMaulQueueChangeListener = () => {
    this.hubConnection.on('SendMailQueue_Changed', (data) => {
      debugger;
      this.globalModelSergvice.sendMailQueue = data;
    });
  };
}
