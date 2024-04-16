# 

### 開発するにあたって

#### [ESLint/Prettierの導入](https://zenn.dev/sumiren/articles/97e19ebcce8197)
参考リンク：https://zenn.dev/sumiren/articles/97e19ebcce8197

ESLintはNext.jsプロジェクトを作成したときに同時に導入されるが
設定を少し変更するにあたって以下を参考にした
参考リンク：https://zenn.dev/brachio_takumi/articles/a8fecd8b1b2742

その際に起きたエラーの対処は以下を参考にした
参考リンク：https://qiita.com/takagimeow/items/4b493c008fe18d3b5d91

また、ESLintの設定ファイルの型定義を使いたかったので以下のリンクを参考にした
参考URL:https://qiita.com/munieru_jp/items/e93f53d46a928ce401d7

### ディレクトリ配置について
`src`ディレクトリにプログラムが入っており
- `app` ： ファイルルーティングやAPIのプログラムが格納されている
- `components` : コンポーネントのプログラムが格納されている
- `style` : CSSファイルが格納されている

## ブランチについて
コンポーネント単位で作成。

APIからのデータ取得処理の関数作成もコンポーネントと同じ単位として扱う

### Chart

### Form

### Navbar

### Footer