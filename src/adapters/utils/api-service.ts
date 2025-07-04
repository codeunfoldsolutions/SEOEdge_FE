import axios, { AxiosResponse } from "axios";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

type Method = "POST" | "PUT" | "PATCH" | "DELETE";
type ContentType = "JSON" | "FormData";

type MutateArgs<R> = {
  slug?: string;
  payload: R;
  type: ContentType;
  method: Method;
};

class ApiService {
  public url: string;

  constructor(url: string) {
    this.url = url;
  }

  //getter method to fetch the auth token dynamically
  private get token(): string | null {
    const token = localStorage.getItem("token");
    return token;
  }

  //fetches all data
  async fetch<TData>(params: string): Promise<TData> {
    const res = await apiInstance.get(`${this.url}${params}`, {
      headers: { Authorization: `Bearer ${this.token} ` },
    });
    return res.data as TData;
  }

  // handles mutation requests => POST, PATCH, PUT, DELETE
  /* "slug" can be an id or an extra path to be added to the base url, 
  pass in an empty string if you have no need for a slug(POST methods only) */
  async mutate<TPayload, TResponse>({
    slug,
    payload,
    type,
    method,
  }: MutateArgs<TPayload>): Promise<AxiosResponse<TResponse>> {
    const token = this.token;
    const contentType =
      type === "FormData" ? "multipart/form-data" : "application/json";
    const url = `${this.url}${slug ? "/" + slug : ""}`;
    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": contentType,
    };

    const config = {
      method,
      url,
      [method === "DELETE" ? "data" : "data"]: payload,
      headers,
      // credentials: "include",
    };

    return await apiInstance.request<TResponse>(config);
  }
}

export default ApiService;
