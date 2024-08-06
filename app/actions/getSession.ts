import { getServerSession } from "next-auth";
import { authOptions } from "options";

export default async function getSession() {
  return await getServerSession(authOptions);
}
