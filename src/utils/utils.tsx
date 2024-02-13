export interface Result {
  success: boolean;
  payload?: any;
  error?: any;
}

type Fetch = (path: string, body?: string) => Promise<Result>;

const PREFIX = 'http://localhost:8000/api/v1';
type METHODS = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';

async function fetchAPI(path: string, method: METHODS, body?: string): Promise<Result> {
  return new Promise((resolve) => {
    (async () => {
      try {
        const response = await fetch(`${PREFIX}/${path}`, { method, body, credentials: 'include' });
        resolve(await response.json());
      } catch {
        resolve({ success: false });
      }
    })();
  });
}

const GET: Fetch = async (path: string, body?: string) => fetchAPI(path, 'GET', body);
const HEAD: Fetch = async (path: string, body?: string) => fetchAPI(path, 'HEAD', body);
const POST: Fetch = async (path: string, body?: string) => fetchAPI(path, 'POST', body);
const PUT: Fetch = async (path: string, body?: string) => fetchAPI(path, 'PUT', body);
const DELETE: Fetch = async (path: string, body?: string) => fetchAPI(path, 'DELETE', body);

export {
  GET,
  POST,
  PUT,
  DELETE,
  HEAD,
};
