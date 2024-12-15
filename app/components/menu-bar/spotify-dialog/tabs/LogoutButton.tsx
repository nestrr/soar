import { signOut } from "@/auth";
import { Button } from "@/app/components/ui/button";

export default async function LogoutButton() {
  const formAction = async () => {
    "use server";
    await signOut();
  };
  return (
    <form action={formAction}>
      <Button colorPalette="accent" color="fg.contrast" type="submit">
        Log Out
      </Button>
    </form>
  );
}
