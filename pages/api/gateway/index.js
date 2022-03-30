import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  // initialize mongo client and db
  const client = await clientPromise;
  const db = client.db("musala_soft_db");
  // regex for IP address validation
  const rx = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/
  // console.log(req.body)
  switch (req.method) {
    case "POST":
      let {name, IPv4, USN, Peripheral_Devices} = req.body;
      // IP address validation
      if (!rx.test(IPv4)){
        res.json({ status: 400, error: 'Invalid IPv4 Address'})
        break
      }
      if (Peripheral_Devices && Peripheral_Devices.length > 10){
        res.json({ status: 400, error: 'Not more than 10 Peripheral Devices per Gateway'})
        break
      }
      // create mongo document JSON
      let bodyObject = {name: name, IPv4: IPv4, USN: USN, Peripheral_Devices: Peripheral_Devices}
      // insert in collection
      let newObject = await db.collection("Gateway_objects").insertOne(bodyObject);
      res.json({status: 200, newObject});
      break;
    case "GET":
      const gateway_objects = await db.collection("Gateway_objects").find({}).toArray();
      // return all gateway objects
      res.json({ status: 200, data: gateway_objects });
      break;
  }
}
