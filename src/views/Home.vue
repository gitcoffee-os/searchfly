/**
 * Copyright (c) 2025-2099 GitCoffee All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
<template>
  <SearchHome
    :app-name="APP_INFO.name"
    :official-website="APP_INFO.officialWebsite"
    :logo-url="iconUrl"
    :setting-data="settingData"
    :show-search-box="true"
    @language-change="handleLanguageChange"
    @open-setting="showSettingModal = true"
    @toggle-theme="toggleTheme"
  >
    <!-- 搜索内容区域 - 只显示搜索框 -->
    <template #search-content>
      <div class="search-mode-content">
        <SearchBox />
      </div>
    </template>
  </SearchHome>

  <!-- 用户设置组件 -->
  <UserSetting v-model="showSettingModal" />
</template>

<script setup lang="ts">
// 导入插件管理器用于本地化
import { pluginManager } from '@gitcoffee/plugins';
// 按照plugin-ui包的方式导入组件和样式
import { SmartSearch, SearchHome } from '@gitcoffee/search-ui';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import iconUrl from '../../assets/logo.svg';
import { getLanguageName, supportedLanguages, setLanguage } from '@gitcoffee/i18n';
// 导入应用配置
import { APP_INFO } from '../config/config';
// 导入本地国际化函数
import { useI18n } from '@gitcoffee/i18n';
import { useCurrentLanguage } from '../locales';
// 搜索个性化扩展点
import SearchBox from './components/SearchBox.vue';
import UserSetting from './components/UserSetting.vue';

// 导入设置数据
import {
  saveSettingsToStorage,
  settingData,
  SettingData,
} from '@gitcoffee/app';

// 响应式数据

const currentLanguage = useCurrentLanguage();
const router = useRouter();
// 获取i18n实例和$t函数
const { t: $t } = useI18n();

const showSettingModal = ref(false); // 设置弹窗显示状态

// 搜索个性化扩展点
// 搜索个性化扩展点

// 切换主题函数
const toggleTheme = () => {
  settingData.value.theme = settingData.value.theme === 'dark' ? 'light' : 'dark';
  // 保存设置到存储
  saveSettingsToStorage();
};

// 处理语言切换
const handleLanguageChange = (langCode: string) => {
  console.log('handleLanguageChange in Home.vue called with:', langCode);
  if (langCode) {
    // 设置语言
    setLanguage(langCode);
  }
};

// 生命周期
onMounted(() => {

});
</script>

<style scoped>
/* 应用特定的样式可以在这里添加 */
</style>