'use strict'

const TextHtmlify = function(){

    /* properties */
    
    /* private properties */
    let _options = {
        customClass: 'th',
        wrapElement: false,
        targetBlank: true
    }
    let _loadedRawText = ''
    let _htmlString = null

    /* binders */

    /* methods */
    /**
     * 
     * @param {string} input - A string representation of HTML document or an HTMLDocument element
     * @param {_options} options - An object containing options as properties. If omitted, default options will be used
     */
    this.process = function(input, options){
        _initOptions(options)
        if(typeof input !== 'string'){
            throw Error('Passed input is not of type string!')
        }
        _loadedRawText = input
        processText()
        return {
            htmlString: _htmlString,
        }
    }

    /* private methods*/
    function _initOptions(opt){
        if(opt && typeof opt === 'object'){
            _options = Object.assign(_options, opt)
        }
    }
    
    function processText(){
        _htmlString = _loadedRawText.split('\n')
        for(let i = 0; i < _htmlString.length; i++){
            _htmlString[i] = manageLine(_htmlString[i])
        }
        _htmlString = _htmlString.join('\n')
    }

    function manageLine(line){
        const obj = {string: line}
        _options.wrapElement && removeLineBreak(obj) && wrapText(obj)
        !_options.wrapElement && addLineBreak(obj)
        testForLink(obj)
        return obj.string
    }

    function wrapText(obj){
        obj.string = `<${_options.wrapElement} class='${_options.customClass}-row'>${obj.string}</${_options.wrapElement}>`
        return true
    }

    function removeLineBreak(obj){
        obj.string = obj.string.replace('\r', '')
        return true
    }

    function addLineBreak(obj){
        obj.string = obj.string.replace('\r', '<br>')
    }

    function testForLink(obj){
        const regex = new RegExp(/(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/gm)
        const match = obj.string.match(regex)
        if(match){
            obj.string = obj.string.replace(match, `<a href='${(match.indexOf('http') > -1 || match.indexOf('ftp') > -1) ? match : 'http://'+match}' class='${_options.customClass}-link' rel='noreferer' ${_options.targetBlank ? "target='_blank'" : ''}>${match}</a>`)
        }
    }

    /* executes */
}

module.exports = TextHtmlify