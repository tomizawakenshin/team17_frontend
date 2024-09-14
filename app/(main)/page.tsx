import { getAllHanabi } from "@/actions/hanabi";
import Firework from "@/components/Firework/Firework";

export default async function Home() {
  const hanabis = await getAllHanabi();
  return (
    <div className="">
      <Firework hanabis={hanabis}/>
    </div>
  );
}
