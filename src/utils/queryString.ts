export function stringify(payload:any) {
  return "?" + new URLSearchParams(payload).toString();
}
