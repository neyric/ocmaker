# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server (runs React Router dev server with Vite)
- `pnpm preview` - Build and preview production version locally

### Build & Deploy
- `pnpm build` - Build the application using React Router
- `pnpm deploy` - Build and deploy to Cloudflare Workers
- `pnpm typecheck` - Run TypeScript type checking across all projects
- `pnpm check` - Run Biome formatter and linter with auto-fix

### Database Operations
- `pnpm db:generate` - Generate Drizzle schema from database schema file
- `pnpm db:migrate` - Run database migrations on production (Cloudflare D1)
- `pnpm db:migrate:local` - Run database migrations on local development database

### Code Generation
- `pnpm cf-typegen` - Generate Cloudflare Workers types from wrangler configuration
- `pnpm typegen` - Generate React Router types

## Architecture Overview

### Tech Stack
- **Frontend**: React 19 + React Router v7 (file-based routing)
- **Runtime**: Cloudflare Workers (serverless)
- **Database**: Cloudflare D1 (PostgreSQL-compatible) with Drizzle ORM
- **Storage**: Cloudflare R2 (object storage)
- **Authentication**: Google OAuth + custom JWT
- **Styling**: TailwindCSS + DaisyUI + Radix UI components
- **Code Quality**: Biome (formatter + linter) + TypeScript

### Project Structure
- `app/` - Main application code (React Router v7 structure)
  - `routes/` - File-based routing structure
    - `_api/` - API Route structure
      - `_api/basic` - File-based api routing structure
      - `_api/callback` - A Callback routing provider for other services
      - `_api/webhooks` - A webbhooks provider to other services
    - `_meta/` - Robots / Sitemap / Ads and more meta information
    - `_legal/` - The Legal document of this Website
    - `base/` - Base (Default Language of English) for page routing
  - `.server/` - Server-side only code
    - `aisdk/` - AI 服务提供商 SDK 集成
      - `kie-ai/` - KieAI 服务集成 (GPT-4o, Kontext)
      - `openai/` - OpenAI API 集成
      - `replicate/` - Replicate 服务集成 (Animagine 等模型)
    - `constants/` - 服务器端常量配置 (产品信息、定价等)
    - `libs/` - 核心库文件
      - `cloudflare/` - Cloudflare 服务集成 (R2 存储等)
      - `creem/` - Creem 支付系统集成
      - `resend/` - Resend 邮件服务集成
      - `markdown/` - Markdown 处理工具
      - `db.ts` - 数据库连接和 Drizzle ORM 配置
      - `session.ts` - Session 管理 (基于 Cloudflare KV)
    - `model/` - 数据模型定义
    - `services/` - 业务逻辑服务
      - `ai-tasks/` - AI 任务处理核心逻辑
        - `core/` - 核心任务处理逻辑
        - `processors/` - 任务处理器
        - `providers/` - AI 服务提供商适配器
      - `basic/` - 基础服务 (用户、认证等)
      - `order/` - 订单和支付相关服务
      - `user/` - 用户管理服务
  - `drizzle/` - Database schema and migrations (Drizzle ORM)
  - `components/` - Reusable UI components (organized by type)
  - `features/` - Feature-specific components and logic
  - `hooks/` - Custom React hooks
  - `store/` - Zustand state management
  - `api/` - API utilities and helpers
- `workers/` - Cloudflare Workers entry point

### Database Schema
The application uses a comprehensive schema with the following key entities:
- **users**: User accounts with invite system
- **user_auth**: Third-party authentication (Google OAuth)
- **ai_tasks**: AI generation tasks with status tracking
- **orders**: Purchase orders with subscription support
- **credit_records** & **credit_consumptions**: Credit-based billing system
- **subscriptions**: Recurring subscription management
- **daily_checkins**: Daily check-in rewards system
- **invitations**: Referral/invite system

### AI Provider Integration
The application supports multiple AI providers:
- **kie_4o**: KieAI GPT-4o integration
- **kie_kontext**: KieAI Kontext model
- **replicate_animagine**: Replicate Animagine model

### Key Features
- Image-to-video AI generation with multiple models
- Credit-based billing system
- Google OAuth authentication
- Subscription management with Creem payment integration
- Daily check-in rewards
- Referral/invite system
- File upload to Cloudflare R2

### Important Files
- `wrangler.jsonc` - Cloudflare Workers configuration with D1/R2/KV bindings
- `biome.json` - Code formatting and linting configuration
- `app/drizzle/schema.ts` - Complete database schema with relationships
- `worker-configuration.d.ts` - TypeScript definitions for Cloudflare bindings

### Development Notes
- Uses React Router v7's file-based routing system
- Cloudflare Workers environment provides D1 (DB), R2 (storage), and KV bindings
- Biome is configured for strict code quality with specific rules for UI components
- All database operations use Drizzle ORM with proper TypeScript types
- UI components follow Radix UI + TailwindCSS + DaisyUI patterns

### Testing
- Biome test configuration includes common testing globals (describe, it, expect, vi)
- Test files should use `*.test.ts` or `*.test.tsx` extensions