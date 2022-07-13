import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { GlobalModelService } from 'src/app/account/services/global-model.service';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(private globalModelSergvice: GlobalModelService) {}
  private hubConnection: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5232/LoadEngin')
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
  public scanToFileCreated = () => {
    this.hubConnection.on('ScanToFile_Created', (data) => {
      debugger;
      this.globalModelSergvice.scanToFile.push(data);
    });
  };
  public scanToFileDeleted = () => {
    this.hubConnection.on('ScanToFile_Deleted', (data) => {
      var index = this.globalModelSergvice.scanToFile.indexOf(data);
      this.globalModelSergvice.scanToFile.splice(index, 1);
    });
  };

  public scanWorkCreateListener = () => {
    this.hubConnection.on('ScanWorkCreated', (data) => {
      this.globalModelSergvice.scanToWork.push(data);
    });
  };
  public scanWorkDeleteListener = () => {
    this.hubConnection.on('ScanWorkDeleted', (data) => {
      var index = this.globalModelSergvice.scanToWork.indexOf(data);
      this.globalModelSergvice.scanToWork.splice(index, 1);
    });
  };
}
