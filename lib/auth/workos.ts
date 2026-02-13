export type WorkOSIdentity = {
  userId: string;
  email: string;
};

export async function getWorkOSIdentity(): Promise<WorkOSIdentity | null> {
  return null;
}
