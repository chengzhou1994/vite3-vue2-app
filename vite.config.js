import { defineConfig, loadEnv } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { createVuePlugin } from 'vite-plugin-vue2'
import viteCompression from 'vite-plugin-compression'
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'
// const HOST = '0.0.0.0'
export default ({ mode }) => {
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  // console.log(process.env)
  return defineConfig({
    base: '/',
    server: {
      // 传递给 chockidar 的文件系统监视器选项
      // watch: {
      //   ignored: ['!**/node_modules/your-package-name/**']
      // },
      // force: true, //是否强制依赖预构建
      // hmr: false, //禁用或配置 HMR 连接
      cors: true, // 为开发服务器配置CORS。默认启用并允许任何源
      https: false, // 是否开启https
      strictPort: false, // 设为false时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      // host: HOST,
      port: process.env.PORT
      // proxy: {
      // 为开发服务器配置自定义代理规则
      // 字符串简写写法
      //   '/foo': 'http://192.168.xxx.xxx:xxxx',
      // 选项写法
      //   '/api': {
      //     target: 'http://192.168.xxx.xxx:xxxx', //代理接口
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },

    build: {
      //传递给Terser的更多 minify 选项。
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true
        }
      },
      emptyOutDir: true, //默认true默认情况下，若outDir在root目录下，则Vite会在构建时清空该目录。
      //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      assetsInlineLimit: 4096,
      outDir: 'dist', // 指定输出路径,默认dist
      reportCompressedSize: false, // 取消计算文件大小，加快打包速度
      sourcemap: true,
      assetsDir: 'assets', //默认assets
      cssCodeSplit: true, //启用/禁用CSS代码拆分 默认true, 用则所有样式保存在一个css里面
      //启用/禁用 brotli 压缩大小报告
      brotliSize: true,
      //chunk 大小警告的限制
      chunkSizeWarningLimit: 500,
      ssr: {
        // 列出的是要为 SSR 强制外部化的依赖
        external: [],
        //列出的是防止被 SSR 外部化依赖项
        noExternal: []
      },
      // 设置为 false 可以禁用最小化混淆，
      // 或是用来指定使用哪种混淆器
      // boolean | 'terser' | 'esbuild'
      minify: 'terser', // 混淆器terser构建后文件体积更小
      //当设置为 true，构建后将会生成 manifest.json 文件
      manifest: false,
      //@rollup/plugin-commonjs 插件的选项
      commonjsOptions: {},
      //构建的库
      lib: {},
      // 自定义底层的Rollup 打包配置
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 这里是将src目录配置别名为@方便在项目中导入src目录下的文件
        '@/styles': path.resolve(__dirname, 'src/styles'),
        '@/router': path.resolve(__dirname, 'src/router'),
        '@/views': path.resolve(__dirname, 'src/views'),
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/utils': path.resolve(__dirname, 'src/utils'),
        '@/assets': path.resolve(__dirname, 'src/assets'),
        '/images': 'src/assets/images' // <img src="/images/logo.png" alt="" />
      },
      // 情景导出 package.json 配置中的exports字段
      conditions: [],
      // 导入时想要省略的扩展名列表
      // 不建议使用.vue 影响IDE和类型支持
      // 在Vite中，不建议（实测还是可以配置的）忽略自定义扩展名，因为会影响IDE和类型支持。因此需要完整书写
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] //默认支持
    },
    css: {
      // 配置 css modules 的行为
      modules: {},
      // postCss 配置
      postcss: {},
      preprocessorOptions: {
        css: {
          // 加载全局样式
          // additionalData: `@use './src/assets/css/reset.css';`,
        },
        //指定传递给 css 预处理器的选项
        less: {
          // additionalData: '@import "./src/styles/index.less";',
          // javascriptEnabled: true
        }
      }
    },
    plugins: [
      createVuePlugin(/* options */),
      // poilfill
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      // 生成gzip
      viteCompression({
        //生成压缩包gz
        verbose: true, //默认true
        disable: false, //默认false
        threshold: 10240, //默认1025
        algorithm: 'gzip', //默认gzip
        ext: '.gz' //默认gz
      }),
      // 处理svg
      viteSvgIcons({
        iconDirs: [path.resolve('src/icons/svg')],
        symbolId: 'icon-[name]'
      })
    ],
    // 强制预构建插件包
    optimizeDeps: {
      //检测需要预构建的依赖项
      entries: [],
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      //默认情况下，不在node_modules 中的，链接的包不会预构建
      include: [
        //  '@iconify/iconify',
        //  'ant-design-vue/es/locale/zh_CN',
        'moment/dist/locale/zh-cn',
        //  'ant-design-vue/es/locale/en_US',
        'moment/dist/locale/eu'
      ]
      // exclude: ['vue-demi', 'consolidate'],//排除在优化之外
    }
  })
}
