pnpm init -y

# 本地安装 TypeScript

pnpm install -D typescript

# 生成 tsconfig.json

npx tsc --init

# 配置 tsconfig.json

```
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

# 安装开发依赖

### 类型定义（如使用 Node.js）

pnpm install -D @types/node

### 开发工具

pnpm install -D ts-node

# 配置 package.json 脚本

```
{
  "scripts": {
    "build": "tsc",
    "dev": "ts-node src/index.ts",
    "start": "node dist/index.js",
    "watch": "tsc --watch",
    "dev:watch": "nodemon --watch 'src/**/*' --exec ts-node src/index.ts"
  }
}
```
