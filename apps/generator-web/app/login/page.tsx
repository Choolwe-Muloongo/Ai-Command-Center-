import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", {
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
            redirectTo: "/protected"
          });
        }}
      >
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
