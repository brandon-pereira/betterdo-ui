declare module '*.svg?component' {
    import React from 'react';

    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}
