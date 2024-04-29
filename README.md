## 開発するにあたって
## 参考リンク
[参考リンク集](https://tiamat-fill.notion.site/a85297adfc254361a625220d607b9105?v=7254dea571614790bcd00345d95083ed&pvs=4)

## ディレクトリ配置について
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

## コンポーネント

### Chart

    - グラフ表示コンポーネント
    
### Form

- アプリに送信する情報は以下の通りになる
    - 県の選択（複数選択）
    

### Navbar
ちょっとした黒文字タイトルと薄い灰色の背景を設定

### Footer
濃いめの灰色背景と「About」「Doc」のリンクっぽい表示と
企業名の表示みたいなテキストが書いてある
