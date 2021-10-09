import React, { useState, useRef, useEffect } from 'react';

import {
    Container,
    TabsBody,
    TabBodyItem,
    TabsHeader,
    ActiveTabHeaderBackground,
    TabHeaderItem
} from './Tabs.styles.js';

function Tabs({ selectedIndex: _selectedIndex, color, children, titles }) {
    const [selectedIndex, setSelectedIndex] = useState(_selectedIndex || 0);
    const activeElement = useRef();
    const headerContainerRef = useRef();
    const [activeElementCoords, setActiveElementCoords] = useState();

    useEffect(() => {
        const getCoords = () => {
            const viewport = headerContainerRef.current.getBoundingClientRect();
            const elem = activeElement.current.getBoundingClientRect();
            // gotta love magic number calculations, fix this one day!
            const left = elem.left - viewport.left - 3;
            return { width: elem.width, left };
        };
        const setCoords = () => setActiveElementCoords(getCoords());
        // initial render calculation
        setCoords();
        window.addEventListener('resize', setCoords);
        return () => window.removeEventListener('resize', setCoords);
    }, [selectedIndex]);

    return (
        <Container>
            <TabsHeader ref={headerContainerRef} color={color}>
                <ActiveTabHeaderBackground
                    left={activeElementCoords?.left}
                    width={activeElementCoords?.width}
                    color={color}
                />
                {titles.map((title, index) => (
                    <TabHeaderItem
                        key={index}
                        ref={selectedIndex === index ? activeElement : null}
                        selected={selectedIndex === index}
                        onClick={() => setSelectedIndex(index)}
                        color={color}
                    >
                        {title}
                    </TabHeaderItem>
                ))}
            </TabsHeader>
            <TabsBody>
                {React.Children.map(children, (value, index) => {
                    return React.cloneElement(value, {
                        index,
                        selected: index === selectedIndex
                    });
                })}
            </TabsBody>
        </Container>
    );
}

export const Tab = TabBodyItem;
export default Tabs;
