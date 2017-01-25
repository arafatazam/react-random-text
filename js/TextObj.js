// This is not a component but an object for better management

class TextObj{
    constructor(rawText, loadingTime){
        var t0 = window.performance.now();
        this.text = rawText;
        this.loadingTime = loadingTime;
        this.size = rawText.length;
        this.wordCount = rawText.match(/(\s|$|^)\w/g).length;
        this.maxWordLength = rawText.split(' ')
                                .reduce((max, word)=>{
                                    return Math.max(max,word.length);
                                },0);
        this.sentencesInParagraphs = rawText.trim().split('\n\n')
                                            .map((para)=>{
                                                return para.match(/\w[.?!](\s|$)/g).length;
                                            });
        this.paragraphs = this.sentencesInParagraphs.length;
        var t1 = window.performance.now();
        this.processingTime = t1-t0;
    }
}

export default TextObj;