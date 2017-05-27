import minimist from "minimist"; // node 命令行接受参数

const knowOptions = {
  string: ["name", "tg"],
  boolean: ["dev"]
},
  options = minimist(process.argv.slice(2), knowOptions), // 保存所有参数信息
  rootName = options.n; // 项目名

export default {
  root: `../${rootName}`,
  rootName: rootName,
  style: {
    src: `../${rootName}/css/less/index.less`,
    dist: `../${rootName}/css/css/`
  }
};
