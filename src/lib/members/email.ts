export function normalizeMemberEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function memberEmailToParam(email: string): string {
  return encodeURIComponent(normalizeMemberEmail(email));
}

export function memberParamToEmail(param: string): string {
  return normalizeMemberEmail(decodeURIComponent(param));
}
