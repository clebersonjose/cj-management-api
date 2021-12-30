import { PrismaClient } from '@prisma/client';
import User from '../../src/models/user';

const prisma = new PrismaClient();

describe('Created a new user', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  test('Created a new user with all params', async () => {
    const newUser = await User.createUser('Test', 'test@test.com', 'Abc123+*-');
    expect(newUser).toBe('{"name":"Test","email":"test@test.com"}');
  });

  test('Created a new user with missing name', async () => {
    try {
      const newUser = await User.createUser('', 'test2@test.com', 'Abc123+*-');
    } catch (error: any) {
      expect(error.message).toBe("Name is required");
    }
  });

  test('Created a new user with name with less than 4 characters', async () => {
    try {
      const newUser = await User.createUser('Te', 'test3@test.com', 'Abc123+*-');
    } catch (error: any) {
      expect(error.message).toBe("Name must be at least 4 characters");
    }
  });

  test('Created a new user with missing email', async () => {
    try {
      const newUser = await User.createUser('Test', '', 'Abc123+*-');
    } catch (error: any) {
      expect(error.message).toBe("Email is required");
    }
  });

  test('Created a new user with invalid email', async () => {
    try {
      const newUser = await User.createUser('Test', 'test4', 'Abc123+*-');
    } catch (error: any) {
      expect(error.message).toBe("Email format is invalid");
    }
  });

  test('Create a new user with email already exists', async () => {
    try {
      const newUser = await User.createUser('Test', 'test@test.com', 'Abc123+*-');
    } catch (error: any) {
      expect(error.message).toBe("Email already exists");
    }
  });

  test('Created a new user with missing password', async () => {
    try {
      const newUser = await User.createUser('Test', 'test4@test.com', '');
    } catch (error: any) {
      expect(error.message).toBe("Password is required");
    }
  });

  test('Created a new user with password with less than 8 characters', async () => {
    try {
      const newUser = await User.createUser('Test', 'test5@test.com', 'Abc12+');
    } catch (error: any) {
      expect(error.message).toBe("Password must be between 8 and 24 characters");
    }
  });

  test('Created a new user with password with more than 24 characters', async () => {
    try {
      const newUser = await User.createUser('Test', 'test5@test.com', 'AAbbcc1122++3456789123456789');
    } catch (error: any) {
      expect(error.message).toBe("Password must be between 8 and 24 characters");
    }
  });

  test('Created a new user with password without uppercase', async () => {
    try {
      const newUser = await User.createUser('Test', 'test5@test.com', 'cc1122++3456789');
    } catch (error: any) {
      expect(error.message).toBe("Password must contain at least one uppercase letter");
    }
  });

  test('Created a new user with password without lowercase', async () => {
    try {
      const newUser = await User.createUser('Test', 'test5@test.com', 'AA1122++3456789');
    } catch (error: any) {
      expect(error.message).toBe("Password must contain at least one lowercase letter");
    }
  });

  test('Created a new user with password without number', async () => {
    try {
      const newUser = await User.createUser('Test', 'test5@test.com', 'AA++aaaa+');
    } catch (error: any) {
      expect(error.message).toBe("Password must contain at least one number");
    }
  });

  test('Created a new user with password without special character', async () => {
    try {
      const newUser = await User.createUser('Test', 'test5@test.com', 'AA12aaaa3');
    } catch (error: any) {
      expect(error.message).toBe("Password must contain at least one special character");
    }
  });
});

describe('Get user by email', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
    const newUser = await User.createUser('Test', 'test@test.com', 'Abc123+*-');
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  test('Get user by email', async () => {
    const user: any = await User.getUserByEmail('test@test.com');
    expect(JSON.parse(user).email).toBe("test@test.com");
  });

  test('Get non-existing user by email', async () => {
    try {
      const user: any = await User.getUserByEmail('test2@test.com');
    } catch (error: any) {
      expect(error.message).toBe("User not found");
    }
  });

  test('Get user by email with invalid email', async () => {
    try {
      const user: any = await User.getUserByEmail('test');
    } catch (error: any) {
      expect(error.message).toBe("Email format is invalid");
    }
  });

  test('Get user by email with missing email', async () => {
    try {
      const user: any = await User.getUserByEmail('');
    } catch (error: any) {
      expect(error.message).toBe("Email is required");
    }
  });
});