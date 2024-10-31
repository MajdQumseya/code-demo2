
import { Permissions, webMethod } from "wix-web-module";
import wixData from "wix-data";

export const GetCarData = webMethod(Permissions.Anyone, async () => {
  const carsGalleryItems =  await wixData.query("VehicleModels").find();
  return carsGalleryItems.items
  })

export const runScheduledJob = webMethod(Permissions.Anyone, async () => {
  const getSomeData = "Some Data Recieved"
  return getSomeData
  })





