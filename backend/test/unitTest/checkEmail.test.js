const tool = require('../../utils/tool')
describe('checkEmail Function', () => {
    test('should return true for valid email', async () => {
      expect(await tool.checkEmail('example@example.com')).toBe(true);
    });
  
    test('should return false for email without @ symbol', async () => {
      expect(await tool.checkEmail('example.com')).toBe(false);
    });
  
    test('should return false for email without domain', async () => {
      expect(await tool.checkEmail('example@')).toBe(false);
    });
  
    test('should return false for email with spaces', async () => {
      expect(await tool.checkEmail('example @example.com')).toBe(false);
    });
  
    test('should return false for email with special characters', async () => {
      expect(await tool.checkEmail('example*example@example.com')).toBe(false);
    });
  
    test('should return true for email with subdomains', async () => {
      expect(await tool.checkEmail('example@mail.example.com')).toBe(true);
    });
  
    test('should return true for email with dashes and numbers', async () => {
      expect(await tool.checkEmail('ex-ample123@example.com')).toBe(true);
    });
  });