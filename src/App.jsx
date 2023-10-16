import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")
  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str = str + "0123456789"
    if (character) str = str + "*#$@!~^&+_=/()`[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, number, character, setPassword])

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,5);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])
  return (
    <>
      <div className='w-full text-2xl max-w-lg mx-auto shadow-md rounded-md px-8 py-4 my-8 text-yellow-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow-md rounded-md overflow-hidden mb-3'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-2'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordtoClipboard} className='outline-none bg-green-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-lg gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <input 
            type='range'
            min={4}
            max={60}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={number}
            id='numberInput'
            onChange={() => {
              setNumber((prev) => !prev);
            }}
            />
            <label htmlFor='number'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={character}
            id='characterInput'
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
            />
            <label htmlFor='character'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
