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

    return (
        <Container>
            <TabsHeader color={color}>
                <ActiveTabHeaderBackground
                    selectedIndex={selectedIndex}
                    numberOfTabs={titles.length}
                    color={color}
                />
                {titles.map((title, index) => (
                    <TabHeaderItem
                        key={index}
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
