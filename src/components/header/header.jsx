import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../../assets/images/movix-logo.svg'
import style from './header.module.scss'
import  Router, { useRouter }  from 'next/router'

import { HiOutlineSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import useFetch from '../hooks/useFetch'






const Header = () => {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [showSearch, setShowSearch] = useState("");
    
      const keyUp = (event) =>{
          if(event.key === 'Enter' && query.length > 0){
              Router.push(`search/${query}`)
          }
      }



  
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            router.push(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };




    return (
        <header className={`${style.header}  ${style.show}`}>
            <div className='container flex justify-between items-center'>
                <div className="logo cursor-pointer" onClick={() => Router.push('/')}>
                  {
                    logo &&(
                  <Image src={logo} width='auto' height='auto' alt='logo' priority={true} className=' h-12'/>)
                  }
                </div>
                <ul className={`${style.menuItems} flex items-center list-none`}>
                    <li
                        className={`${style.menuItem}`}
                        onClick={() => router.push('/explore/Explore')}
                    >
                        Movies
                    </li>
                    <li className={`${style.menuItem}`} onClick={()=>setShowSearch(true)}>
                        <HiOutlineSearch  />
                    </li>
                </ul>

            </div>
            {showSearch && (
                <div className={`${style.searchBar}`}>
                    <div className='container'>
                        <div className={`${style.searchInput}`}>
                            <input
                                type="text"
                                placeholder="Search for a movie...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
    
  }
  
  export default Header
