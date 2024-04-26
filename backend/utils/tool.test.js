const tool = require('./tool');

describe('Check email', () => {
    test('When given a valid email, check email should pass', async () => {
        const validEmail = 'hohojia@gmail.com'

        const result = await tool.checkEmail(validEmail);

        expect(result).toBe(true);
    });
});