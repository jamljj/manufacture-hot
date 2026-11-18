# Manufacture HOT · 服务器与 PC 行业战略日报

面向战略运营部门的**服务器与 PC 行业日报站**：从官方一手渠道、头部咨询机构与优质媒体中每日精选，覆盖整机、上游物料、制造自动化、大客户、贸易合规与友商动向六大方向。

> 本项目基于开源引擎 [AIHOT](https://github.com/KKKKhazix/AIHOT) 定制：替换了信源清单、评分门槛、提示词与站点文案。上游更新可用 `git pull upstream main` 合并。

## 功能

- **采集**：20 个信源（NVIDIA/AMD/Intel/TSMC/Samsung/Apple/广达官方 + IDC/Counterpoint/TrendForce + The Register/DigiTimes/Tom's Hardware/36kr 等），全天持续轮询，间隔按各源产量自动调节
- **处理流水线**：预筛（行业相关判定）→ 内容理解（模型判类型、打标签、写中文标题摘要）→ 双评分（两次独立 0–100 注意力分取平均）→ 聚类（同一事件多篇归并）
- **精选**：按信源分级过门槛（官方 T1 ≥ 60、准官方 T1.5 ≥ 65、媒体 T2 ≥ 76），事件归并后只出代表稿
- **热点榜**：48 小时窗口内多信源共振的事件排行，至少 2 家信源参与才上榜
- **日报 / 周报 / 月报**：每天 **08:30**（北京时间）出日报，覆盖前 24 小时；每周一 08:30 出周报、每月 1 日 08:30 出月报，从日报汇编，模型只写总述和导读
- **主题页**：按公司/方向/内容形态三类标签横向组织全部资料
- **订阅接口**：RSS（精选/全部/日报/周报/月报）、公开 API、MCP、llms.txt，匿名只读
- **管理后台**（`/admin`）：信源管理与试抓、内容诊断与人工评分更正、运行记录与告警、付费服务预算熔断

## 快速开始

```bash
cp .env.example .env     # 填入：SITE_URL、ADMIN_PASSWORD、SESSION_SECRET、LLM_API_KEY 等
docker compose up -d --build
```

打开 `http://localhost:3000`，管理后台在 `/admin`（密码是 `.env` 里的 `ADMIN_PASSWORD`）。

首次启动自动建库并导入 `industry/sources.json` 里的 20 个信源；已存在的源不会被覆盖，之后在后台「信源」页增删改。

## 目录导览

| 路径 | 内容 |
|---|---|
| `industry/sources.json` | 信源清单：地址、分级（T1/T1.5/T2）、标签、轮询间隔 |
| `industry/prompts/` | 各环节提示词：预筛、内容理解、评分、翻译、日报编排 |
| `industry/selection.ts` | 精选门槛与评分规则 |
| `industry/taxonomy.ts` | 主题词表（公司/机构、业务方向、内容形态） |
| `site/site.ts` | 站名、文案、出刊时间（`EDITION_TIMES`） |
| `packages/backend/src/` | 引擎主体：采集、模型、精选、日报、调度 |
| `apps/` | api（接口）/ worker（定时任务）/ web（前端） |

## 安全说明

- `.env` 含所有密钥，已被 `.gitignore` 排除，**不要提交**
- 内容不推送任何外部聊天群（飞书/钉钉推送开关默认关闭）
- 数据库不对外开端口；历史文章永久累积，无自动删除
