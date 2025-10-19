import authBoxState, { authBoxModes } from '@/atoms/auth/authBox'
import classNames from 'classnames'
import React, { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import LoginForm from '../LoginForm'
import SignUpForm from '../SignUpForm'
import ResetForm from '../ResetForm'

export default function AuthBox() {

  const [authBox, setAuthBox] = useRecoilState(authBoxState)
  const asideRef = useRef<HTMLElement>(null)

  const handleCloseBtnClick = () => {
    setAuthBox({
      isOpen: false,
      mode: 'login'
    });
  };

  const handleTab = (mode: authBoxModes) => {
    setAuthBox({
      isOpen: true,
      mode: mode
    })
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
        handleCloseBtnClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [asideRef]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Esc') {
        handleCloseBtnClick();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className='fixed w-full h-screen left-0 top-0 z-50 bg-black/50'>
      <aside ref={asideRef} className='absolute h-full right-0 top-0 bg-white md:w-5/12 lg:w-[376px]'>
        <div className='bg-gray-100 flex justify-end px-6 py-3 '>
          <button 
            onClick={()=>handleCloseBtnClick()}
            className="bg-blue-500 text-white flex justify-center items-center rounded-full w-6 h-6 leading-none">
            x
          </button>
        </div>
        <div className='px-4 pt-4'>
          {
            authBox.mode !== 'reset' 
            ?
            <div role="tablist" aria-label="Authentication Tabs" className='flex flex-row border-b-[1px]'>
              <button 
                role="tab" 
                aria-selected="true" 
                aria-controls="login-panel" 
                id="login-tab" 
                onClick={()=>handleTab('login')}
                className={classNames(["py-2 px-6", { "border-b-4 font-bold border-b-blue-500" : authBox.mode === 'login'}])}>
                  Log In
              </button>
              <button 
                role="tab" 
                aria-selected="false" 
                aria-controls="signup-panel" 
                id="signup-tab" 
                onClick={()=>handleTab('signup')}
                className={classNames(["py-2 px-6", { "border-b-4 font-bold border-b-blue-500" : authBox.mode === 'signup'}])}>
                  Sign Up
              </button>
            </div>
            :null
          }
          <div>
            {authBox.mode === 'login' && <LoginForm/>}
            {authBox.mode === 'signup' && <SignUpForm/>}
            {authBox.mode === 'reset' && <ResetForm/>}
          </div>
        </div>
      </aside>
    </div>
  )
}
