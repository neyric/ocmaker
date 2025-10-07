/**
 * 邮件模板助手 - 返回格式化的 HTML 和文本内容
 */

interface BaseEmailParams {
  userName: string;
  appName?: string;
}

export const templates = {
  /**
   * 欢迎邮件
   */
  welcome: (params: BaseEmailParams & { loginUrl: string }) => {
    const appName = params.appName || "ImgVid";

    return {
      subject: `欢迎来到 ${appName}！`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #111827;">欢迎，${params.userName}！</h1>
          <p style="color: #6b7280; line-height: 1.6;">
            感谢你加入 ${appName}。我们很高兴你能成为我们社区的一员。
          </p>
          <a href="${params.loginUrl}" style="display: inline-block; padding: 12px 24px; background: #111827; color: white; text-decoration: none; border-radius: 6px; margin-top: 16px;">
            开始使用
          </a>
        </div>
      `,
      text: `欢迎，${params.userName}！\n\n感谢你加入 ${appName}。\n\n开始使用: ${params.loginUrl}`,
    };
  },

  /**
   * 密码重置
   */
  passwordReset: (
    params: BaseEmailParams & { resetUrl: string; expiresIn?: string },
  ) => {
    const appName = params.appName || "ImgVid";
    const expiresIn = params.expiresIn || "1小时";

    return {
      subject: `重置你的 ${appName} 密码`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #111827;">密码重置请求</h1>
          <p style="color: #6b7280; line-height: 1.6;">
            你好 ${params.userName}，我们收到了重置你账户密码的请求。
          </p>
          <a href="${params.resetUrl}" style="display: inline-block; padding: 12px 24px; background: #dc2626; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
            重置密码
          </a>
          <p style="color: #9ca3af; font-size: 14px;">
            此链接将在 ${expiresIn} 后过期。如果你没有请求重置密码，请忽略这封邮件。
          </p>
        </div>
      `,
      text: `密码重置请求\n\n你好 ${params.userName}，\n\n点击链接重置密码: ${params.resetUrl}\n\n此链接将在 ${expiresIn} 后过期。`,
    };
  },

  /**
   * 订单确认
   */
  orderConfirmation: (
    params: BaseEmailParams & {
      orderId: string;
      items: Array<{ name: string; quantity: number; price: string }>;
      total: string;
    },
  ) => {
    // const appName = params.appName || "ImgVid";

    const itemsHtml = params.items
      .map(
        (item) =>
          `<tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${item.price}</td>
      </tr>`,
      )
      .join("");

    const itemsText = params.items
      .map((item) => `- ${item.name} x${item.quantity} - ${item.price}`)
      .join("\n");

    return {
      subject: `订单确认 #${params.orderId}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #111827;">订单确认</h1>
          <p style="color: #6b7280;">感谢你的订单，${params.userName}！</p>
          
          <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 0 0 16px 0;"><strong>订单号:</strong> ${params.orderId}</p>
            <table style="width: 100%; border-collapse: collapse;">
              ${itemsHtml}
              <tr>
                <td colspan="2" style="padding: 12px 0 0 0; font-weight: bold;">总计</td>
                <td style="padding: 12px 0 0 0; text-align: right; font-weight: bold;">${params.total}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
      text: `订单确认\n\n订单号: ${params.orderId}\n\n${itemsText}\n\n总计: ${params.total}`,
    };
  },

  /**
   * 通用通知
   */
  notification: (
    params: BaseEmailParams & {
      title: string;
      message: string;
      actionUrl?: string;
      actionText?: string;
    },
  ) => {
    const actionHtml = params.actionUrl
      ? `<a href="${params.actionUrl}" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin-top: 16px;">
          ${params.actionText || "查看详情"}
        </a>`
      : "";

    const actionText = params.actionUrl
      ? `\n\n${params.actionText || "查看详情"}: ${params.actionUrl}`
      : "";

    return {
      subject: params.title,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #111827;">${params.title}</h1>
          <p style="color: #6b7280; line-height: 1.6;">
            你好 ${params.userName}，<br><br>
            ${params.message}
          </p>
          ${actionHtml}
        </div>
      `,
      text: `${params.title}\n\n你好 ${params.userName}，\n\n${params.message}${actionText}`,
    };
  },
};
