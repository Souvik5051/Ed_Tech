import { defaults } from "autoprefixer";
import axios from "axios";

const BASE_URL="http://localhost:5014/api/v1";

const axoisInstance=axios.create();

axoisInstance.defaults.baseURL=BASE_URL;
axoisInstance.defaults.withCredentials=true;

export default axoisInstance;





