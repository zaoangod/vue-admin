<script lang="ts">
/** 面包屑组件 */
export default {
    name: "BreadCrumb"
}
</script>
<script lang="ts" setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const list = ref<Array<{ path: string; meta: any }>>([]);

function updateList() {
    const matched = route.matched.filter((item) => item.meta && item.meta.title).map((item) => {
        return {
            path: item.path,
            meta: {...item.meta},
        }
    })
    list.value = matched;
}

watch(
    () => route.path,
    function () {
        if (route.path.startsWith("/redirect/")) return;
        updateList();
    }
);

updateList();
</script>
<template>
    <transition-group class="layout-breadcrumb f-vertical" name="breadcrumb" tag="div">
    <span v-for="(item, index) in list" :key="item.path" :class="['layout-breadcrumb-item', {'last': index === list.length - 1}]">
      <i v-if="index > 0" class="separator">/</i>
      <a v-if="index === list.length - 1" href="javascript:void(0)">{{ item.meta.title }}</a>
      <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
    </span>
    </transition-group>
</template>
