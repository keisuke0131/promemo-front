# promemo-front

### レスポンシブデザイン

下記サイズで対応させている。

```
$breakpoints : (
  "lg":"screen and (max-width:1024px)",
  "md":"screen and (max-width:768px)",
  "sm":"screen and (max-width:480px)"
);

@mixin mq($breakpoint:md){
    @media #{map-get($breakpoints, $breakpoint)}{
      @content;
    }
  }
```

使うときは下記のように`@include`を利用する。

```
//breakpointsの「sm（480px以下）」が適用される。
@include mq(sm){
  color:red;
}
```

### ショートカットキー

#### ショートカットキーを設定したいとき

タグに`v-shortkey`でショートカットを指定し、ショートカットキーを押したときに実行するメソッドを`@shortkey`で指定。

```
<button v-shortkey="['ctrl','b']" @shortkey="$router.push('/home')">
ボタン
</button>
```

#### 現在使えるショートカットキー

- `ctrl` + `w`：記事作成ページに遷移
- `ctrl` + 'z'：記事のプレビュー
- `ctrl` + 's'：記事の保存
