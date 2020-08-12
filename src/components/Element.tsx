import * as React from 'react';
import { Element as ElementType } from './types'

export const Element: React.FC<{ element: ElementType }> = (props) => {
    return (<div  style={{
        height: '30px',
        content: '',
        textAlign: 'center',
        width: `${40 * (props.element.value + 1)}px`,
        backgroundColor: props.element.color,
        border: '1px solid black',
        borderRadius: '30px'
    }}>
        {props.element.value}
    </div>)
}