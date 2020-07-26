//********************
//
// エントリポイント
// prh.csv から prh.yaml を作成する
//
const fs = require('fs');
const yaml = require('js-yaml');
const csvParse = require('csv-parse/lib/sync');

const prhYaml = "./prh.yaml"

const prhCsv = csvParse(fs.readFileSync('prh.csv').toString());

try {
    checkCsvError(prhCsv)
    const csvObj = getKinds(prhCsv);
    createPrhYaml(csvObj);
} catch (e) {
    console.log("error:" + e)
}

//********************
//
// prh.csv のフォーマットをチェックする
//
function checkCsvError (csvData) {
    const headers = csvData[0];
    const existExpected = headers.indexOf('expected') !== -1;
    if (!existExpected) throw new Error("expected is not exist");
}

//********************
//
// prh.csv から kindObject を取得する
//
function getKinds (csvData) {
    const headers = csvData[0];
    const body = csvData.slice(1);
    const newData = [];

    body.forEach(row => {
        // expected がない場合はスキップ
        if (!row[headers.indexOf('expected')]) { return; }

        const newRow = {};
        // ヘッダーをキーとするオブジェクトに変換する
        row.forEach((element, i) => {
            if (element === '') { return; }
            const header = headers[i];
            // ヘッダーが expected の場合
            if (header === 'expected') {
                newRow[header] = element;
            }
            // ヘッダーが patterns の場合
            if (header === 'patterns') {
                if (!(header in newRow)) {
                    newRow[header] = [element];
                    return;
                }
                newRow[header].push(element);
            }
            // ヘッダーが from の場合
            if (header === 'from') {
                if (!('specs' in newRow)) {
                    newRow['specs'] = [{ from: element, to: newRow.expected }];
                    return;
                }
                newRow['specs'].push({ from: element, to: newRow.expected });
            }
        })
        newData.push(newRow);
    })
    return { version: 1, rules: newData };
}

//********************
//
// prh.csv から prh.yaml を作成する
//
function createPrhYaml (csvObj) {
    flowlevel = 5;
    const yamlText = yaml.safeDump(csvObj, { 'flowLevel': flowlevel });
    fs.writeFile(prhYaml, yamlText, 'utf8', (err) => {
        if (err) console.error(err.message);
    });
}
