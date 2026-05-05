import { auth, signOut } from "@/lib/auth";

export default async function ProtectedPage() {
  const session = await auth();

  return (
    <main>
      <h1>Protected</h1>
      <p>Signed in as {session?.user?.email}</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </main>
  );
}
