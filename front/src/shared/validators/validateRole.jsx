export const validateRole = (role) => {
    return role === 'CLIENT_ROLE' || role === 'ADMIN_ROLE' || role === 'MANAGER_ROLE'
}

export const validateRoleMessage = 'El rol debe ser: "CLIENT_ROLE", "ADMIN_ROLE" o "MANAGER_ROLE"'