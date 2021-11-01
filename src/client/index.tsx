import ReactDOM from 'react-dom'
import React from 'react'
import MainPage from './components/mainPage'
import ClientPanel from './components/clientpanel'

const target = new URLSearchParams(window.location.search).get('target')
let targetIndex: number = -1
if (target) {
    targetIndex = parseInt(target) - 1
}

ReactDOM.render(
    <React.StrictMode>
        {targetIndex === -1 ? (
            <React.Fragment>
                <MainPage />
            </React.Fragment>
        ) : (
            <ClientPanel targetIndex={targetIndex} />
        )}
    </React.StrictMode>,
    document.getElementById('root')
)
