# vue-notion

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### ルーティング構成
- ノートリスト：URL -> /main,  コンポーネント ->components/MainPage.vue
- 学習用ページ > 学習1 : URL -> /study/binding, コンポーネント -> components/study/BindingPage.vue
- 学習用ページ > 学習2 : URL -> /study/directive,  コンポーネント -> components/study/DirectivePage.vue
- 学習用ページ > 学習3 : URL -> /study/enent, コンポーネント -> components/study/EventPage.vue
- それ以外 : URL -> /* , コンポーネント -> mainへリダイレクト
