type User = {
  email: string;
  name?: string | null;
};

export function displayName(user: User): string {
  return user.name
    ? user.name
    : user.email
        .split("@")[0]
        .replaceAll(".", " ")
        .replace(/^\w/, (c) => c.toUpperCase());
}
