type TGeoData = {
  status: "success" | "fail";
  message?: string;
  country: string;
  city: string;
  lat: number;
  lon: number;
  isp: string;
  query: string;
};

const apiURL =
  "http://ip-api.com/json/{query}?fields=status,isp,message,country,city,lat,lon,query";

const getGetDetails = async (ip: string | string[]) => {
  const ipAddress = Array.isArray(ip) ? ip[0] : ip;
  const url = apiURL.replace("{query}", ipAddress);
  try {
    const response = await fetch(url);
    const data: TGeoData = await response.json();
    if (data.status === "fail") {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
};

export { getGetDetails };
