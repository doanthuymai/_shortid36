'use strict';

var alphabet = require('../lib/alphabet');
var expect = require('chai').expect;

describe('testing alphabet', function(done) {

    beforeEach(function(){
        alphabet.seed(1);
    });


    it('should create a unique random alphabet with each seed', function(done) {
        alphabet.seed(1);
        expect(alphabet.shuffled()).to.equal('KCYS5WPRGTM7D9E23JZAXQF6UVBH8L4N');

        alphabet.seed(1234);
        expect(alphabet.shuffled()).to.equal('9A4K7CS8FHTUVBYJ3DRQ52N6XZLMGPWE');
        done();
    });

    it('should return the same alphabet with a single seed', function(done) {
        alphabet.seed(1);
        expect(alphabet.shuffled()).to.equal('KCYS5WPRGTM7D9E23JZAXQF6UVBH8L4N');

        alphabet.seed(1);
        expect(alphabet.shuffled()).to.equal('KCYS5WPRGTM7D9E23JZAXQF6UVBH8L4N');
        done();
    });

    it('should shuffle into a 32-character string of unique characters', function(done){
        // use default character set
        alphabet.characters(false);

        // use the randomly sorted default set to make new set
        alphabet.characters(alphabet.shuffled());

        expect(alphabet.shuffled()).to.equal('JM4US8Q6EVAW7RDKC3NGLF95BHT2PZYX');

        done();
    });


    it('should work with custom alphabets', function(done) {

        var fn = function(str) {
            return function() {
                alphabet.characters(str);
            };
        };

        expect(fn('zʎxʍʌnʇsɹbquɯlʞɾɥƃɟǝpɔq298765432')).to.throw(Error, 'Custom alphabet for shortid must be 32 unique characters. These characters were not unique: q, 2');
        expect(fn('abc')).to.throw(Error, /Custom alphabet for shortid must be 32 unique characters./);

        alphabet.characters('②③④⑤⑥⑦⑧⑨ⒶⒷⒸⒹⒺⒻⒼⒽⒿⓀⓁⓂⓃⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ');
        expect(alphabet.shuffled()).to.equal('ⓀⒸⓎⓈ⑤ⓌⓅⓇⒼⓉⓂ⑦Ⓓ⑨Ⓔ②③ⒿⓏⒶⓍⓆⒻ⑥ⓊⓋⒷⒽ⑧Ⓛ④Ⓝ');
        done();

    });

});
