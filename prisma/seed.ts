// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  // delete old data
  await prisma.post.deleteMany();

  // create new data
  for (let i = 1; i <= 10; i++) {
    const post = await prisma.post.create({
      data: {
        title: `Title of Post ${i}`,
        body: `This is the body content for post number ${i}. It's generated from the seed script.`,
        likes: Math.floor(Math.random() * 101),
      },
    })
    console.log(`Created post with id: ${post.id}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })