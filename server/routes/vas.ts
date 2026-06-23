import { RequestHandler } from "express";

const API_BASE = "http://68.183.88.91/adpoke/cnt";

function buildQuery(params: Record<string, string | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, value);
    }
  });
  return query.toString();
}

async function proxyGet(url: string) {
  const response = await fetch(url);
  const text = await response.text();

  try {
    return { status: response.status, data: JSON.parse(text) };
  } catch {
    return { status: response.status, data: { error: text } };
  }
}

export const handleStatus: RequestHandler = async (req, res) => {
  const { subid = "0", productcode, msisdn } = req.query;
  const query = buildQuery({
    subid: String(subid),
    productcode: productcode ? String(productcode) : undefined,
    msisdn: msisdn ? String(msisdn) : undefined,
  });
  const url = `${API_BASE}/sub/status?${query}`;
  const result = await proxyGet(url);
  res.status(result.status).json(result.data);
};

export const handleDetail: RequestHandler = async (req, res) => {
  const { subid = "0", productcode, msisdn } = req.query;
  const query = buildQuery({
    subid: String(subid),
    productcode: productcode ? String(productcode) : undefined,
    msisdn: msisdn ? String(msisdn) : undefined,
  });
  const url = `${API_BASE}/sub/detail?${query}`;
  const result = await proxyGet(url);
  res.status(result.status).json(result.data);
};

export const handleDeactivate: RequestHandler = async (req, res) => {
  const { subid = "0", productcode, msisdn } = req.query;
  const query = buildQuery({
    subid: String(subid),
    productcode: productcode ? String(productcode) : undefined,
    msisdn: msisdn ? String(msisdn) : undefined,
  });
  const url = `${API_BASE}/dct?${query}`;
  const result = await proxyGet(url);
  res.status(result.status).json(result.data);
};
