// import React from 'react'
import { Link } from 'react-router-dom'

interface liveLinkProps {
  username: string;
}

const LiveLink = ({username}: liveLinkProps) => {
  return (
    <div>
      <Link to={`/${username}`} target='_blank'><p>Link: <label className='text-blue-400'>{`profilesme.site/${username}`}</label></p></Link>

    </div>
  )
}

export default LiveLink
