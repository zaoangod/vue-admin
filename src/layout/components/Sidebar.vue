<script lang="ts">
/** 侧边栏组件 */
export default {
    name: "Sidebar"
}
</script>
<script lang="ts" setup>
import Menu from "./Menu.vue";
import {Scrollbar} from "@/components/Scrollbar";
import store from "@/store";

const layoutInfo = store.layout.info;

const info = store.projectInfo;

function onClear() {
    layoutInfo.keyword = "";
}
</script>
<template>
    <div class="the-layout-sidebar">
        <section class="the-layout-sidebar-content">
            <transition mode="out-in" name="fade">
                <div v-if="layoutInfo.showSidebarLogo" class="the-logo-box">
                    <router-link class="the-logo-link f-vertical" to="/">
                        <img :src="info.logo" class="the-logo" />
                        <h1 :title="info.title" class="the-logo-title ellipsis">{{ info.title }}</h1>
                    </router-link>
                </div>
                <div v-else style="height: var(--page-padding);"></div>
            </transition>
            <div class="the-layout-search-box">
                <input v-model="layoutInfo.keyword" placeholder="请输入关键字检索菜单" type="text">
                <svg-icon v-if="layoutInfo.keyword" class="the-layout-search-icon" name="circle-close" @click="onClear()" />
                <svg-icon v-else class="the-layout-search-icon" name="search" />
            </div>
        </section>
        <section class="f1">
            <Scrollbar>
                <div class="the-layout-sidebar-content padding-full">
                    <Menu :mergeOnlyOneChild="1" />
                </div>
            </Scrollbar>
        </section>
    </div>
</template>
