import { ok, badRequest } from 'wix-http-functions';
import wixData from "wix-data";
import wixSecretsBackend from "wix-secrets-backend";

//https://yoavc4.wixstudio.io/code-demo/_functions/carsDetails

export async function get_carsDetails(request) {
  const headers = request.headers;
  if (!(await isPermitted(headers))) {
    const options = {
      body: {
        error: "Not authorized",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
    return badRequest(options);
  }
  
  // Code for authorized requests...
  const response = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const carsGallery = await wixData.query("VehicleModels").eq("available", true).find();
     const carsAvailable = carsGallery.items
     if (carsAvailable.length > 0) {
        response.body = {
          carsAvailable
        };
        return ok(response)
  } } 
  catch (error) {
    response.bodu = {
      "error" : error
    };
    return badRequest(response);
  }
}

async function isPermitted(headers) {
    try {
        const authHeader = headers.auth;
        const sharedAuthKey = await wixSecretsBackend.getSecret("branchKey");
        if (authHeader === sharedAuthKey) {
            return true;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
}