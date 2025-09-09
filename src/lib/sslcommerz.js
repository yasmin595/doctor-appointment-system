import axios from "axios";

function paymentInitDataProcess(data) {
    // optionally process data if needed
    return data;
}

export default class SslCommerzPayment {
    constructor(store_id, store_passwd, live = false) {
        this.baseURL = `https://${live ? "securepay" : "sandbox"}.sslcommerz.com`;
        this.initURL = this.baseURL + "/gwprocess/v4/api.php";
        this.store_id = store_id;
        this.store_passwd = store_passwd;
    }

    async init(data) {
        data.store_id = this.store_id;
        data.store_passwd = this.store_passwd;
        const processedData = paymentInitDataProcess(data);
        const response = await axios.post(this.initURL, processedData);
        return response.data;
    }
}
