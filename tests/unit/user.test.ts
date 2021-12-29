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
    const newUser = await User.createUser('', 'test2@test.com', 'Abc123+*-');
    expect(newUser).toBe('{"error":"Name is required"}');
  });

  test('Created a new user with name with less than 4 characters', async () => {
    const newUser = await User.createUser('Te', 'test3@test.com', 'Abc123+*-');
    expect(newUser).toBe('{"error":"Name must be at least 4 characters"}');
  });

  test('Created a new user with missing email', async () => {
    const newUser = await User.createUser('Test', '', 'Abc123+*-');
    expect(newUser).toBe('{"error":"Email is required"}');
  });

  test('Created a new user with invalid email', async () => {
    const newUser = await User.createUser('Test', 'test4', 'Abc123+*-');
    expect(newUser).toBe('{"error":"Email format is invalid"}');
  });

  test('Create a new user with email already exists', async () => {
    const newUser = await User.createUser('Test', 'test@test.com', 'Abc123+*-');
    expect(newUser).toBe('{"error":"Email already exists"}');
  });

  test('Created a new user with missing password', async () => {
    const newUser = await User.createUser('Test', 'test4@test.com', '');
    expect(newUser).toBe('{"error":"Password is required"}');
  });

  test('Created a new user with password with less than 8 characters', async () => {
    const newUser = await User.createUser('Test', 'test5@test.com', 'Abc12+');
    expect(newUser).toBe('{"error":"Password must be between 8 and 24 characters"}');
  });

  test('Created a new user with password with more than 24 characters', async () => {
    const newUser = await User.createUser('Test', 'test5@test.com', 'AAbbcc1122++3456789123456789');
    expect(newUser).toBe('{"error":"Password must be between 8 and 24 characters"}');
  });

  test('Created a new user with password without uppercase', async () => {
    const newUser = await User.createUser('Test', 'test5@test.com', 'cc1122++3456789');
    expect(newUser).toBe('{"error":"Password must contain at least one uppercase letter"}');
  });

  test('Created a new user with password without lowercase', async () => {
    const newUser = await User.createUser('Test', 'test5@test.com', 'AA1122++3456789');
    expect(newUser).toBe('{"error":"Password must contain at least one lowercase letter"}');
  });

  test('Created a new user with password without number', async () => {
    const newUser = await User.createUser('Test', 'test5@test.com', 'AA++aaaa+');
    expect(newUser).toBe('{"error":"Password must contain at least one number"}');
  });

  test('Created a new user with password without special character', async () => {
    const newUser = await User.createUser('Test', 'test5@test.com', 'AA12aaaa3');
    expect(newUser).toBe('{"error":"Password must contain at least one special character"}');
  });
});
