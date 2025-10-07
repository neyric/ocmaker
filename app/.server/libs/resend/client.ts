import { env } from "cloudflare:workers";
import { type CreateEmailOptions, Resend } from "resend";

export class ResendClient {
  private resend: Resend;
  private defaultFrom: string;

  constructor(apiKey?: string, defaultFrom?: string) {
    this.resend = new Resend(apiKey || "MOCK_RESEND_API_KEY");
    this.defaultFrom = defaultFrom || "noreply@example.com";
  }

  /**
   * 发送邮件 - 直接使用 Resend SDK
   */
  async send(params: CreateEmailOptions) {
    return this.resend.emails.send({
      ...params,
    });
  }

  /**
   * 批量发送邮件
   */
  async sendBatch(params: Parameters<Resend["batch"]["send"]>[0]) {
    return this.resend.batch.send(params);
  }

  /**
   * 获取邮件详情
   */
  async getEmail(id: string) {
    return this.resend.emails.get(id);
  }

  /**
   * 取消邮件
   */
  async cancelEmail(id: string) {
    this.resend.emails.cancel(id);
  }

  /**
   * 获取原始 Resend 实例以访问其他功能
   */
  get raw() {
    return this.resend;
  }
}
