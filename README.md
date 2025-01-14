# pascal.js -- pascal interpreter written in javascript

## Разработка

Install dependencies:

```shell
npm ci
```

Run in console:

```shell
node run.js
```

Run all tests:

```shell
npm test
```
### Запуск текущего файла теста с отладкой (vscode)

* Откройте файл теста
* В разделе запуска/отладки (слева вверху) переключитесь на `Jest Current`
* Далее на любом открытом файле теста последовательно нажимите `Ctrl+Shift+D` и затем `Enter`


## О программе

Интерпретатор работает как конвейер, передавая промежуточный результат следующему модулю:
* **Модуль ввода-вывода (МВВ)** `FileIO` -- разбивает исходных текст на отдельные буквы.
* **Лексический анализатор (ЛА)** `LexicalAnalyzer` -- из букв строит слова программы.
* **Синтаксический анализатор (СА)** `SyntaxAnalyzer` -- строит дерево выполнения.
* **Движок** `Engine` -- выполняет дерево, полученное из `SyntaxAnalyzer`, это и есть процесс выполнения программы.

Можно сравнить эту структуру интерпретатора с возможной структурой компилятора: http://fkn.ktu10.com/?q=node/12395
