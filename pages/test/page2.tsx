import React, { useEffect, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
// import { JWT } from 'google-auth-library';
import { gapi } from 'gapi-script';

const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

console.log(SPREADSHEET_ID)
console.log(CLIENT_EMAIL)
console.log(PRIVATE_KEY)
console.log('OK')

export default function GoogleSheetComponent() {

    const [data, setData] = useState<any[]>([]);
    // const [newRow, setNewRow] = useState({ name: '', age: '' });

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
                scope: SCOPES,
            }).then(() => {
                gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: SPREADSHEET_ID,
                    range: 'Sheet1!A1:E10',
                }).then((response: any) => {
                    const rows = response.result.values;
                    setData(rows);
                });
            });
        };

        gapi.load('client:auth2', initClient);
    }, []);


    return (
        <div>
            <h1>Google Sheets Data</h1>
            <ul>
                {data.map((row, index) => (
                    <li key={index}>{row.join(', ')}</li>
                ))}
            </ul>
        </div>
    );

    // return (
    //     <div>
    //         <h1>Google Sheets Data</h1>
    //         <ul>
    //             {data.map((row, index) => (
    //                 <li key={index}>{row.name} - {row.age}</li>
    //             ))}
    //         </ul>
    //         <h2>Add New Row</h2>
    //         <input
    //             type="text"
    //             placeholder="Name"
    //             value={newRow.name}
    //             onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
    //         />
    //         <input
    //             type="text"
    //             placeholder="Age"
    //             value={newRow.age}
    //             onChange={(e) => setNewRow({ ...newRow, age: e.target.value })}
    //         />
    //         <button onClick={addRow}>Add Row</button>
    //     </div>
    // );
}



// const GoogleSheetComponent: React.FC = () => {
//     const [data, setData] = useState<any[]>([]);
//     const [newRow, setNewRow] = useState({ name: '', age: '' });

//     useEffect(() => {
//         const fetchData = async () => {
//             const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
//             await doc.useServiceAccountAuth({
//                 client_email: CLIENT_EMAIL,
//                 private_key: PRIVATE_KEY,
//             });
//             await doc.loadInfo();
//             const sheet = doc.sheetsByIndex[0];
//             const rows = await sheet.getRows();
//             setData(rows);
//         };

//         fetchData();
//     }, []);

//     const addRow = async () => {
//         const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
//         await doc.useServiceAccountAuth({
//             client_email: CLIENT_EMAIL,
//             private_key: PRIVATE_KEY,
//         });
//         await doc.loadInfo();
//         const sheet = doc.sheetsByIndex[0];
//         await sheet.addRow(newRow);
//         setNewRow({ name: '', age: '' });
//         const rows = await sheet.getRows();
//         setData(rows);
//     };

//     return (
//         <div>
//             <h1>Google Sheets Data</h1>
//             <ul>
//                 {data.map((row, index) => (
//                     <li key={index}>{row.name} - {row.age}</li>
//                 ))}
//             </ul>
//             <h2>Add New Row</h2>
//             <input
//                 type="text"
//                 placeholder="Name"
//                 value={newRow.name}
//                 onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
//             />
//             <input
//                 type="text"
//                 placeholder="Age"
//                 value={newRow.age}
//                 onChange={(e) => setNewRow({ ...newRow, age: e.target.value })}
//             />
//             <button onClick={addRow}>Add Row</button>
//         </div>
//     );
// };

// export default GoogleSheetComponent;