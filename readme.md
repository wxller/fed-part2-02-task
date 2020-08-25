### webpack 实现 vue 项目打包任务

```
cd vue-app-base
yarn
yarn serve
```

### Webpack 构建过程：

根据配置，识别入口文件；
逐层识别模块依赖（包括 Commonjs、AMD、或 ES6 的 import 等，都会被识别和分析）；
Webpack 主要工作内容就是分析代码，转换代码，编译代码，最后输出代码；
输出最后打包后的代码。

#### 从启动构建到输出结果一系列过程

- 初始化参数
  解析 Webpack 配置参数，合并 Shell 传入和 webpack.config.js 文件配置的参数，形成最后的配置结果。
- 开始编译
  上一步得到的参数初始化 compiler 对象，注册所有配置的插件，插件监听 Webpack 构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译。
- 确定入口
  从配置文件（ webpack.config.js ）中指定的 entry 入口，开始解析文件构建 AST 语法树，找出依赖，递归下去。
- 编译模块
  递归中根据文件类型和 loader 配置，调用所有配置的 loader 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。

- 完成模块编译并输出

递归完后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据 entry 配置生成代码块 chunk 。

- 输出完成

输出所有的 chunk 到文件系统。

### loader

用于对模块的源代码进行转换。loader 可以使你在 import 或 "load(加载)" 模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的得力方式。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件！

### plugin

插件是 webpack 的 支柱 功能。webpack 自身也是构建于你在 webpack 配置中用到的相同的插件系统之上！
插件目的在于解决 loader 无法实现的其他事。

webpack 插件是一个具有 apply 方法的 JavaScript 对象。apply 方法会被 webpack compiler 调用，并且在整个编译生命周期都可以访问 compiler 对象。

```
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log('webpack 构建过程开始！');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```
