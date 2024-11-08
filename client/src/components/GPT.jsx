import React from 'react'

const GPT = () => {
  return (
    <div>
    <header>
        <h2>
            Dreamweaver
        </h2>
    </header>
    <div>
        <textarea 
            value={description}
            placeholder="Tell me your dream" 
            onChange={e => setDescription(e.target.value)}
        ></textarea>
        <button onClick={submitDescription}>{submitStatus}</button>
        <span>
            {dreamAnalysis}
        </span>
        {imageUrl && <img src={imageUrl} alt="Loaded"  style={{ maxWidth: '300px'}}/>}
    </div>
</div>
  )
}

export default GPT