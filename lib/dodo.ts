import DodoPayments from "dodopayments";
let client:DodoPayments|null=null;
export function getDodo(){const key=process.env.DODO_PAYMENTS_API_KEY;if(!key)throw new Error("DODO_NOT_CONFIGURED");client??=new DodoPayments({bearerToken:key,environment:(process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode"|"live_mode")??"test_mode"});return client}
export function getAppUrl(){return process.env.NEXT_PUBLIC_APP_URL||"http://localhost:3000"}
