import { useState,useCallback,useEffect,useRef} from 'react'

function App() {
  const [length,setLength] = useState(8);
  const [numberAllow,setNumberAllow] = useState(false);
  const [spCharAllow,setSpCharAllow] = useState(false);
  const [password,setPassword]=useState("");

  const passwordRef = useRef(null);

  const passwordGenerator =useCallback(()=>{

    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllow) str+="0123456789";
    if(spCharAllow) str+="!@#$%^&*()_+/|-";

    for (let i = 1; i <=length; i++) {
    let charIndex = Math.floor(Math.random() * str.length+1);
      pass+=str.charAt(charIndex);
    }

    setPassword(pass);

  },[length,numberAllow,spCharAllow,setPassword]);

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllow,spCharAllow,passwordGenerator])

  return (
    <>
    <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500'>
      <h1 className=' text-white text-center my-3'>
      Password Generator</h1>
      <div className=' flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" 
             value={password}
             placeholder='password'
             readOnly
             ref={passwordRef}
             className=' out-of-range w-full py-1 px-3'
      />
      <button onClick={copyPassword} className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600'>
      copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
       <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className=' cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}  
          />
          <label >Length: {length}</label>
       </div>
       <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllow}
          id='numberInput'
          className=' cursor-pointer'
          onChange={()=>{setNumberAllow((prev)=> !prev)}}  //change the prev value T to F vise versa
          />
          <label htmlFor="numberInput">Numbers</label>
       </div>
       <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={spCharAllow}
          id='charInput'
          className=' cursor-pointer'
          onChange={()=>{setSpCharAllow((prev)=> !prev)}}  
          />
          <label htmlFor="charInput">Characters</label>
       </div>

      </div>
    </div>
    </>
  )
}

export default App
