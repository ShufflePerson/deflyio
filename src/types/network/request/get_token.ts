type r_get_token = {
  url: string;
  method: "POST";
  query: {
    r: string; //Region
    m: number; //Not sure
    u: string; //Username
    fu: string; //Full username
    s?: string; // Account token if signed in
  };
  body?: string; //JWT token for signed in account
};

export default r_get_token;
