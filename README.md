# 

### 開発するにあたって
#### 参考リンク

#### [ESLint/Prettierの導入](https://zenn.dev/sumiren/articles/97e19ebcce8197)
参考リンク：https://zenn.dev/sumiren/articles/97e19ebcce8197

Prettierを使う上での設定は以下を参考にしました
https://zenn.dev/shimakaze_soft/articles/57642e22124968

ESLintはNext.jsプロジェクトを作成したときに同時に導入されるが
設定を少し変更するにあたって以下を参考にした
参考リンク：https://zenn.dev/brachio_takumi/articles/a8fecd8b1b2742

その際に起きたエラーの対処は以下を参考にした
参考リンク：https://qiita.com/takagimeow/items/4b493c008fe18d3b5d91

また、ESLintの設定ファイルの型定義を使いたかったので以下のリンクを参考にした
参考URL:https://qiita.com/munieru_jp/items/e93f53d46a928ce401d7

Gitで間違えてコミットしてしまったときには以下を参考にしました
https://zenn.dev/tsuvic/articles/a8e1c5af484db2

テストのために、PlayWrightを活用しました。
https://playwright.dev
https://nextat.co.jp/staff/archives/291

Next.jsのfetchの設定をよリ詳しく知るために以下の記事を参考にしました
https://qiita.com/sotasato/items/31be24d6776f3232c0c0
https://zenn.dev/coconala/articles/d23fe8701ce10b

RouteHandlerを活用する際に以下を参考にしました
https://ja.next-community-docs.dev/docs/app-router/building-your-application/routing/route-handlers

ServerComponentでもClientComponentでもStateを共有できるようにnrstateを使おうとした際に以下を参考にしました
https://zenn.dev/rgbkids/articles/676840f6d061af


リセットCSSを使う際に以下を参考にしました
https://coliss.com/articles/build-websites/operation/css/css-reset-for-modern-browser.html


React Hooks Formを使う上で、最適な方法として以下の情報を参考にしました
https://tomoyaf.hatenablog.com/entry/2021/10/05/135539

### ディレクトリ配置について
`src`ディレクトリにプログラムが入っており
- `app` ： ファイルルーティングやAPIのプログラムが格納されている
- `components` : コンポーネントのプログラムが格納されている
- `style` : CSSファイルが格納されている
- `globalstate`:コンポーネント間で共有するStateの定義
- `tests`: テスト用コードを格納
- `types`: 型定義データをここにまとめておいています

## ブランチについて
コンポーネント単位で作成。

APIからのデータ取得処理の関数作成もコンポーネントと同じ単位として扱う

### Chart

### Form

- アプリに送信する情報は以下の通りになる
    - 県の選択（複数選択）
    

### Navbar
ちょっとした黒文字タイトルと薄い灰色の背景を設定

### Footer
濃いめの灰色背景と「About」「Doc」のリンクっぽい表示と
企業名の表示みたいなテキストが書いてある