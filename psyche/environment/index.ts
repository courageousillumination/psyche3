class Environment {
  public restBackendHost: string = REST_BACKEND_HOST;
  public useRestBackend: boolean = USE_REST_BACKEND;
}

const env = new Environment();
export default env;
