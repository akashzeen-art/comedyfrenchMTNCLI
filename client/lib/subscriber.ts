import { VAS_CONFIG } from "@/config/vas";

const KEYS = {
  subid: "vas_subid",
  msisdn: "vas_msisdn",
  productcode: "vas_productcode",
} as const;

export function getSubid(): string {
  return localStorage.getItem(KEYS.subid) || "0";
}

export function setSubid(subid: string) {
  localStorage.setItem(KEYS.subid, subid);
}

export function getMsisdn(): string | null {
  return localStorage.getItem(KEYS.msisdn);
}

export function setMsisdn(msisdn: string) {
  localStorage.setItem(KEYS.msisdn, msisdn);
}

export function getProductCode(): string {
  return localStorage.getItem(KEYS.productcode) || VAS_CONFIG.productCode;
}

export function setProductCode(code: string) {
  localStorage.setItem(KEYS.productcode, code);
}

export function parseUrlParams(search: string) {
  const params = new URLSearchParams(search);
  const subid = params.get("subid");
  const productcode = params.get("productcode");

  if (subid) setSubid(subid);
  if (productcode) setProductCode(productcode);

  return { subid, productcode };
}

export function normalizeMsisdn(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith(VAS_CONFIG.countryCode)) {
    return digits;
  }
  // Keep leading 0 in local number: 0594821041 → 2250594821041
  return VAS_CONFIG.countryCode + digits;
}

export function formatMsisdnDisplay(msisdn: string): string {
  if (msisdn.startsWith("225") && msisdn.length > 3) {
    return `+${msisdn.slice(0, 3)} ${msisdn.slice(3)}`;
  }
  return `+${msisdn}`;
}

export function msisdnMatches(stored: string, apiMsisdn: string): boolean {
  return normalizeMsisdn(stored) === normalizeMsisdn(apiMsisdn);
}
