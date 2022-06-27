import { of } from 'rxjs';

export class ClickPostService {
  getDocumentData() {
    return of([
      {
        id: 'Scan-to-File-2205170845128431',
        company: 'One Click Solutions',
        department: 'Development',
        surname: 'Donya',
        givenNames: 'Zafari',
        eMail: 'mohammad.zafari@oneclicksolutions.de',
        sender: 'Ausländerbehörder',
        subject: 'Blaukarte',
        date: '31.12.1982',
        note: 'No comment',
        images: [
          {
            id: 'Scan-to-File-2205170845217814',
          },
          {
            id: 'Scan-to-File-2205170845223375',
          },
          {
            id: 'Scan-to-File-2205170845225100',
          },
        ],
      },
      //   {
      //     id: 'Scan-to-File-2205170845128432',
      //     company: 'One Click Solutions',
      //     department: 'Development',
      //     surname: 'Donya',
      //     givenNames: 'Zafari',
      //     eMail: 'mohammad.zafari@oneclicksolutions.de',
      //     sender: 'Ausländerbehörder',
      //     subject: 'Blaukarte',
      //     date: '31.12.1982',
      //     note: 'No comment',
      //     images: [
      //       {
      //         id: 'Scan-to-File-2203031551493715',
      //       },
      //       {
      //         id: 'Scan-to-File-2205170845217999',
      //       },
      //       {
      //         id: 'Scan-to-File-2205170845223111',
      //       },
      //       {
      //         id: 'Scan-to-File-22051708452251441',
      //       },
      //     ],
      //   },
    ]);
  }
}
