## 注意事项

>1：tsconfig.json 为 react 脚手架生成文件，部分配置无法更改，实际编译 使用的 是 tsconfig.new.json <br/>
>2: src/subMenu.json 只在 dev 环境中 使用的菜单 目录，正式环境请使用接口返回 数据<br/>
>3: src/setupProxy.js 代理配置文件，更改这个文件需要重新 npm start 才能生效<br/>
>4: @antv 依赖 是 导致 编译文件 大的 主要原因。不需要的可注释 或者更改成其他 图表库使用<br/>