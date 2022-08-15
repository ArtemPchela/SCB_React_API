import axios from 'axios';

const BASE_URL = "https://api.scb.se/OV0104/v1";

class ApiService {
  constructor(url) {
    this.sender = axios.create({
      baseURL: url
    })
  }

  getCategoryInformation = async (id, method, body) => {
    return method
      ? await this.sender({
        method,
        url: "/doris/en/ssd/START" + (id || ""),
        data: body ? body : null
      })
      /*/doris/sv/ssd/START in swedish language*/
      : await this.sender.post("/doris/en/ssd/START" + (id || ""));
  }
}

export default new ApiService(BASE_URL);
