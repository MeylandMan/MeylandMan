import "@testing-library/jest-dom";

global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    this.callback([{ target: {} }]);
  }
  unobserve() {}
  disconnect() {}
};