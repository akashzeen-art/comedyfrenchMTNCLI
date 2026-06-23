import { getCampaignUrl } from "@/config/vas";
import {
  getProductCode,
  getSubid,
  getMsisdn,
  normalizeMsisdn,
} from "@/lib/subscriber";

export interface StatusResponse {
  status: string | number;
  msisdn?: string;
  validityfrom?: string;
  validityto?: string;
  valid_from?: string;
  valid_to?: string;
}

export interface DetailResponse {
  msisdn: string;
  valid_from?: string;
  valid_to?: string;
  validityfrom?: string;
  validityto?: string;
  status: string | number;
  service_name?: string;
}

function isActive(status: string | number | undefined | null): boolean {
  return String(status) === "1";
}

export function isActiveStatus(status: string | number | undefined | null) {
  return isActive(status);
}

async function apiFetch<T>(
  path: string,
  params: Record<string, string>,
): Promise<T> {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`/api/vas/${path}?${query}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function baseParams(subid?: string, productcode?: string, msisdn?: string) {
  const params: Record<string, string> = {
    subid: subid ?? getSubid(),
    productcode: productcode ?? getProductCode(),
  };
  const phone = msisdn ?? getMsisdn();
  if (phone) {
    params.msisdn = normalizeMsisdn(phone);
  }
  return params;
}

export async function checkSubscriptionStatus(
  subid?: string,
  productcode?: string,
  msisdn?: string,
): Promise<StatusResponse> {
  return apiFetch<StatusResponse>("status", baseParams(subid, productcode, msisdn));
}

export async function getAccountDetails(
  subid?: string,
  productcode?: string,
  msisdn?: string,
): Promise<DetailResponse> {
  const params = { ...baseParams(subid, productcode) };
  const phone = msisdn ?? getMsisdn();
  if (phone) {
    return apiFetch<DetailResponse>("detail", {
      ...params,
      msisdn: normalizeMsisdn(phone),
    });
  }
  return apiFetch<DetailResponse>("detail", params);
}

export async function deactivateSubscription(
  subid?: string,
  productcode?: string,
  msisdn?: string,
): Promise<unknown> {
  const params = { ...baseParams(subid, productcode) };
  const phone = msisdn ?? getMsisdn();
  if (phone) {
    return apiFetch("deactivate", { ...params, msisdn: normalizeMsisdn(phone) });
  }
  return apiFetch("deactivate", params);
}

export function redirectToCampaign(
  subid?: string,
  productcode?: string,
  _msisdn?: string,
) {
  window.location.href = getCampaignUrl(
    subid ?? getSubid(),
    productcode ?? getProductCode(),
  );
}

export { isActive };
