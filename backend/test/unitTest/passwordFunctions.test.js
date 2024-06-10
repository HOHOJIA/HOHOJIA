const tool = require("../../utils/tool");
describe('generateHashPassword Function', () => {
    test('should return a hashed password', async () => {
      const password = 'TestPassword123!';
      const hash = await tool.generateHashPassword(password);
      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
    });
  
    test('hashes for the same password should be different', async () => {
      const password = 'TestPassword123!';
      const hash1 = await tool.generateHashPassword(password);
      const hash2 = await tool.generateHashPassword(password);
      expect(hash1).not.toEqual(hash2);
    });
  
    test('should return a valid bcrypt hash', async () => {
      const password = 'TestPassword123!';
      const hash = await tool.generateHashPassword(password);
      const result = await tool.confirmPassword(password, hash);
      expect(result).toBe(true);
    });
  });