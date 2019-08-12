class Environment {
  public restBackendHost: string = process.env.REST_BACKEND_HOST || "";
  public useRestBackend: boolean = !!process.env.USE_REST_BACKEND || false;
  public apiToken: string = localStorage.getItem("apiToken") || "";
}

const env = new Environment();
export default env;
