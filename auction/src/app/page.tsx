import { database } from "@/db/database";
import { bids as bidsSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Home() {
  const bids = await database.query.bids.findMany();

  return (
    <main>
      <form action={async (FormData:FormData) =>{
        "use server";
        // const bid = FormData.get("bid") as string;
        await database.insert(bidsSchema).values({});
        revalidatePath("/");

      }}>
        <Input name="bid"  placeholder="Bid" />
        <Button type="submit">Place Bid</Button>
      </form>
      {bids.map((bid)=>(
        <div key={bid.id}>{bid.id}</div>
      ))}

    </main>
  );
}
