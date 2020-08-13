import * as React from 'react'
import { Tower } from './Tower'
import { Element } from './types';


function findValueToMove(currentStep: number) {
    const nextStep = currentStep + 1;
    const bitDifferenceMask = ((~currentStep & nextStep)).toString(2);
    const elementToMove = bitDifferenceMask.split("").reverse().join("").indexOf('1');
    return elementToMove;
}

function findStartingTower(towers: Array<Array<Element>>, valueToFind: number) {
    return towers.find(tower => tower.findIndex(element => element.value === valueToFind) !== -1);
}

function findDestinationTower(towers: Array<Array<Element>>, startingTower: Array<Element>, valueToMove: number) {
    const startingTowerIndex = towers.indexOf(startingTower);
    let destinationTowerIndex: number = -1;
    for(let i = startingTowerIndex ; i >= 0 ; i--) {
        let checkedTower = towers[i];
        if (checkedTower.length === 0 || checkedTower[0].value > valueToMove) {
            destinationTowerIndex = i;
            break;
        }
    }
    if (destinationTowerIndex === -1) {
        for(let i = towers.length - 1 ; i > startingTowerIndex ; i--) {
            let checkedTower = towers[i];
            if (checkedTower.length === 0 || checkedTower[0].value > valueToMove) {
                destinationTowerIndex = i;
                break;
            }
        }
    }
    return towers[destinationTowerIndex];
}

const getRandomColor = () => Math.floor(Math.random()*16777215).toString(16)

function generateInitialTower(numberOfElements: number) {
    return Array.from(Array(numberOfElements)).map((_, index) => ({
        value: index,
        color: `#${getRandomColor()}`
    }))
}

export const HanoiTower: React.FC<{numberOfRings: number, time: number}> = ({ numberOfRings, time}) => {
    const [INITIAL_TOWER] = React.useState(generateInitialTower(numberOfRings))
    const [towerA, setTowerA] = React.useState<Element[]>([])
    const [towerB, setTowerB] = React.useState<Element[]>([])
    const [towerC, setTowerC] = React.useState<Element[]>(INITIAL_TOWER)
    const [step, setStep] = React.useState(0);
    const [infoText, setInfoText] = React.useState('');
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        if (towerA.length !== INITIAL_TOWER.length) {
            setTimeout(() => {
                const valueToMove = findValueToMove(step);
                const towers = [towerA, towerB, towerC];
                // Check for error
                towers.forEach(tower => tower.forEach((el, index) => {
                    let previousElement = tower[index - 1]
                    if (previousElement && previousElement.value > el.value) {
                        setError(true);
                    }
                })
                );
                const startTower = findStartingTower(towers, valueToMove);
                if (startTower) {
                    const elementToMove: Element | undefined = startTower.find(el => el.value === valueToMove);
                    const destTower = findDestinationTower(towers, startTower, valueToMove);
                    if (elementToMove) {
                        let startTowerName: string = '';
                        let endTowerName: string = '';
                        // Remove element from start tower
                        if (startTower === towerA) {
                            startTowerName = 'A';
                            setTowerA(startTower.filter(el => el !== elementToMove));
                        }
                        if (startTower === towerB) {
                            startTowerName = 'B';
                            setTowerB(startTower.filter(el => el !== elementToMove));
                        }
                        if (startTower === towerC) {
                            startTowerName = 'C';
                            setTowerC(startTower.filter(el => el !== elementToMove));
                        }
                        // Add element to destination tower
                        if (destTower === towerA) {
                            endTowerName = 'A';
                            setTowerA([elementToMove, ...destTower]);
                        }
                        if (destTower === towerB) {
                            endTowerName = 'B';
                            setTowerB([elementToMove, ...destTower]);
                        }
                        if (destTower === towerC) {
                            endTowerName = 'C';
                            setTowerC([elementToMove, ...destTower]);
                        }
                        setInfoText(`STEP: ${step + 1}\nValueToMove: ${valueToMove} \nMove: ${startTowerName}${endTowerName}`);
                    }
                }
                setStep(step + 1)
            }, time)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step])
    return (<div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            marginBottom: 20,
            height: INITIAL_TOWER.length * 32 + 50
        }}>
            <Tower name="A" maxElements={INITIAL_TOWER.length} elements={towerA} />
            <Tower name="B" maxElements={INITIAL_TOWER.length} elements={towerB} />
            <Tower name="C" maxElements={INITIAL_TOWER.length} elements={towerC} />
        </div>
        <div>
            {infoText}
        </div>
        <div>
            Error: {String(error)}
        </div>
    </div>)
}