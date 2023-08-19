import React from 'react'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div>
      <div className='sidebar'>
        <ul>
          <li>
            <Link href='/edit-intro'>Edit Intro</Link>
          </li>
          <li>
            <Link href='/edit-about'>Edit About</Link>
          </li>
          <li>
            <Link href='/edit-resume'>Edit Resume</Link>
          </li>
          <li>
            <Link href='/edit-skills'>Edit SKILLS</Link>
          </li>
          <li>
            <Link href='/view-contacts'>view contacts</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
