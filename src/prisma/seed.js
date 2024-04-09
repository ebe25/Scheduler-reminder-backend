import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.create({
    data: {
      email: "alice@prisma.io",
      name: "Alice",
      todos: [
        {
          id: crypto.randomUUID(),
          title: "Check out Prisma with Next.js",
          status: "Pending",
          editedAt: new Date(),
        },
        {
          id: crypto.randomUUID(),
          title: "Complete tutorial on React hooks",
          status: "Pending",
          editedAt: new Date(),
        },
        {
          id: crypto.randomUUID(),
          title: "Review code changes in GitHub pull request",
          status: "Pending",
          editedAt: new Date(),
        },
      ],

      picture:
        "data:image/jpeg;base64,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",
      editedAt: new Date(),
    },
  });
  //   const bob = await prisma.user.upsert({
  //     where: {email: "bob@prisma.io"},
  //     update: {},
  //     create: {
  //       email: "bob@prisma.io",
  //       name: "Bob",
  //       posts: {
  //         create: [
  //           {
  //             title: "Follow Prisma on Twitter",
  //             content: "https://twitter.com/prisma",
  //             published: true,
  //           },
  //           {
  //             title: "Follow Nexus on Twitter",
  //             content: "https://twitter.com/nexusgql",
  //             published: true,
  //           },
  //         ],
  //       },
  //     },
  //   });
  console.log({alice});
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
