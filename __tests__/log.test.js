import { log, logJson } from '../src/log';

global.console = {
  log: jest.fn()
};

describe('log function', () => {
  afterEach(() => {
    console.log.mockClear();
  });

  test('should return an API with json method when called without arguments', () => {
    const result = log();
    expect(result).toHaveProperty('json');
    expect(typeof result.json).toBe('function');
  });

  test('should log the familiar log format when called with arguments', () => {
    log('Test message 1', 'Test message 2');

    expect(console.log).toHaveBeenCalledTimes(7);
    expect(console.log).toHaveBeenNthCalledWith(1, '================');
    expect(console.log).toHaveBeenNthCalledWith(2, '-- Familiar Log');
    expect(console.log).toHaveBeenNthCalledWith(3, '================');
    expect(console.log).toHaveBeenNthCalledWith(4, 'Test message 1');
    expect(console.log).toHaveBeenNthCalledWith(5, '================');
    expect(console.log).toHaveBeenNthCalledWith(6, 'Test message 2');
  });

  test('should return an API with json method when called with arguments', () => {
    const result = log('Test message 1');
    expect(result).toHaveProperty('json');
    expect(typeof result.json).toBe('function');
  });
});

describe('logJson function', () => {
  afterEach(() => {
    console.log.mockClear();
  });

  test('should log JSON formatted strings when called with arguments', () => {
    const obj = { key: 'value' };
    logJson(obj);

    const expectedOutput = JSON.stringify(obj, null, 2);

    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith(expectedOutput);
    expect(console.log).toHaveBeenCalledWith('');
  });

  test('should do nothing when called without arguments', () => {
    logJson();

    expect(console.log).not.toHaveBeenCalled();
  });
});
