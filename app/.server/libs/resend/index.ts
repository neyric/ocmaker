import { env } from "cloudflare:workers";
import { ResendClient } from "./client";
import { templates } from "./templates";

export { ResendClient } from "./client";
export { templates } from "./templates";

/**
 * 创建 Resend 实例 - 根据环境自动选择配置
 */
export const createResend = () => {
  if (import.meta.env.PROD) {
    return new ResendClient("MOCK_RESEND_API_KEY", "noreply@example.com");
  }

  // 开发环境使用测试配置
  return new ResendClient("MOCK_TEST_API_KEY", "test@example.com");
};

/**
 * 邮件服务 - 提供常用邮件发送方法
 */
export class EmailService {
  private client: ResendClient;

  constructor(client?: ResendClient) {
    this.client = client || createResend();
  }

  /**
   * 发送欢迎邮件
   */
  async sendWelcome(to: string, userName: string, loginUrl: string) {
    const template = templates.welcome({ userName, loginUrl });

    return this.client.send({
      to,
      from: "",
      ...template,
    });
  }

  /**
   * 发送密码重置邮件
   */
  async sendPasswordReset(
    to: string,
    userName: string,
    resetUrl: string,
    expiresIn?: string,
  ) {
    const template = templates.passwordReset({ userName, resetUrl, expiresIn });

    return this.client.send({
      to,
      from: "",
      ...template,
    });
  }

  /**
   * 发送订单确认邮件
   */
  async sendOrderConfirmation(
    to: string,
    params: Parameters<typeof templates.orderConfirmation>[0],
  ) {
    const template = templates.orderConfirmation(params);

    return this.client.send({
      to,
      from: "",
      ...template,
    });
  }

  /**
   * 发送通知邮件
   */
  async sendNotification(
    to: string,
    params: Parameters<typeof templates.notification>[0],
  ) {
    const template = templates.notification(params);

    return this.client.send({
      to,
      from: "",
      ...template,
    });
  }

  /**
   * 发送自定义邮件
   */
  async sendCustom(params: Parameters<ResendClient["send"]>[0]) {
    return this.client.send(params);
  }

  /**
   * 获取原始客户端以访问更多功能
   */
  get raw() {
    return this.client.raw;
  }
}

// 导出默认实例
export const emailService = new EmailService();
