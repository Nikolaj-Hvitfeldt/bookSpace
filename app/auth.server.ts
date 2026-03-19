export type UserSession = {
  id: string;
  email: string;
};

export async function requireUser(): Promise<UserSession> {
  return {
    id: "dev-user",
    email: "dev@example.com",
  };
}
