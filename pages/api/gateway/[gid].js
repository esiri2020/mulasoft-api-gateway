import clientPromise from "../../../lib/mongodb";
import {ObjectId} from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  // initialize mongo client and db
  const client = await clientPromise;
  const db = client.db("musala_soft_db");
  // get id of gateway from url query
  const gid = new ObjectId(req.query.gid)
  switch (req.method) {
    case "POST":
      let gatewayForUpdate, devices;
      switch (req.body.option){
        // to add device to gateway
        case 'addDevice':
          let {gateway, status, vendor} = req.body
          // get selected gateway from db
          gatewayForUpdate = await db.collection("Gateway_objects").findOne({ _id: gid });
          // validate length of peripheral devices
          if(gatewayForUpdate.Peripheral_Devices && gatewayForUpdate.Peripheral_Devices?.length>=10) {
            res.json({ status: 400, error: 'Cannot have more than 10 Peripheral Devices per Gateway' });
            break;
          }
          let date_created = new Date().toJSON()
          // add Peripheral_Device to gateway
          if (gatewayForUpdate.Peripheral_Devices?.length){
            devices = [...gatewayForUpdate.Peripheral_Devices, {UID: uuidv4(), 'Date created': date_created, vendor:vendor, status:status}]
          } else {
            devices = [{UID: uuidv4(), 'Date created': date_created, vendor:vendor, status:status}]
          }
          try {
            let result = await db.collection("Gateway_objects").findOneAndUpdate(
              { _id: gid },
              {$set: { Peripheral_Devices: devices }},
              {returnNewDocument : true}
            );
            res.json({status:200, data: result});
            break;
          }
          catch (error){
            res.json({status: 400, error: error})
            break;
          }
          break;
        case 'removeDevice':
        // extract uid from request body
          let {UID} = req.body
          gatewayForUpdate = await db.collection("Gateway_objects").findOne({ _id: gid });
          if (gatewayForUpdate.Peripheral_Devices?.length){
            // filter out Peripheral_Device to be removed
            devices = gatewayForUpdate.Peripheral_Devices?.filter(device => device.UID != UID)
            try {
              // update gateway device with new Peripheral_Devices list
              let result = await db.collection("Gateway_objects").findOneAndUpdate(
                { _id: gid },
                {$set: { Peripheral_Devices: devices }},
                {returnNewDocument : true}
              );
              res.json({status:200, data: result});
              break;
            }
            catch (error){
              res.json({status: 400, error: error})
              break;
            }
          } else {
            res.json({ status: 400, error: 'This gateway has no Peripheral devices' });
            break;
          }
          break;
      }
      break;
    case "GET":
      const response = await db.collection("Gateway_objects").findOne({ _id: gid });
      res.json({ status: 200, data: response });
      break;
  }
}
