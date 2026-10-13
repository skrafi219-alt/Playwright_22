import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir:'./tests',
  fullyParallel :true,
  timeout:30*1000,
  reporter:'html',

  use:{
    browserName:'chromium',
    headless:false
  }
});