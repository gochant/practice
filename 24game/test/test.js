var chai = require('chai')
var expect = chai.expect
var The24Game = require('../src/core').The24Game

let instance

describe('The24Game', function () {
    before(function () {
        instance = new The24Game
    });

    describe('#normal test', function () {
        it('should be success when running tap4fun test case 1', function () {
            expect(instance.solve([3, 3, 6, 6])).to.have.members(['((6/3)+6)*3']);
        })
        it('should be success when running tap4fun test case 2', function () {
            expect(instance.solve([3, 2, 3, 4])).to.eql([]);
        })
        it('should be success when running tap4fun test case 3', function () {
            expect(instance.solve([5, 5, 6, 6])).to.have.members([
                '((5+5)-6)*6',
                '(5*5)-(6/6)',
                '((5-6)+5)*6',
                '(5-(6-5))*6',
                '(6-(6/5))*5'
            ]);
        })

    })

    describe('#extend test', function () {
        before(function () {
            instance = new The24Game({
                optimizeBracket: true
            })
        });
        it('should be success when input is all the same number', function () {
            expect(instance.solve([6, 6, 6, 6])).to.have.members(['6*6-(6+6)', '6*6-6-6', '6+6+6+6']);
        })
        it('should be faster when using cache', function () {
            expect(instance.solve([6, 6, 6, 6])).to.be.a('array');
        })
        it('should be success when input is three numbers', function () {
            expect(instance.solve([6, 8, 3])).to.have.members(['(6-3)*8']);
        })
        it('should be success when target is 25', function () {
            const instance25 = new The24Game({
                target: 25,
                optimizeBracket: true
            })
            expect(instance25.solve([5, 3, 2, 9])).to.have.members([
                '(2+9/3)*5',
                '(3+5)*2+9',
                '(5+9)*2-3'
            ]);
        })
    })
})