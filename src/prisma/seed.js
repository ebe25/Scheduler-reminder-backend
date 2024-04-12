import prisma from "../config/serverConfig.js";
import {
  randEmail,
  randFullName,
  randNumber,
  randText,
  randTimeZone,
  randTodo,
  randUrl,
  randUuid,
} from "@ngneat/falso";

async function main() {
  //   const mockUsers = Array.from({length: 20}, (_, index) => {
  //     return {
  //       email: randEmail(),
  //       name: randFullName(),
  //       todos: Array(5).fill({
  //         id: randNumber(),
  //         title: randText(),
  //         userId: index + 1,
  //       }),
  //       picture: randUrl(),
  //     };
  //   });
  //   console.dir({mockUsers}, {depth: "infinity"});
  const mockTodos = Array(5).fill({
    title: randText(),
  });

  //   const todos = await prisma.todo.createMany({data: mockTodos});
  const manyUsers = await prisma.user.create({
    data: {
      email: randEmail(),
      name: randFullName(),
      picture: randUrl(),
      todos: {
        createMany: {
          data: 
            mockTodos,
          
        },
      },
    },
  });
  console.log({manyUsers});
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
