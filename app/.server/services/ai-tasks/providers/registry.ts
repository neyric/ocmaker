import type { BaseProvider } from "../core/base-provider";
import { nanoBananaI2IProvider } from "./nano-banana/i2i";
import { animagine3xProvider } from "./replicate/animagine-3.1";
import { runwayGen3I2VProvider } from "./runway/gen3-i2v";
import { runwayGen3TurboI2VProvider } from "./runway/gen3-turbo-i2v";
import { seeDanceV1LiteI2VProvider } from "./seedance/v1lite-i2v";
import { seeDanceV1ProI2VProvider } from "./seedance/v1pro-i2v";
import { veo3Provider } from "./veo3/veo3";
import { veo3FastProvider } from "./veo3/veo3-fast";

/**
 * Provider 注册表
 * 负责管理所有 AI 提供商的注册和获取
 */
export class ProviderRegistry {
  private static instance: ProviderRegistry;

  private providers = new Map<string, BaseProvider<string, any>>();

  private constructor() {
    this.registerAll([
      seeDanceV1ProI2VProvider,
      seeDanceV1LiteI2VProvider,
      veo3Provider,
      veo3FastProvider,
      runwayGen3I2VProvider,
      runwayGen3TurboI2VProvider,
      nanoBananaI2IProvider,
      animagine3xProvider,
    ]);
  }

  /**
   * 获取单例实例
   */
  static getInstance(): ProviderRegistry {
    if (!ProviderRegistry.instance) {
      ProviderRegistry.instance = new ProviderRegistry();
    }
    return ProviderRegistry.instance;
  }

  /**
   * 注册提供商
   */
  register(provider: BaseProvider<string, any>): void {
    this.providers.set(provider.type, provider);
    console.log(`Provider ${provider.type} registered successfully`);
  }

  /**
   * 批量注册提供商
   */
  registerAll(providers: BaseProvider<string, any>[]): void {
    providers.forEach((provider) => this.register(provider));
  }

  /**
   * 获取提供商
   */
  getProvider(providerType: string): BaseProvider<string, any> | null {
    return this.providers.get(providerType) ?? null;
  }
}
