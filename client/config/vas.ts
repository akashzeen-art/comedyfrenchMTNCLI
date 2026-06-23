export const VAS_CONFIG = {
  productCode: "NRCZ",
  countryCode: "225",
  apiBase: "http://68.183.88.91/adpoke/cnt",
  portalUrl: "http://68.183.88.91/cmd/cnt/rubyiv/portal?tc=0&pid=106&msisdn=",
} as const;

export function getStatusUrl(subid: string, productcode: string) {
  return `${VAS_CONFIG.apiBase}/sub/status?subid=${encodeURIComponent(subid)}&productcode=${encodeURIComponent(productcode)}`;
}

export function getDetailUrl(subid: string, productcode: string) {
  return `${VAS_CONFIG.apiBase}/sub/detail?subid=${encodeURIComponent(subid)}&productcode=${encodeURIComponent(productcode)}`;
}

export function getCampaignUrl(subid: string, productcode: string) {
  return `${VAS_CONFIG.apiBase}/act?subid=${encodeURIComponent(subid)}&productcode=${encodeURIComponent(productcode)}`;
}

export function getDeactivationUrl(subid: string, productcode: string) {
  return `${VAS_CONFIG.apiBase}/dct?subid=${encodeURIComponent(subid)}&productcode=${encodeURIComponent(productcode)}`;
}
