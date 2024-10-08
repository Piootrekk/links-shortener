enum Role {
  redneck = "redneck",
  vip = "vip",
  master = "master",
}

type TUserRoles = keyof typeof Role;

function isValidUserRole(role: any): role is TUserRoles {
  return Object.values(Role).includes(role as Role);
}

export default Role;
export { isValidUserRole };
export type { TUserRoles };
