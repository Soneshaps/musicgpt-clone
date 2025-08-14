import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting to seed voices...');

  const voices = [
    { name: "Emma Watson", language: "english" },
    { name: "Morgan Freeman", language: "english" },
    { name: "Scarlett Johansson", language: "english" },
    { name: "Tom Hanks", language: "english" },
    { name: "Jennifer Lawrence", language: "english" },
    { name: "Leonardo DiCaprio", language: "english" },
    { name: "Meryl Streep", language: "english" },
    { name: "Brad Pitt", language: "english" },
    { name: "Angelina Jolie", language: "english" },
    { name: "Johnny Depp", language: "english" },

    { name: "Narayan Gopal", language: "nepali" },
    { name: "Ambar Gurung", language: "nepali" },
    { name: "Tara Devi", language: "nepali" },
    { name: "Kumar Basnet", language: "nepali" },
    { name: "Sabin Rai", language: "nepali" },
    { name: "Deepak Bajracharya", language: "nepali" },
    { name: "Nepathya", language: "nepali" },
    { name: "Phiroj Shyangden", language: "nepali" },
    { name: "Adrian Pradhan", language: "nepali" },
    { name: "Swoopna Suman", language: "nepali" },

    { name: "Amitabh Bachchan", language: "indian" },
    { name: "Lata Mangeshkar", language: "indian" },
    { name: "Shah Rukh Khan", language: "indian" },
    { name: "Aishwarya Rai", language: "indian" },
    { name: "Priyanka Chopra", language: "indian" },
    { name: "Deepika Padukone", language: "indian" },
    { name: "Ranbir Kapoor", language: "indian" },
    { name: "Alia Bhatt", language: "indian" },
    { name: "Aamir Khan", language: "indian" },
    { name: "Kajol", language: "indian" },
  ];

  // Clear existing voices (optional - remove if you want to keep existing data)
  await prisma.voice.deleteMany({});

  // Insert all voices
  for (const voice of voices) {
    await prisma.voice.create({
      data: voice,
    });
    console.log(`✅ Created voice: ${voice.name} (${voice.language})`);
  }

  console.log(`🎉 Seeding finished! Created ${voices.length} voices.`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
