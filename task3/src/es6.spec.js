const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(!!dic, true);
        });

        it('корректно отрабатывает метод get()', () => {
            const dic = new core.Dictionary();
            dic.set("2", "8");

            assert.strictEqual(dic.get("2"), "8");
            assert.strictEqual(dic.get("please"), null);
            assert.strictEqual(dic.get(1), null);
        });

        it('корректно добавляет новые элементы', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(dic.set("2", "8"), true);
            assert.strictEqual(dic.set(8, "2"), false);
            assert.strictEqual(dic.set("2", undefined), false);
        });

        it('корректно удаляет элементы', () => {
            const dic = new core.Dictionary();
            dic.set("2", "8");

            assert.strictEqual(dic.remove("2"), true);
            assert.strictEqual(dic.remove("please"), false);
            assert.strictEqual(dic.remove(null), false);
        });

        it('корректно возвращает размер словаря', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(dic.length(), 0);
            dic.set("2", "8");
            assert.strictEqual(dic.length(), 1);
        });

        it('корректно очищает весь словарь', () => {
            const dic = new core.Dictionary();

            dic.set("2", "8");
            assert.strictEqual(dic.length(), 1);
            dic.erase();
            assert.strictEqual(dic.length(), 0);
        });
    });
});