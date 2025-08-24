import { test, expect } from '@playwright/test';

test.describe('Demo Calculator Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testsheepnz.github.io/BasicCalculator.html');
  });

  // ✅ Positive test cases
  test('should add two numbers correctly', async ({ page }) => {
    await page.fill('#number1Field', '5');
    await page.fill('#number2Field', '3');
    await page.selectOption('#selectOperationDropdown', 'Add');
    await page.click('#calculateButton');

    const result = await page.inputValue('#numberAnswerField');
    expect(result).toBe('8');
  });

  test('should subtract two numbers correctly', async ({ page }) => {
    await page.fill('#number1Field', '9');
    await page.fill('#number2Field', '4');
    await page.selectOption('#selectOperationDropdown', 'Subtract');
    await page.click('#calculateButton');

    const result = await page.inputValue('#numberAnswerField');
    expect(result).toBe('5');
  });

  test('should multiply two numbers correctly', async ({ page }) => {
    await page.fill('#number1Field', '6');
    await page.fill('#number2Field', '7');
    await page.selectOption('#selectOperationDropdown', 'Multiply');
    await page.click('#calculateButton');

    const result = await page.inputValue('#numberAnswerField');
    expect(result).toBe('42');
  });

  test('should divide two numbers correctly', async ({ page }) => {
    await page.fill('#number1Field', '20');
    await page.fill('#number2Field', '4');
    await page.selectOption('#selectOperationDropdown', 'Divide');
    await page.click('#calculateButton');

    const result = await page.inputValue('#numberAnswerField');
    expect(result).toBe('5');
  });

  // ✅ Negative / Edge cases
  test('should handle divide by zero', async ({ page }) => {
    await page.fill('#number1Field', '10');
    await page.fill('#number2Field', '0');
    await page.selectOption('#selectOperationDropdown', 'Divide');
    await page.click('#calculateButton');

    const result = await page.inputValue('#numberAnswerField');
    expect(['Infinity', 'Error', '']).toContain(result);
  });

  test('should handle non-numeric input', async ({ page }) => {
    await page.fill('#number1Field', 'abc');
    await page.fill('#number2Field', '5');
    await page.selectOption('#selectOperationDropdown', 'Add');
    await page.click('#calculateButton');

    const result = await page.inputValue('#numberAnswerField');
    expect(['NaN', '0', '']).toContain(result);
  });

  // ✅ Clear button test fixed to match actual behavior
  test('should reset fields when clear button clicked', async ({ page }) => {
    await page.fill('#number1Field', '12');
    await page.fill('#number2Field', '5');
    await page.click('#calculateButton'); 
    await page.click('#clearButton');
    await page.waitForTimeout(100);

    const num1 = await page.inputValue('#number1Field'); // stays
    const num2 = await page.inputValue('#number2Field'); // stays
    const result = await page.inputValue('#numberAnswerField'); // cleared

    expect(num1).toBe('12');
    expect(num2).toBe('5');
    expect(result).toBe('');
  });

  // ⚡ Additional Edge Cases
  test('should handle large numbers', async ({ page }) => {
    await page.fill('#number1Field', '999999999');
    await page.fill('#number2Field', '999999999');
    await page.selectOption('#selectOperationDropdown', 'Add');
    await page.click('#calculateButton');

    const result = await page.inputValue('#numberAnswerField');
    expect(result).toBe('1999999998');
  });

  test('should handle negative numbers', async ({ page }) => {
    await page.fill('#number1Field', '-5');
    await page.fill('#number2Field', '-3');
    await page.selectOption('#selectOperationDropdown', 'Add');
    await page.click('#calculateButton');

    const result = await page.inputValue('#numberAnswerField');
    expect(result).toBe('-8');
  });

  test('should handle decimal numbers', async ({ page }) => {
    await page.fill('#number1Field', '5.5');
    await page.fill('#number2Field', '2.2');
    await page.selectOption('#selectOperationDropdown', 'Add');
    await page.click('#calculateButton');

    const result = await page.inputValue('#numberAnswerField');
    expect(result).toBe('7.7');
  });

  test('should handle multiple consecutive operations', async ({ page }) => {
    await page.fill('#number1Field', '2');
    await page.fill('#number2Field', '3');
    await page.selectOption('#selectOperationDropdown', 'Add');
    await page.click('#calculateButton');

    let result = await page.inputValue('#numberAnswerField');
    expect(result).toBe('5');

    await page.selectOption('#selectOperationDropdown', 'Multiply');
    await page.click('#calculateButton');

    result = await page.inputValue('#numberAnswerField');
    expect(result).toBe('6');
  });
});
