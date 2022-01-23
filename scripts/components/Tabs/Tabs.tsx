import { LayoutGroup } from 'framer-motion';
import React, { cloneElement, Children, useState } from 'react';

import {
    Container,
    TabsBody,
    TabBodyItem,
    TabsHeader,
    ActiveTabHeaderBackground,
    TabHeaderItem
} from './Tabs.styles';

interface Props {
    selectedIndex?: number;
    color?: string;
    children: React.ReactElement[];
    titles: string[];
}
function Tabs({
    selectedIndex: _selectedIndex,
    color,
    children,
    titles
}: Props) {
    const [selectedIndex, setSelectedIndex] = useState(_selectedIndex || 0);

    return (
        <Container>
            <LayoutGroup>
                <TabsHeader color={color}>
                    {titles.map((title, index) => (
                        <TabHeaderItem
                            key={index}
                            selected={selectedIndex === index}
                            onClick={() => setSelectedIndex(index)}
                            color={color}
                        >
                            {title}
                            {selectedIndex === index && (
                                <ActiveTabHeaderBackground
                                    color={color}
                                    layout
                                    layoutId="active-tab"
                                />
                            )}
                        </TabHeaderItem>
                    ))}
                </TabsHeader>
            </LayoutGroup>
            <TabsBody>
                {Children.map(children, (value, index) => {
                    return cloneElement(value, {
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
