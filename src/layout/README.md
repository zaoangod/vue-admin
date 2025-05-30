# 整体框架布局模块目录

**tips:** 可动态修改样式配置，样式文件全部集中写在 [layout.scss](../styles/layout.scss)，通过`css`变量，能够非常方便地自定义样式。

- 在历史记录组件`<div class="the-layout-tags">`中，只是单纯的界面显示；点击关闭时，并不会根据是否为当前页面而关闭等任何逻辑操作，所以需要和页面路由做联动逻辑时需要由开发者自行处理；这里不做逻辑联动是因为不同项目中逻辑不同。
- 只要在当前`<Layout>`的包裹下，就可以使用一个**css**变量`--layout-content-height`，该变量为当前页面容器的内部高度，在做一些页面高度填满的操作时非常有用。

- 在`Menu.vue`中，有一个参数可选

| 参数                | 类型     | 描述                                                   |
|-------------------|--------|------------------------------------------------------|
| mergeOnlyOneChild | number | 是否合并只有一个子项的菜单：传`1`则合并到第一层，传`2`则合并到第二层，以此类推，不传则不做合并操作 |
