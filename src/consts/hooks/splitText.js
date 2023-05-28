export const useSplitText = (text) => text?.replace(/\n/g, '<br>').split('<br>').map((data, index) => (<p key={index}>{data}</p>))
