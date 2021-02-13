export const splitUrl = /(\/)(?=[^/]*$)/;
export const emailRegExp = /\S+@\S+\.\S+/; // Email validation
export const passwordRegExp = /(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*[0-9]+)(?=^.{8,256}$)/; // Password validation (min 8 characters, small and capital letters + numbers)
