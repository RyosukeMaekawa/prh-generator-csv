# prh-generator-csv

csvフォーマットからprh.yamlを生成するスクリプト。

* スクリプト
  * `./prh-generator-csv` で `npm start`
  * `./prh-generator-csv/prh.csv` の内容で `prh.yaml` を生成する。

* prh.csv
  * sample

    ```csv
    expected,patterns,patterns,from,from
    Google,google,GOOGLE,google,GOOGLE
    jQuery,jquery,JQUERY,jquery,JQUERY
    ```

    * `expected`
      * 期待する単語
      * 大文字,小文字,全角,半角が統一されてるかをチェックする
    * `patterns`
      * `expected` に変換したい対象
      * 複数記述可能
      * 正規表現に変換する都合上、より長いものを先に書いたほうがよい
    * `from`
      * `expected` に変換されるかテストする
      
GitHub: [textlint-rule-prh](https://github.com/textlint-rule/textlint-rule-prh)
