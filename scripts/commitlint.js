#!/usr/bin/env node

const fs = require("fs");

// 读取 commit message 文件内容
const messageFilePath = process.argv[2];
console.log("你在干什么???", messageFilePath);
const message = fs.readFileSync(messageFilePath, "utf-8").trim();
// 定义 commit message 的正则表达式
const commitMessageRegExp =
  /^(✨新增|🐛修复|📝文档|💄格式|♻️重构|⚡️性能|✅测试|🔧工具|⏪回滚)(\(.+\))?: .{1,50}$/;

// 判断 commit message 是否符合规范
if (!commitMessageRegExp.test(message)) {
  console.error("错误：commit message 格式不正确，请按照以下格式书写：");
  console.error("类型(scope): 简短描述（不超过50个字符）");
  console.error("类型可以为以下几种：");
  console.error(
    "✨新增, 🐛修复, 📝文档, 💄格式, ♻️重构, ⚡️性能, ✅测试, 🔧工具, ⏪回滚"
  );
  console.error("scope 可以是任何描述该次提交涉及的范围的字符串");
  // process.exit(1);
}
