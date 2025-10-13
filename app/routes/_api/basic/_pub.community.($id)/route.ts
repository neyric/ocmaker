import { and, desc, eq, lt, or, SQL } from "drizzle-orm";
import { data } from "react-router";
import { connectDB, schema } from "~/.server/libs/db";
import type { Route } from "./+types/route";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const pageSize = 20;
  const cursor = params.id; // cursor 是 character id

  const db = connectDB();

  const whereConditions: SQL[] = [eq(schema.characters.is_public, true)];

  if (cursor) {
    const cursorRecord = await db.query.characters.findFirst({
      where: eq(schema.characters.id, cursor),
      columns: { created_at: true, id: true },
    });

    if (!cursorRecord) throw Response.json({}, { status: 400 });

    const cursorCondition = or(
      lt(schema.characters.created_at, cursorRecord.created_at),
      and(
        eq(schema.characters.created_at, cursorRecord.created_at),
        lt(schema.characters.id, cursorRecord.id),
      ),
    );

    if (!cursorCondition) {
      throw new Error("Failed to build cursor condition");
    }

    whereConditions.push(cursorCondition);
  }

  const whereClause = and(...whereConditions) as SQL;
  const characters = await db.query.characters.findMany({
    where: whereClause,
    orderBy: [
      desc(schema.characters.created_at),
      desc(schema.characters.id),
    ],
    limit: pageSize + 1,
    with: {
      user: {
        columns: {
          id: true,
          nickname: true,
          avatar_url: true,
          created_at: true,
        },
      },
    },
  });

  const hasMore = characters.length > pageSize;
  const resultCharacters = hasMore ? characters.slice(0, pageSize) : characters;
  const nextCursor = hasMore ? characters[pageSize].id : null;

  return data({
    items: resultCharacters,
    nextCursor,
    pageSize,
  });
};

export type CommunityResult = Awaited<ReturnType<typeof loader>>["data"];
