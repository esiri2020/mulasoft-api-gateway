import clientPromise from "../../../lib/mongodb";
// import { v4 as uuidv4 } from 'uuid';
// let data = {
//   // _id: '62404693edb3625d41de7dd0',
//  name: 'Gateway 1',
//  IPv4: '192.168.0.10',
//  Peripheral_Devices: [
//    {
//      // UID: 1,
//      vendor: 'Samsung',
//      date_created: '2022-03-27T11:23:56.725Z',
//      status: true
//    },
//    {
//      // UID: 2,
//      vendor: 'LG',
//      date_created: '2022-03-27T11:32:07.598Z',
//      status: false
//    }
//  ],
//  USN: '55123311'
// }

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("musala_soft_db");
  const rx = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/
  console.log(req.body)
  switch (req.method) {
    case "POST":
      let {name, IPv4, USN, Peripheral_Devices} = req.body;
      // Validation
      if (!rx.test(IPv4)){
        res.json({ status: 400, error: 'Invalid IPv4 Address'})
        break
      }
      if (Peripheral_Devices && Peripheral_Devices.length > 10){
        res.json({ status: 400, error: 'Not more than 10 Peripheral Devices per Gateway'})
        break
      }
      let bodyObject = {name: name, IPv4: IPv4, USN: USN, Peripheral_Devices: Peripheral_Devices}
      let newObject = await db.collection("Gateway_objects").insertOne(bodyObject);
      console.log(newObject)
      res.json({status: 200, newObject});
      break;
    case "GET":
      const gateway_objects = await db.collection("Gateway_objects").find({}).toArray();
      res.json({ status: 200, data: gateway_objects });
      break;
  }
}
