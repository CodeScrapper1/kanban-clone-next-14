import ListContainer from "@/components/ListContainer";
import prisma from "@/lib/db";

export default async function Home() {
  const lists = await prisma.list.findMany({
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div
      className="px-20 py-28 mt-12 h-screen overflow-x-auto bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(/banner-image.png)" }}
    >
      <ListContainer lists={lists} />
    </div>
  );
}
