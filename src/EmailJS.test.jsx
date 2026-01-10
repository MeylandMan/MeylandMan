import { describe, it, expect, vi, beforeEach } from 'vitest';


// Mock the emailjs/browser module to avoid network calls
vi.mock('@emailjs/browser', () => ({
  init: vi.fn(),
  send: vi.fn(),
  sendForm: vi.fn(),
}));

import { initEmailJS, sendContactEmail, sendContactFlow } from './EmailJS';
import { getEnv } from './EmailJS';
import { init as emailJsInit, send as emailJsSend } from '@emailjs/browser';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('EmailJS helper', () => {
  it('sanitizes the public key and calls emailjs init', () => {
    // read raw value from env and compute expected sanitized form
    const raw = getEnv("PUBLIC_KEY");
    initEmailJS(raw);
    expect(emailJsInit).toHaveBeenCalledTimes(1);

    // client sanitization removes surrounding quotes and trailing semicolons
    const expected = String(raw || "").trim().replace(/(^['"]|['"];?$)/g, "").replace(/;$/, "");
    expect(emailJsInit).toHaveBeenCalledWith(expected);
  });

  it('sendContactEmail propagates send() errors', async () => {
    const err = new Error('network failure');
    emailJsSend.mockRejectedValue(err);

    const params = { email: 'ngnareallan@gmail.com', message: 'will fail' };
    await expect(sendContactEmail(params, { serviceId: getEnv("SERVICE_ID"), templateId: getEnv("TEMPLATE_USER") })).rejects.toThrow('network failure');
  });

  it('sendContactEmail calls send with provided service and template and returns result', async () => {
    const mockRes = { status: 200 };
    emailJsSend.mockResolvedValue(mockRes);

    const params = { email: 'ngnareallan@gmail.com', message: 'This is an automating message sent by the unit test.' };
    const res = await sendContactEmail(params, { serviceId: getEnv("SERVICE_ID"), templateId: getEnv("TEMPLATE_USER") });

    expect(emailJsSend).toHaveBeenCalledTimes(1);
    expect(emailJsSend).toHaveBeenCalledWith(getEnv("SERVICE_ID"), getEnv("TEMPLATE_USER"), expect.objectContaining({ message: 'This is an automating message sent by the unit test.', from_email: 'ngnareallan@gmail.com' }));
    expect(res).toBe(mockRes);
  });

  it('sendContactFlow sends admin notification then user confirmation when email present', async () => {
    // ensure send resolves so flow continues
    emailJsSend.mockResolvedValue({ ok: true });

    const params = { email: getEnv("ADMIN_EMAIL"), message: 'This is an automating message sent by the unit test : testing flow...' };
    // call with serviceId only so default admin/user templates from env are used
    await sendContactFlow(params, { serviceId: getEnv("SERVICE_ID") });

    // should have called send twice: admin and user
    expect(emailJsSend).toHaveBeenCalledTimes(2);

    // first call (admin) contains admin template data
    expect(emailJsSend).toHaveBeenNthCalledWith(1, getEnv("SERVICE_ID"), getEnv("TEMPLATE_ADMIN"), expect.objectContaining({ message: 'This is an automating message sent by the unit test : testing flow...', from_email: getEnv("ADMIN_EMAIL") }));

    // second call (user confirmation) contains to_email set to the user's email
    expect(emailJsSend).toHaveBeenNthCalledWith(2, getEnv("SERVICE_ID"), getEnv("TEMPLATE_USER"), expect.objectContaining({ to_email: getEnv("ADMIN_EMAIL"), message: 'This is an automating message sent by the unit test : testing flow...' }));
  });
});
