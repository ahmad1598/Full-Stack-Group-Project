import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'


export const PageFade = props => {
    const {location, children} = props
    return (
        <TransitionGroup component={null}>
            <CSSTransition
                in={true}
                appear={true}
                classNames="page-fade"
                timeout={600}
                key={location}>
                {children}
            </CSSTransition>
        
        </TransitionGroup>
    )
}