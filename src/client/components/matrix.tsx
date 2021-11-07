import '../styles/Matrix.css'
import * as IO from '../../models/SOCKET_IO_CONTANTS'
import { ISource, ITarget } from '../../models/interfaces'

import React from 'react'
import { socketClient } from './mainPage'

interface IMatrixProps {
    sources: ISource[]
    targets: ITarget[]
}
const Matrix: React.FC<IMatrixProps> = (props) => {
    const handleChangeSource = (sourceIndex: number, targetIndex: number) => {
        socketClient.emit(IO.CHANGE_SOURCE, sourceIndex, targetIndex)
    }

    const renderSources = () => {
        return (
            <div className="matrixsources">
                <div className="matrixsourcetarget">Source\Target</div>
                {props.sources.map((source, sourceIndex) => {
                    return (
                        <form key={sourceIndex} className="matrixsource">
                            {source.label}
                        </form>
                    )
                })}
            </div>
        )
    }

    const renderTargets = () => {
        return (
            <div className="matrixtargets">
                {props.targets.map((target, targetIndex) => {
                    return (
                        <div key={targetIndex} className="matrixtarget">
                            <div className={'matrix_target_label'}>
                                {target.label.substring(0,12)}
                            </div>
                            {props.sources.map(
                                (source: ISource, sourceIndex: number) => {
                                    return (
                                        <button
                                            key={sourceIndex}
                                            className="matrix_connection_botton"
                                            onClick={() =>
                                                handleChangeSource(
                                                    sourceIndex,
                                                    targetIndex
                                                )
                                            }
                                        >
                                            {target.selectedSource ===
                                            sourceIndex ? (
                                                <span>&#11044;</span>
                                            ) : (
                                                <React.Fragment />
                                            )}
                                        </button>
                                    )
                                }
                            )}
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={'matrix'}>
            {renderSources()}
            {renderTargets()}
        </div>
    )
}

export default Matrix
