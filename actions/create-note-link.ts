"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { init } from "@paralleldrive/cuid2";

const createId = init({
  random: Math.random,
  length: 8,
  fingerprint:
    "JtpRu6co!FwllXd3m877FFl8F1dfvg-6OqriLHmbh69sOjGV6PiF2-iUo7QfVnlr",
});

export async function createNoteLinkAction(_: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  const sessions = await auth();

  if (!sessions?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (!id) {
    throw new Error("Invalid Payload");
  }

  const { token } = await prisma.note.update({
    data: {
      token: createId(),
    },
    where: {
      id,
      userId: sessions.user.id,
    },
  });

  return { data: { token } };
}
