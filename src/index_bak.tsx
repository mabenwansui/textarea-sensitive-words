import './index.less'
import React, { useEffect, FC, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import classnames from 'classnames'

export const prefix = 'textarea_sensitive_words'

function innerTextReplaceWarning(highlightWords: string[], innerText: string): [boolean, string] {
  let isWarning = false
  const escapeRE = new RegExp(/([.*+?^=!:$(){}|[\]\/\\])/g)
  let _highlightWords = highlightWords.map(v=> v.replace(escapeRE, "\\$1"))
  innerText = innerText.replace(new RegExp(`(${_highlightWords.join('|')})`, 'g'), function(all, $1){
    isWarning = true
    return `<span contentEditable="false" data-word-event="true" class="${prefix}-warning">${$1}</span>`
  })
  return [isWarning, innerText]
}

const active = `${prefix}-active`

interface Props {
  defaultVal?: string
  highlightWords?: string[]
  className?: string
  style?: React.CSSProperties
  onChange: (isWarning: boolean, textareaVal: string) => void
}

const App: FC<Props> = observer((props) => {
  const {
    className,
    style,
    defaultVal,
    highlightWords = [],
    onChange
  } = props
  const input = useRef<HTMLDivElement>()
  const [html, setHtml] = useState('')
  const [warning, setWarning] = useState(false)

  const changeFn = (val: string) => {
    let [isWarning, formatHtml] = innerTextReplaceWarning(highlightWords, val)
    setWarning(isWarning)
    setHtml(formatHtml)
    onChange(isWarning, val)
  }
  const handlePaste = (e: React.ClipboardEvent) => {
    e.stopPropagation()
    e.preventDefault()
    let text = ''
    let event = (e as any).originalEvent ?? e
    if (event?.clipboardData?.getData) {
      text = event.clipboardData.getData('text/plain')
    } else if ((window as any)?.clipboardData?.getData) {
      text = (window as any).clipboardData.getData('Text')
    }
    if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, text)
    } else {
      document.execCommand('paste', false, text)
    }
  }
  const handleBlur = () => changeFn(input.current.innerText)
  const handleClick = (event: React.FormEvent<HTMLDivElement>) => {
    let element = event.target as HTMLElement
    if (element.getAttribute('data-word-event') === 'true') {
      getSelection().removeAllRanges()
      element.classList.add(active)
    }
  }

  useEffect(() => {
    const keyupFn = (event: KeyboardEvent)=> {
      if(event.key.toLowerCase() === 'backspace'){
        input.current.querySelectorAll(`.${active}`).forEach((v) => {
          v.remove()
        })
      }
    }
    const clickFn = (event: MouseEvent) => {
      let element = event.target
      input.current.querySelectorAll('[data-word-event=true]').forEach((v) => {
        if (v !== element) {
          v.classList.remove(active)
        }
      })
    }
    document.addEventListener('keyup', keyupFn)
    document.addEventListener('click', clickFn)
    return () => {
      document.removeEventListener('keyup', keyupFn)
      document.removeEventListener('click', clickFn)
    }
  }, [])

  useEffect(() => {
    changeFn(defaultVal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultVal])

  return (
    <>
      <a id="maben">maben</a>
      <input type="text" id="maben1" />
      <div
        ref={input}
        className={classnames(`${prefix}`, warning && `${prefix}-warning-warp`, className)}
        contentEditable="true"
        style={style ?? {}}
        onPaste={handlePaste}
        suppressContentEditableWarning
        onClick={handleClick}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{ __html: html ? html : defaultVal }}
      />
    </>
  )
})

export default App
