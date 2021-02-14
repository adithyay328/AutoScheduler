export const splitUrl = /(\/)(?=[^/]*$)/;
export const emailRegExp = /\S+@\S+\.\S+/; // Email validation
export const passwordRegExp = /(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*[0-9]+)(?=^.{8,256}$)/; // Password validation (min 8 characters, small and capital letters + numbers)
export const usernameRegExp = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/; // Username validation (min 2 characters, no spaces, no special chars)