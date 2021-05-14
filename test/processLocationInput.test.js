import processLocationInput from '../src/locationFormatter';

test('1', () => {
  expect(processLocationInput('1.0,2.0')).toBe('[1.0, 2.0]');
});

test('2', () => {
  expect(processLocationInput('[1.0,2.0]')).toBe('[1.0, 2.0]');
});

test('3', () => {
  expect(processLocationInput('1.0, 2.0')).toBe('[1.0, 2.0]');
});

test('4', () => {
  expect(() => processLocationInput('[109876543333333333333333]')).toThrowError('Неправильный формат геопозиции!');
});
