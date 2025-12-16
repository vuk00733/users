import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

interface ReferenceEntity {
  id: number;
  name: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  country: ReferenceEntity;
  role: ReferenceEntity;
}

interface Country extends ReferenceEntity {}
interface Role extends ReferenceEntity {}

interface Database {
  users: User[];
  countries: Country[];
  roles: Role[];
}

function generateCountries(count: number): Country[] {
  const countries: Country[] = [];
  const uniqueCountryNames = new Set<string>();

  while (uniqueCountryNames.size < count) {
    uniqueCountryNames.add(faker.location.country());
  }

  const countryNames = Array.from(uniqueCountryNames);

  for (let i = 0; i < count; i++) {
    countries.push({
      id: i + 1,
      name: countryNames[i],
    });
  }

  return countries;
}

function generateRoles(): Role[] {
  const predefinedRoles = [
    "Administrator",
    "Engineer",
    "Product Manager",
    "UX Designer",
    "QA Specialist",
    "Support Agent",
    "DevOps Engineer",
  ];

  return predefinedRoles.map((name, index) => ({
    id: index + 1,
    name,
  }));
}

function generateUsers(
  count: number,
  countries: Country[],
  roles: Role[]
): User[] {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const randomCountry = faker.helpers.arrayElement(countries);
    const randomRole = faker.helpers.arrayElement(roles);
    const hasAvatar = faker.datatype.boolean({ probability: 0.7 });
    users.push({
      id: i + 1,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      avatar: hasAvatar ? faker.image.avatarGitHub() : null,
      country: {
        id: randomCountry.id,
        name: randomCountry.name,
      },
      role: {
        id: randomRole.id,
        name: randomRole.name,
      },
    });
  }

  return users;
}

function seedDatabase(): void {
  console.log("Starting database seeding...");

  const countries = generateCountries(100);
  console.log(`Generated ${countries.length} countries 👏`);

  const roles = generateRoles();
  console.log(`Generated ${roles.length} roles 👏`);

  const users = generateUsers(1000, countries, roles);
  console.log(`Generated ${users.length} users 👏`);

  const database: Database = {
    users,
    countries,
    roles,
  };

  const dbPath = path.join(__dirname, "..", "db.json");
  fs.writeFileSync(dbPath, JSON.stringify(database, null, 2), "utf-8");

  console.log(`Database written to ${dbPath} ✅`);
  console.log(
    `Summary: ${users.length} users, ${countries.length} countries, ${roles.length} roles 📊`
  );
}

seedDatabase();
