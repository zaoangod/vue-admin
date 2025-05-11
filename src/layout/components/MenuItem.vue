<script lang="ts" setup>
import {computed, type PropType} from 'vue';
import type {LayoutType} from '@/store/types';
import {useCollapseHeight, useLayoutRoute} from './hooks';

const props = defineProps({
    menu : {
        type    : Object as PropType<LayoutType.Menu>,
        required: true
    },
    level: {
        type   : Number,
        default: 0
    }
});

const {
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeLeave,
    onLeave,
    onAfterLeave
} = useCollapseHeight();

const {isActive, hasActive} = useLayoutRoute();

const titleClass = computed(function() {
    const actived = isActive(props.menu);
    return {
        'the-layout-menu-title': true,
        // "is-current": props.level === 0 ? hasActive(props.menu) : false,
        'is-current': hasActive(props.menu) && !actived,
        'is-open'   : props.menu.isOpen,
        'is-active' : actived
    };
});

const listClass = computed(function() {
    return {
        'the-layout-menu-list': true,
        'is-open'             : props.menu.isOpen
    };
});

function linkClass(link: LayoutType.Menu) {
    return {
        'the-layout-menu-link': true,
        'is-active'           : isActive(link)
    };
}

/**
 * 是否有下级菜单
 * @param item
 */
function hasChildren(item: LayoutType.Menu) {
    return item.children && item.children.length > 0 ? true : false;
}

function switchMenu() {
    const current = props.menu;
    current.isOpen = !current.isOpen;
}
</script>
<template>
    <section :style="{ '--level': props.level }" class="the-layout-menu">
        <div v-if="hasChildren(props.menu)" :class="titleClass" @click="switchMenu()">
            <svg-icon v-if="props.menu.icon" :name="props.menu.icon" class="menu-icon" />
            <span class="f1">{{ props.menu.title }}</span>
            <i class="the-layout-menu-arrow"></i>
        </div>
        <template v-else>
            <!-- 外链 -->
            <a v-if="props.menu.link" :class="titleClass" :href="props.menu.link" target="_blank">
                <svg-icon v-if="props.menu.icon" :name="props.menu.icon" class="menu-icon" />
                <span class="f1">{{ props.menu.title }}</span>
            </a>
            <!-- 单个菜单 -->
            <router-link v-else :class="titleClass" :to="props.menu.path">
                <svg-icon v-if="props.menu.icon" :name="props.menu.icon" class="menu-icon" />
                <span class="f1">{{ props.menu.title }}</span>
            </router-link>
        </template>
        <transition
            v-if="hasChildren(props.menu)"
            @enter="onEnter"
            @leave="onLeave"
            @before-enter="onBeforeEnter"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @after-leave="onAfterLeave"
        >
            <div v-show="props.menu.isOpen" :class="listClass">
                <template v-for="sub in props.menu.children" :key="sub.menuId">
                    <MenuItem v-if="hasChildren(sub)" :level="props.level + 1" :menu="sub" />
                    <template v-else>
                        <!-- 外链 -->
                        <a v-if="sub.link" :class="linkClass(sub)" :href="sub.link" target="_blank">
                            <svg-icon v-if="sub.icon" :name="sub.icon" class="menu-icon" />
                            <span>{{ sub.title }}</span>
                        </a>
                        <!-- 单个菜单 -->
                        <router-link v-else :class="linkClass(sub)" :to="sub.path">
                            <svg-icon v-if="sub.icon" :name="sub.icon" class="menu-icon" />
                            <span>{{ sub.title }}</span>
                        </router-link>
                    </template>
                </template>
            </div>
        </transition>
    </section>
</template>
