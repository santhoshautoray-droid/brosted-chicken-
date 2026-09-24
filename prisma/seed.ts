import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { OFFICIAL_CATEGORIES, OFFICIAL_MENU_ITEMS } from '../lib/menu-data';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/broast_factory?schema=public';

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🍗 Starting official database seeding for THE BROAST FACTORY...');

  // 1. Restaurant Settings
  console.log('Creating/Updating Restaurant Settings...');
  const restaurant = await prisma.restaurant.upsert({
    where: { id: 'restaurant-tbf-main' },
    update: {
      name: 'THE BROAST FACTORY',
      address: 'Opp. Pillar No. 1416, Kala Dera, Chanchalguda',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500024',
      phone: '+91 93931 26313',
    },
    create: {
      id: 'restaurant-tbf-main',
      name: 'THE BROAST FACTORY',
      logoUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&auto=format&fit=crop&q=80',
      coverImageUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=1600&auto=format&fit=crop&q=80',
      description:
        'Crispy on the outside, succulent and bursting with flavor on the inside. Authentic pressure-fried broasted chicken, gourmet burgers, crispy wraps, and fiery wings in Chanchalguda, Hyderabad.',
      phone: '+91 93931 26313',
      email: 'orders@thebroastfactory.com',
      address: 'Opp. Pillar No. 1416, Kala Dera, Chanchalguda',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500024',
      latitude: 17.3753,
      longitude: 78.4982,
      openingTime: '12:30 PM',
      closingTime: '01:00 AM',
      isOpen: true,
      deliveryEnabled: true,
      pickupEnabled: true,
      deliveryFee: 40.0,
      minimumOrderAmount: 199.0,
      estimatedDeliveryMinutes: 35,
      taxPercentage: 5.0,
    },
  });
  console.log(`✓ Restaurant configured: ${restaurant.name}`);

  // 2. Admin User
  console.log('Seeding Admin User...');
  const defaultAdminUsername = process.env.INITIAL_ADMIN_USERNAME || 'admin';
  const defaultAdminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'BroastFactoryAdmin@2026';
  const passwordHash = await bcrypt.hash(defaultAdminPassword, 12);

  await prisma.adminUser.upsert({
    where: { username: defaultAdminUsername },
    update: { passwordHash, isActive: true },
    create: {
      username: defaultAdminUsername,
      passwordHash,
      isActive: true,
    },
  });
  console.log(`✓ Admin user configured: ${defaultAdminUsername}`);

  // 3. Official Categories
  console.log('Seeding 9 Official Categories...');
  const categoryMap = new Map<string, string>();

  for (let i = 0; i < OFFICIAL_CATEGORIES.length; i++) {
    const cat = OFFICIAL_CATEGORIES[i];
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        imageUrl: cat.imageUrl,
        sortOrder: i + 1,
        isActive: true,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        imageUrl: cat.imageUrl,
        sortOrder: i + 1,
        isActive: true,
      },
    });
    categoryMap.set(cat.slug, createdCat.id);
  }

  // 4. Official Menu Items (All 28 dishes with images)
  console.log('Seeding 28 Official Dishes with Dedicated Food Images...');
  for (const item of OFFICIAL_MENU_ITEMS) {
    const categoryId = categoryMap.get(item.category?.slug || item.categoryId);
    if (!categoryId) continue;

    const createdItem = await prisma.menuItem.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        description: item.description,
        price: item.price,
        categoryId,
        imageUrl: item.imageUrl,
        isVeg: item.isVeg,
        isAvailable: item.isAvailable,
        isFeatured: item.isFeatured,
        preparationTimeMinutes: item.preparationTimeMinutes,
        sortOrder: item.sortOrder,
      },
      create: {
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        categoryId,
        imageUrl: item.imageUrl,
        isVeg: item.isVeg,
        isAvailable: item.isAvailable,
        isFeatured: item.isFeatured,
        preparationTimeMinutes: item.preparationTimeMinutes,
        sortOrder: item.sortOrder,
      },
    });

    // Option groups if present
    if (item.optionGroups && item.optionGroups.length > 0) {
      for (const og of item.optionGroups) {
        const existingGroup = await prisma.optionGroup.findFirst({
          where: { menuItemId: createdItem.id, name: og.name },
        });

        const group = existingGroup
          ? await prisma.optionGroup.update({
              where: { id: existingGroup.id },
              data: {
                isRequired: og.isRequired,
                minSelections: og.minSelections,
                maxSelections: og.maxSelections,
              },
            })
          : await prisma.optionGroup.create({
              data: {
                name: og.name,
                menuItemId: createdItem.id,
                isRequired: og.isRequired,
                minSelections: og.minSelections,
                maxSelections: og.maxSelections,
              },
            });

        for (const opt of og.options) {
          const existingOpt = await prisma.option.findFirst({
            where: { optionGroupId: group.id, name: opt.name },
          });

          if (!existingOpt) {
            await prisma.option.create({
              data: {
                name: opt.name,
                price: opt.price,
                optionGroupId: group.id,
                isAvailable: true,
              },
            });
          } else {
            await prisma.option.update({
              where: { id: existingOpt.id },
              data: { price: opt.price, isAvailable: true },
            });
          }
        }
      }
    }
  }

  console.log('✅ Seeding completed with 28 official menu dishes & photography!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
