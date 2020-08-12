import * as React from 'react';
import { Element } from './Element';
import { Element as ElementType } from './types';

type Props = {
    elements: Array<ElementType>
    maxElements: number,
    name: string
}
export const Tower: React.FC<Props> = (props) => {
    return (
        <div style={{
            minWidth: `${20 * (props.maxElements + 1)}px`,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'stretch',
            flexDirection: 'column',
            textAlign: 'center',
            margin: 10
        }}>
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {props.elements.map(element => <Element key={`${element.value}-${props.name}`} element={element} />)}
            </div>
                <div
                    style={{
                        position: 'absolute',
                        backgroundColor: 'black',
                        zIndex: -1,
                        minWidth: '15px',
                        content: '',
                    }}
                />
            <div
            > Tower {props.name} </div>
        </div>
    )
}