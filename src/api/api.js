import axios from "axios";


export const api = axios.create({ baseURL: process.env.REACT_APP_API });

// LOGIN PAGE API
export const LOGIN = (data) => api.post("/api/auth/login", data);

// FORGOT PAGE APIss
export const FORGOTPASS = (data) => api.post("/api/auth/forget-password", data);

// ENTERPRISE PAGE TABLE API
export const ENTERPRISETABLE = (header) =>
  api.get("/api/admin/get/enterprise/list/data", header);
// ADD ENTERPRISE MODEL PAGE API
export const ADDENTERPRISE = (data, header) =>
  api.post("/api/admin/add/enterprise", data, header);

  // EDIT ENTERPRISE
  export const EDITENTERPRISE = (EnterpriseId, data, header) => api.post(`/api/admin/update/enterprise/${EnterpriseId}`, data, header);

// STATE TABLE API
export const STATETABLE = (EnterpriseId, header) =>
  api.get(`/api/admin/get/enterprise/state/list/${EnterpriseId}`, header);
// STATE MODEL
export const ADDSTATELIST = (header) =>
  api.get(`/api/admin/get/all/states`, header);
  //    ADD STATE MODEL
export const ADDSTATE = (data,header) =>
api.post(`/api/admin/add/enterprise/state`,data, header);

// LOCATION TABLE API
export const LOCATIONTABLE =(EnterpriseId,StateId, header) => api.get(`/api/admin/get/enterprise/state/location/list/${EnterpriseId}/${StateId}`, header);

// ADD LOCATION MODEL
export const ADDLOCATION = (data,header) =>
api.post(`/api/admin/add/enterprise/state/location`,data, header);

// GATEWAY TABLE API
export const GATEWAYTABLE =(LocationId, header) => api.get(`/api/admin/get/enterprise/state/location/gateway/list/${LocationId}`, header);

// ADD GATEWAY 
export const GATEWAYMODEL =(data, header) => api.post(`/api/admin/add/gateway`,data, header);

// GATEWAY DETAILS
export const GATEWAYDETAILS =(Gateway_ID, header) => api.get(`/api/admin/get/gateway/details/${Gateway_ID}`, header);

// EDIT GATEWAY
export const EDITGATEWAY =(GatewayId,data, header) => api.post(`/api/admin/update/gateway/${GatewayId}`,data, header);

// OPTIMIZER TABLE API
export const OPTIMIZERTABLE =(GatewayId, header) => api.get(`/api/admin/get/enterprise/state/location/gateway/optimizer/list/${GatewayId}`, header);

// ADD OPTIMIZER
export const ADDOPTIMIZER =(data, header) => api.post(`/api/admin/add/optimizer`,data, header);

//EDIT OPTIMIZER
export const EDITOPTIMIZER =(OptimizerId, data, header) => api.post(`/api/admin/update/optimizer/${OptimizerId}`,data, header);

// OPTIMIZERDETAILS
export const OPTIMIZERDETAILS =(optimizerId, header) => api.get(`/api/admin/get/optimizer/details/${optimizerId}`, header);


// FOR USER PAGE TABLE API
export const USERAPILIST = (header) =>
  api.get("/api/admin/get/user/data", header);

// ADD ENTERPRISEuSER PAGE MODEL API
export const ADDENTERPRISELIST = (data, header) =>
  api.post("/api/admin/add/enterprise/user", data, header);
// ENTERPRISE LIST NAME MODEL API
export const ENTERPRISEUSERLIST = (header) =>
  api.get("/api/admin/get/enterprise/list/name", header);
// ADD SYSTEM INTEGRATOR PAGE MODEL API
export const ADDSYSTEMINTEGRATOR = (userData, header) =>
  api.post("/api/admin/add/system/integrator", userData, header);



  // Settings
  export const SET =(data, header) => api.post(`/api/hardware/optimizer/setting/value/update`,data, header);
  export const RESET =(Data, header) => api.post(`/api/hardware/reset/optimizer`,Data, header);

  // BY PASS
  export const BYPASS =(data, header) => api.post(`/api/hardware/bypass/optimizers`,data, header);

  //DELETE
  export const DELETE =(deleteData, header) => api.post(`/api/admin/delete/all`,deleteData, header);

  //Report
  export const METERDATA =(currentPage,data, header) => api.post(`/api/admin/get/all/meter/data?page=${currentPage}&pageSize=100`,data, header);
  export const DEVICEDATA =(currentPage,data, header) => api.post(`/api/admin/get/all/device/data?page=${currentPage}&pageSize=20`,data, header);