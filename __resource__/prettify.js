
addLineNumbers();
prettifySourceCode();

function addLineNumbers() {
    let sourceCodeElem = document.getElementById('source-code');
    let sourceCodeLines = sourceCodeElem.innerHTML.split('\n');
    let lineNumbersHtml = '';
    
    for (let i = 1; i <= sourceCodeLines.length; i++) {
        lineNumbersHtml += i + '.\n';
    }

    let lineNumbersElem = document.createElement('pre');
    lineNumbersElem.className = 'line-numbers';
    lineNumbersElem.innerHTML = lineNumbersHtml;
    sourceCodeElem.parentNode.insertBefore(lineNumbersElem, sourceCodeElem);

    sourceCodeElem.innerHTML = sourceCodeLines.join('\n');
}

function prettifySourceCode() {
    let sourceCodeElem = document.getElementById('source-code');
    let sourceCodeHtml = sourceCodeElem.innerHTML;
    sourceCodeHtml = highlightKeywords(sourceCodeHtml);
    sourceCodeHtml = highlightComments(sourceCodeHtml);
    sourceCodeElem.innerHTML = sourceCodeHtml;
}

function highlightKeywords(sourceCodeHtml) {
    const KEYWORD_REGEX = 'abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while';
    const OPERATOR_REGEX = '\\+\\+|\\-\\-|\\*|\\/|%|\\+|\\-|&lt;&lt;|&gt;&gt;|&gt;&gt;&gt;|&lt;|&gt;|&lt;=|&gt;=|==|!=|&|\\^|\\||&&|\\|\\||\\?|:|=|\\+=|\\-=|\\*=|\\/=|%=|&=|\\^=|\\|=|&lt;&lt;=|&gt;&gt;=|&gt;&gt;&gt;=';
    const BRACKET_REGEX = '\\(|\\)|\\{|\\}|\\[|\\]';
    const DELIMITER_REGEX = `\\b|${OPERATOR_REGEX}|${BRACKET_REGEX}`;
    const REGEX_STRING = `(${DELIMITER_REGEX})(${KEYWORD_REGEX})(${DELIMITER_REGEX})`;
    var regex = new RegExp(REGEX_STRING, 'g');
    return sourceCodeHtml.replaceAll(regex, '$1<span id=\'keyword\'>$2</span>$3');
}

function highlightComments(sourceCodeHtml) {
    const COMMENT_REGEX = '\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*';
    const REGEX_STRING = `(${COMMENT_REGEX})`;
    var regex = new RegExp(REGEX_STRING, 'g');
    return sourceCodeHtml.replaceAll(regex, '<span id=\'comment\'>$1</span>');
}
