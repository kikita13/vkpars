export const useOnline = (user) => {

 return user.online == 1
    ? (<div className='online'>online</div>)
    : (<div className='datе'>
      {user.last_seen ? `last seen at ${new Date(user.last_seen.time*1000).toLocaleDateString()} 
      ${new Date(user.last_seen.time*1000).toLocaleTimeString()}` : `last seen resently`}
    </div>)
} 